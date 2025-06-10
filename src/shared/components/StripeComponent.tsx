import {StripeProvider} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from "react";

type props = {
    child: any;
};

function StripeComponent({child}: props) {
    const [publishableKey, setPublishableKey] = useState('');


    useEffect(() => {

    }, []);

    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="com.bibleapp.bamobile.monthly_15"
            // urlScheme="your-url-scheme"
        >
            {child}
        </StripeProvider>
    );
}