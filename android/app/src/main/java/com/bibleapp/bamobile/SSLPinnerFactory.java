package com.bibleapp.bamobile;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class SSLPinnerFactory implements OkHttpClientFactory {
   private static String hostnameBamMain = "onrender.com";
//    private static String hostnameBamFin = "bam-financial-2.onrender.com";
   private static String hostnamePayStack = "checkout.paystack.com";

    public OkHttpClient createNewNetworkModuleClient() {
        CertificatePinner certificatePinner = new CertificatePinner.Builder()
        .add(hostnameBamMain,"sha256/611PgQ0PrKKrrIM3fOr640S6lCDCt0WfypcIB7Gz2F8=")
//         .add(hostnameBamFin,"sha256/611PgQ0PrKKrrIM3fOr640S6lCDCt0WfypcIB7Gz2F8=")
        .add(hostnamePayStack,"sha256/y6pwDedgA200nMh3JTDlAA73vlZ1EOE/IIV04F7m52U=")
        .build();
        // new key generation: echo "Get HTTP/1.0" | openssl s_client -showcerts -connect ecobank.tapston.com:8888 | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64

        // Get a OkHttpClient builder with all the React Native defaults
        OkHttpClient.Builder clientBuilder = OkHttpClientProvider.createClientBuilder();
        return clientBuilder
                .certificatePinner(certificatePinner)
                .build();
    }
}

