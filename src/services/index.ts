import {AxiosRequestHeaders} from "axios";
import {apiCallInit, TEXT_PLAIN} from "@shared/helper";
import {navigateReset} from "@shared/lib/navigate";
import {RootRoutes} from "@shared/const/routerRoot";
import {CipherUtils} from "@shared/lib/cipher";
import {ENCRYPTED, GENERAL_SYM_KEY, PRIVATE_KEY, PUBLIC_KEY} from "@constants/props";


export const apiPost = async (
    url: string,
    headers: any,
    requestPayload: any
) => {
    debug.log("raw request", requestPayload)
    let oneTimeKey = "";
    if (ENCRYPTED) {
        requestPayload = CipherUtils.encryptionMessage(requestPayload, PUBLIC_KEY as string)
        debug.log("request after encryption", requestPayload)
        oneTimeKey = requestPayload.key
        requestPayload = requestPayload.message
    }
    return await apiCallInit(headers)
        .post(url, requestPayload)
        .then((res) => {
            let newRes = {...res};
            debug.log("raw response body", newRes)
            if (ENCRYPTED) {
                const body = newRes.data;
                debug.log("encrypted response body", body)
                const decryptedBody = CipherUtils.decryptAes(body, oneTimeKey as string)
                debug.log("decrypted response Body", decryptedBody)
                newRes.data = JSON.parse(decryptedBody)
            }
            return newRes;
        })
        .catch((err) => {
            debug.api_error("error from apiPost", JSON.stringify(err));
            throw err;
        });
};

export const postCall = async <R, T>(
    url: string,
    token: string | undefined,
    extraHeaders: AxiosRequestHeaders | undefined | {},
    request: R
): Promise<T> => {
    const headers = {
        Authorization: `Bearer ${token}`,
        ...extraHeaders,
    };
    if (!token) {
        // @ts-ignore
        delete headers.Authorization;
    }
    try {
        // debug.log("request in postCall", request)
        const response = await apiPost(url, headers, request);
        debug.log("url :: ", url);
        debug.log("response from post call :: ", response.data);
        return response.data;
    } catch (error) {
        debug.log("error while trying to call api :: ", error);
        throw error;
    }
};

export const apiPut = async (
    url: string,
    headers: any,
    requestPayload: any
) => {
    debug.log("request", requestPayload)
    debug.log("raw request", requestPayload)
    let oneTimeKey = "";
    if (ENCRYPTED) {
        requestPayload = CipherUtils.encryptionMessage(requestPayload, PUBLIC_KEY as string)
        debug.log("request after encryption", requestPayload)
        oneTimeKey = requestPayload.key
        requestPayload = requestPayload.message
    }

    return await apiCallInit(headers)
        .put(url, requestPayload)
        .then((res) => {
            const newRes = {...res};
            if (ENCRYPTED) {
                const body = newRes.data;
                debug.log("encrypted response body", body)
                const decryptedBody = CipherUtils.decryptAes(body, oneTimeKey as string)
                debug.log("decrypted response Body", decryptedBody)
                newRes.data = JSON.parse(decryptedBody)
            }
            return newRes;
        })
        .catch((err) => {

            throw err;
        })


};

export const putCall = async <R, T>(
    url: string,
    token: string | undefined,
    extraHeaders: AxiosRequestHeaders | undefined | {},
    request: R
): Promise<T> => {
    const headers = {
        ...extraHeaders,
        Authorization: `Bearer ${token}`,
    };
    if (!token) {
        // @ts-ignore
        delete headers.Authorization;
    }
    try {
        const response = await apiPut(url, headers, request);
        debug.log("url :: ", url);
        debug.log("response from put call :: ", response.data);
        return response.data;
    } catch (error) {
        debug.log("error while trying to call api :: ", error);
        throw error;
    }
};

export const apiDelete = async (
    url: string,
    headers: any,
    requestPayload: any
) => {
    debug.log("raw request", requestPayload)
    let oneTimeKey = "";
    if (ENCRYPTED) {
        requestPayload = CipherUtils.encryptionMessage(requestPayload, PUBLIC_KEY as string)
        debug.log("request after encryption", requestPayload)
        oneTimeKey = requestPayload.key
        requestPayload = requestPayload.message
    }
    return await apiCallInit(headers)
        .delete(url, requestPayload)
        .then((res) => {
            const newRes = {...res};
            if (ENCRYPTED) {
                const body = newRes.data;
                debug.log("encrypted response body", body)
                const decryptedBody = CipherUtils.decryptAes(body, oneTimeKey as string)
                debug.log("decrypted response Body", decryptedBody)
                newRes.data = JSON.parse(decryptedBody)
            }
            return newRes;
        })
        .catch((err) => {

            throw err;
        });
};

