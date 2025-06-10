import React, {useEffect, useState} from 'react';
import {Platform, EmitterSubscription, Alert} from 'react-native';
import RNIap, {
    purchaseErrorListener,
    purchaseUpdatedListener,
    Product,
    PurchaseError,
    Subscription,
    Purchase,
    finishTransaction,
    // acknowledgePurchase,
    requestSubscription,
    getSubscriptions,
    initConnection,
    endConnection, getProducts, requestPurchase,
} from 'react-native-iap';
import {IN_APP_PRODUCT_IDS} from "@constants/values";
import {AppDispatch} from "@store/index";
import {useDispatch} from "react-redux";
import {createCheckoutSessionCall, placeOrderCall} from "@store/apiThunks/order";
import {PlaceOrderRequestType} from "@services/order/type";
import {generalActions} from "@store/slices/general";

// Define separate IDs for iOS and Android
const SUBSCRIPTION_SKUS: string[] = Platform.select({
    ios: ['com.bibleapp.bamobile.monthly_15', 'com.bibleapp.bamobile.monthly',],
    android: ['com.bibleapp.bamobile.monthly_15', 'com.bibleapp.bamobile.monthly']
}) || [];

interface SubscriptionHookResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    buySubscription: () => Promise<void>;
    refreshSubscriptions: () => Promise<void>;
    buyProductInApply: () => Promise<void>;
    buyProductInApplyWithStripe: (val: PlaceOrderRequestType, setFunc: (val: string, val2: string) => void) => Promise<void>;
}

const useSubscription = (): SubscriptionHookResult => {
    const dispatch = useDispatch<AppDispatch>();


    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Initialize listeners
        let purchaseUpdateSubscription: EmitterSubscription;
        let purchaseErrorSubscription: EmitterSubscription;

        const setupListeners = () => {
            purchaseUpdateSubscription = purchaseUpdatedListener((purchase: Purchase) => {
                debug.log('Purchase updated:', purchase);
                // Handle the purchase
                processPurchase(purchase);
            });

            purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
                debug.log('Purchase error:', error);
                setError(error.message);
            });
        };

        // Initialize IAP
        const initializeIAP = async (): Promise<void> => {
            try {
                await initConnection();
                debug.log('IAP connection initialized');
                setupListeners();
                refreshSubscriptions();
            } catch (err) {
                const error = err as Error;
                debug.warn('IAP initialization error:', error);
                setError('Failed to connect to store');
            }
        };

        initializeIAP();

        // Cleanup on unmount
        return () => {
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
            }
            if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
            }
            endConnection();
        };
    }, []);

    const processPurchase = async (purchase: Purchase): Promise<void> => {
        // Process the purchase
        try {
            // Use the unified finishTransaction API
            await finishTransaction({
                purchase,
                isConsumable: false, // For subscriptions, this is usually false
            });

            debug.log('Purchase processed successfully');
        } catch (err) {
            const error = err as Error;
            debug.warn('Process purchase error:', error);
        }
    };

    const refreshSubscriptions = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            // Use getSubscriptions for subscription products
            const availableProducts = await getSubscriptions({skus: SUBSCRIPTION_SKUS});
            debug.log('Available subscriptions:', availableProducts);

            if (availableProducts.length === 0) {
                setError('No subscription products found. Verify product IDs in your developer console.');
            }

            // Cast the result to Product[] to ensure compatibility
            setProducts(availableProducts as unknown as Product[]);
        } catch (err) {
            const error = err as Error;
            debug.warn('Failed to get subscriptions:', error);
            setError('Failed to retrieve subscription information');
        } finally {
            setLoading(false);
        }
    };

    const requestUserSubscription = async (sku: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            debug.log(`Requesting subscription for: ${sku}`);

            // Use requestSubscription for subscriptions
            const result = await requestSubscription({
                sku: sku,
                andDangerouslyFinishTransactionAutomaticallyIOS: false,
            });

            debug.log('Subscription request result:', result);
        } catch (err) {
            const error = err as Error;
            debug.warn('Subscription request error:', error);
            setError(`Subscription request failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const buySubscription = async (): Promise<void> => {
        setLoading(true);
        setError(null);
        if (products.length > 0) {
            await requestUserSubscription(products[0].productId);
            setLoading(false);
        } else {
            setError('No subscription products available');
            setLoading(false);
        }
        setLoading(false);
    };

    const buyProductInApply = async () => {
        setLoading(true);
        setError(null);
        try {
            const products = await getProducts({skus: IN_APP_PRODUCT_IDS});
            debug.log('Purchase products:', products);
            setProducts(products);
            const result = await requestPurchase({sku: IN_APP_PRODUCT_IDS[0]});
            debug.log('Purchase result:', result);
            setLoading(false);
        } catch (err) {
            debug.warn("err from buyProductInApply", err);
            setLoading(false);
        }
        setLoading(false);

        //     ////////
    };

    const buyProductInApplyWithStripe = async (placeOrderRequest: PlaceOrderRequestType, setFunc: (val: string, val2: string) => void) => {
        setLoading(true);
        setError(null);

        //// //// //// //// //// //// //// ////
        await dispatch(
            createCheckoutSessionCall({
                placeOrderRequest: placeOrderRequest,
            }),
        )
            .unwrap()
            .then(async (res) => {
                debug.log('res from placeOrderCall', res);
                setFunc(res.payload.clientSecret, res.payload.checkoutSessionUrl);
                dispatch(generalActions.updateGeneralDataPaymentSessionData({
                    paymentSessionId: res.payload.sessionId,
                }))
                // setPublishableKey();
                // navigation?.dispatch(resetAction);
                // navigation?.navigate(HomeRoutes.HOME);

                // const {error, paymentIntent} =
                //     await confirmPayment(res.payload.clientSecret, {
                //         type: 'Card',
                //         "paymentMethodType": 'Card',
                //     });
                //
                // if (error) {
                //     Alert.alert('Payment failed', error.message);
                // } else if (paymentIntent) {
                //     Alert.alert('Payment success!', `Status: ${paymentIntent.status}`);
                // }
            })
            .catch(err => {
                debug.log('error from placeOrderCall', err);
            });

        setLoading(false);
    };

    return {
        products,
        loading,
        error,
        buySubscription,
        refreshSubscriptions,
        buyProductInApply,
        buyProductInApplyWithStripe
    };
};

export default useSubscription;