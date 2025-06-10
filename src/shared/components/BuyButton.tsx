import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Product, requestPurchase, getProducts } from 'react-native-iap';

// Define separate IDs for iOS and Android with TypeScript
export const IN_APP_PRODUCT_IDS: string[] = ['com.bibleapp.bamobile.monthly', 'com.boriios.bamobile'];

interface BuyButtonProps {
    title: string;
    loading?: boolean;
}

const BuyButton: React.FC<BuyButtonProps> = ({ title, loading = false }) => {
    const buyProductInApply = async (): Promise<void> => {
        try {
            // CORRECT: Pass an object with a skus property
            const products = await getProducts({ skus: IN_APP_PRODUCT_IDS });
            console.log('Purchase products:', products);

            if (products.length > 0) {
                // CORRECT: Pass an object with a sku property (singular for requestPurchase)
                const result = await requestPurchase({
                    sku: products[0].productId,
                    andDangerouslyFinishTransactionAutomaticallyIOS: false
                });
                console.log('Purchase result:', result);
            } else {
                console.warn('No products available for purchase');
            }
        } catch (err) {
            const error = err as Error;
            console.warn("Error in buyProductInApply:", error.message, error);
        }
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={buyProductInApply}
            disabled={loading}
        >
            <Text style={styles.buttonText}>{loading ? 'Processing...' : title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BuyButton;