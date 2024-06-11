package com.ecobank.mobileapp5;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class SSLPinnerFactory implements OkHttpClientFactory {
   private static String hostname = "ecobank.tapston.com";
   private static String hostnameEco = "appdev.ecobank.com";
   private static String hostnameProd = "digitalservice50.ecobank.com";

    public OkHttpClient createNewNetworkModuleClient() {
        CertificatePinner certificatePinner = new CertificatePinner.Builder()
        .add(hostnameEco,"sha256/pIZ/KXaDp2rnMQEpyAy8YFo+ohhPBD9T7QpAnMM6Mnc=")
        .add(hostname,"sha256/YPDPEZ1Bdhx0R100WqHvYRqSzyFcEqSsEHd4pA2sUPo=")
        .add(hostnameProd,"sha256/pDtg4Q0fqZ37uPt+9s9DGtbhxuDEtS+hkkfEt6woEks=")
        .build();
        // new key generation: echo "Get HTTP/1.0" | openssl s_client -showcerts -connect ecobank.tapston.com:8888 | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64

        // Get a OkHttpClient builder with all the React Native defaults
        OkHttpClient.Builder clientBuilder = OkHttpClientProvider.createClientBuilder();
        return clientBuilder
                .certificatePinner(certificatePinner)
                .build();
    }
}

