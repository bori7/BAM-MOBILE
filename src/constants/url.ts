
// export const BASE_HOST = "http://localhost";
// export const PAYMENT_BASE_HOST =  "http://localhost";
// export const BASE_HOST = "http://10.0.2.2";
// export const PAYMENT_BASE_HOST = "http://10.0.2.2";
// export const BASE_IP = `${BASE_HOST}:9082`;
// export const PAYMENT_BASE_IP = `${PAYMENT_BASE_HOST}:9084`;

export const BASE_HOST: string = "https://bam-mainbackend-9.onrender.com";
export const PAYMENT_BASE_HOST: string = "https://bam-financial-4.onrender.com";
export const BASE_IP = `${BASE_HOST}`;
export const PAYMENT_BASE_IP = `${PAYMENT_BASE_HOST}`;

export const BASE_URL = `${BASE_IP}/bible-app-mobile`;
export const PAYMENT_BASE_URL = `${PAYMENT_BASE_IP}/bible-app-mobile-finance`;

export const ADMIN_ADD_ROLES_URL = `${BASE_URL}/admin/add-roles`;
export const CREATE_DEVOTIONAL_URL = `${BASE_URL}/devotional/create`;
export const FETCH_ALL_DEVOTIONAL_URL = `${BASE_URL}/devotional`;
export const FETCH_DEVOTIONAL_BY_ID_URL = `${BASE_URL}/devotional/{id}`;
export const FETCH_DEVOTIONAL_BY_TITLE_URL = `${BASE_URL}/devotional/title?devotionalTitle={devotionalTitle}`;
export const DELETE_DEVOTIONAL_URL = `${BASE_URL}/devotional/delete`;
export const UPDATE_DEVOTIONAL_URL = `${BASE_URL}/devotional/update`;
// ###################################USER_DEVOTIONAL################################################################
export const CREATE_USER_DEVOTIONAL_URL = `${BASE_URL}/user-devotional`;
export const FETCH_USER_DEVOTIONAL_BY_ID_URL = `${BASE_URL}/user-devotional/{id}`;
export const UPDATE_USER_DEVOTIONAL_URL = `${BASE_URL}/user-devotional/update`;
export const DELETE_USER_DEVOTIONAL_URL = `${BASE_URL}/user-devotional/delete`;
// #######################################PRAYER############################################################
export const CREATE_PRAYER_URL = `${BASE_URL}/prayer`;
export const FETCH_PRAYER_BY_ID_URL = `${BASE_URL}/prayer/{userId}`;
export const UPDATE_PRAYER_URL = `${BASE_URL}/prayer/update`;
export const DELETE_PRAYER_URL = `${BASE_URL}/prayer/delete`;
// #######################################NOTE############################################################
export const CREATE_NOTE_URL = `${BASE_URL}/note`;
export const FETCH_NOTE_BY_ID_URL = `${BASE_URL}/note/{id}`;
export const FETCH_NOTE_BY_USER_ID_URL = `${BASE_URL}/note/{userId}`;
export const UPDATE_NOTE_URL = `${BASE_URL}/note/update`;
export const DELETE_NOTE_URL = `${BASE_URL}/note/delete`;
// #######################################VOD############################################################
export const CREATE_VOD_URL = `${BASE_URL}/vod`;
export const FETCH_VOD_URL = `${BASE_URL}/vod`;
export const UPDATE_VOD_URL = `${BASE_URL}/vod/update`;
export const DELETE_VOD_URL = `${BASE_URL}/vod/delete`;
// #######################################NOTIFICATION############################################################
export const CREATE_NOTIFICATION_URL = `${BASE_URL}/notifications`;
export const FETCH_NOTIFICATION_URL = `${BASE_URL}/notifications/{id}`;
export const UPDATE_NOTIFICATION_URL = `${BASE_URL}/notifications/{id}`;
// #######################################FIRE-NOTIFICATION############################################################
export const REGISTER_FIRE_NOTIFICATION_URL = `${BASE_URL}/firebase-notification/register`;
export const SEND_FIRE_NOTIFICATION_URL = `${BASE_URL}/firebase-notification/send`;
// #######################################MAIL############################################################
export const SIMPLE_MAIL_URL = `${BASE_URL}/mail/simple`;
export const HTML_MAIL_URL = `${BASE_URL}/mail/html-emails`;
// #######################################GOOGLE_AUTH############################################################
export const GOOGLE_SIGN_UP_URL = `${BASE_URL}/google/sign-up`;
export const GOOGLE_SIGN_IN_URL = `${BASE_URL}/google/sign-in`;
// #######################################USER_AUTH############################################################
export const USER_SIGN_UP_URL = `${BASE_URL}/user/sign-up`;
export const USER_SIGN_IN_URL = `${BASE_URL}/user/sign-in`;
export const USER_UPDATE_URL = `${BASE_URL}/user/update-user`;
export const USER_IMAGE_UPDATE_URL = `${BASE_URL}/user/update-user-image`;
export const USER_PASSWORD_UPDATE_URL = `${BASE_URL}/user/update-user-password`;
export const USER_PASSWORD_RESET_URL = `${BASE_URL}/user/reset-user-password`;
export const USER_DELETE_URL = `${BASE_URL}/user/delete-user`;
export const USER_GENERATE_VERIFICATION_CODE_URL = `${BASE_URL}/user/generate-verification-code`;
export const USER_VERIFY_VERIFICATION_CODE_URL = `${BASE_URL}/user/verify-verification-code`;
// #######################################PAYMENT############################################################
export const PAYSTACK_INITIATE_URL = `${PAYMENT_BASE_URL}/paystack`;
export const PAYSTACK_VERIFY_URL = `${PAYMENT_BASE_URL}/paystack/{paymentref}`;
// #######################################GIVING############################################################
export const GIVING_FETCH_ALL_URL = `${PAYMENT_BASE_URL}/giving/all/{userId}`;
export const GIVING_FETCH_URL = `${PAYMENT_BASE_URL}/giving/{giving_ref}`;
// #######################################SUBSCRIPTION############################################################
export const SUBSCRIPTION_FETCH_URL = `${PAYMENT_BASE_URL}/subscription/{userId}`;
// #######################################PAYMENT_CALLBACK############################################################
export const CALLBACK_POST_URL = `${PAYMENT_BASE_URL}/paystack/callback`;
export const CALLBACK_GET_URL = `${PAYMENT_BASE_URL}/paystack/callback?trxref={trxref}&reference={ref}`;