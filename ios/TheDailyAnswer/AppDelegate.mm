#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

#import <CodePush/CodePush.h>

#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <TrustKit/TrustKit.h>
#import <TrustKit/TSKPinningValidator.h>
#import <TrustKit/TSKPinningValidatorCallback.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  self.moduleName = @"main";

  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  NSDictionary *trustKitConfig =
  @{
      // Swizzling because we can't access the NSURLSession instance used in React Native's fetch method
      kTSKSwizzleNetworkDelegates: @YES,
      kTSKPinnedDomains: @{
          @"onrender.com" : @{
              kTSKIncludeSubdomains: @YES, // Pin all subdomains
              kTSKEnforcePinning: @YES, // Block connections if pinning validation failed
              kTSKDisableDefaultReportUri: @YES,
              kTSKPublicKeyHashes : @[
                @"611PgQ0PrKKrrIM3fOr640S6lCDCt0WfypcIB7Gz2F8=", // new key generation: echo "Get HTTP/1.0" | openssl s_client -showcerts -connect ecobank.tapston.com:8888 | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
                @"RFaIwRi0LrYXoW3ycESQfibZcT21s9v3ZsVOqrZ2Z44=", // Fake backup key but we need to provide 2 pins
              ],
          },
          @"checkout.paystack.com" : @{
              kTSKIncludeSubdomains: @YES,
              kTSKEnforcePinning: @YES,
              kTSKDisableDefaultReportUri: @YES,
              kTSKPublicKeyHashes : @[
                  @"y6pwDedgA200nMh3JTDlAA73vlZ1EOE/IIV04F7m52U=",
                  @"Dbmf0GLeR880mGNs9WSW1XOL6v7xsVmWO6ks0LxybzU="
              ],
          },
    }};
   [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
     [TrustKit sharedInstance].pinningValidatorCallback = ^(TSKPinningValidatorResult *result, NSString *notedHostname, TKSDomainPinningPolicy *policy) {
       if (result.finalTrustDecision == TSKTrustEvaluationFailedNoMatchingPin) {
         NSLog(@"TrustKit certificate matching failed");
         // Add more logging here. i.e. Sentry, BugSnag etc
       }
     };
     //end TrustKit


  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
#else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
 return [CodePush bundleURL];
#endif
}

// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//   return [CodePush bundleURL];
// #endif
// }

// Linking API
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [super application:application openURL:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}

// Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  BOOL result = [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || result;
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  return [super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  return [super application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  return [super application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

@end