export const deleteCall = async <R, T>(
    url: string,
    token: string | undefined,
    extraHeaders: AxiosRequestHeaders | undefined | {},
    request: R
): Promise<T> => {
    const headers = {
        ...extraHeaders,
        Authorization: `Bearer ${token}`,
    };
    if (!token) {
        // @ts-ignore
        delete headers.Authorization;
    }
    try {
        const response = await apiDelete(url, headers, request);
        debug.log("url :: ", url);
        debug.log("response from delete call :: ", response.data);
        return response.data;
    } catch (error) {
        debug.log("error while trying to call api :: ", error);
        throw error;
    }
};

export const apiGetBy = async (
        url: any,
        headers: AxiosRequestHeaders | undefined | {},
        param: any,
        paramValue: any
    ) => {

        return await apiCallInit(headers)
            .get(`${url}?${param}=${paramValue}`)
            .then((res) => {
                const newRes = {...res};
                if (ENCRYPTED) {
                    const body = newRes.data;
                    debug.log("encrypted response body", body)
                    const decryptedBody = CipherUtils.decryptAes(body, GENERAL_SYM_KEY as string)
                    debug.log("decrypted response Body", decryptedBody)
                    newRes.data = JSON.parse(decryptedBody)
                }
                return newRes;
            }).catch((err) => {
                debug.log("err response body", JSON.stringify(err))

                throw err;
            })
    }
;

export const apiGetFor = async (
    url: any,
    headers: AxiosRequestHeaders | undefined | {}
) => {

    return await apiCallInit(headers)
        .get(`${url}`)
        .then((res) => {
            const newRes = {...res};
            debug.log("raw response body", newRes)
            if (ENCRYPTED) {
                const body = newRes.data;
                debug.log("encrypted response body", body)
                const decryptedBody = CipherUtils.decryptAes(body, GENERAL_SYM_KEY as string)
                debug.log("decrypted response Body", decryptedBody)
                newRes.data = JSON.parse(decryptedBody)
            }
            return newRes;
        })
        .catch((err) => {
            debug.log("err response body", JSON.stringify(err))

            throw err;
        })
};

export const getFor = async <T>(
    url: string,
    token: string | undefined
): Promise<T> => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    if (!token) {
        // @ts-ignore
        delete headers.Authorization;
    }

    try {
        const response = await apiGetFor(url, headers);
        debug.log("url :: ", url);
        debug.log("Response from get call :: ", response.data);
        return response.data;
    } catch (error) {
        debug.log("error while trying to call api :: ", error);
        throw error;
    }
};

export const getBy = async <T>(
    url: string,
    token: string | undefined,
    param: string | [] | any,
    paramValue: string | number | [] | any
): Promise<T> => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    if (!token) {
        // @ts-ignore
        delete headers.Authorization;
    }
    debug.log("paramValue :: ", paramValue);
    if (typeof param === "object") {
        url = `${url}?${param[0]}=${paramValue[0]}`;
        for (let i = 1; i < param?.length; i++) {
            debug.log("param[i] :: ", param[i]);
            debug.log("paramValue[i] :: ", paramValue[i]);
            url = `${url}&${param[i]}=${paramValue[i]}`;
        }
    } else {
        url = `${url}?${param}=${paramValue}`;
    }
    debug.log("url :: ", url);

    try {
        const response = await apiGetFor(url, headers);
        debug.log("Response from get call :: ", response.data);
        return response.data;
    } catch (error) {
        debug.log("error while trying to call api :: ", error);
        throw error;
    }
};

export const getByWithPathParam = async <T>(
    url: string,
    token: string | undefined,
    param: string | string[],
    paramValue: string | number | undefined | any[]
): Promise<T> => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    if (!token) {
        // @ts-ignore
        delete headers.Authorization;
    }

    // url = `${url}/${paramValue}`;

    debug.log("url :: ", url);
    try {
        const response = await apiGetFor(url, headers);

        debug.log("Response from get call :: ", response.data);
        return response.data;
    } catch (error) {
        debug.log("error while trying to call api :: ", error);
        throw error;
    }
};

export const resetAuthAfter401 = () => {
    debug.api_error("redirecting back to sign in screeen")
    // store.dispatch(devotionalActions.clearDevotionalState())
    // store.dispatch(generalActions.clearGeneralState())
    // store.dispatch(moreActions.clearMoreState())
    // store.dispatch(notesActions.clearNotesState())
    // store.dispatch(screenNotificationActions.clearNotificationState())
    // store.dispatch(screenNotificationActions.clearScreenNotificationState())
    // store.dispatch(screenNotificationActions.clearScreenState())
    // store.dispatch(prayersActions.clearPrayersState())
    // store.dispatch(userActions.clearUserState())
    navigateReset(RootRoutes.Auth);
}