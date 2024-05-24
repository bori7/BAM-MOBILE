import {AxiosRequestHeaders} from "axios";
import {apiCallInit} from "../shared/helper";
import {navigationRef} from "@shared/components/InactivityWrapper";
import {navigateReset} from "@shared/lib/navigate";
import {RootRoutes} from "@shared/const/routerRoot";
import {devotionalActions} from "@store/slices/devotional";
import {generalActions} from "@store/slices/general";
import {moreActions} from "@store/slices/more";
import {notesActions} from "@store/slices/notes";
import {screenNotificationActions} from "@store/slices/notification";
import {prayersActions} from "@store/slices/prayer";
import {userActions} from "@store/slices/user";
import {store} from "@store/index";

export const apiPost = async (
    url: string,
    headers: any,
    requestPayload: any
) => {
    debug.log("request", requestPayload)
    return await apiCallInit(headers)
        .post(url, requestPayload)
        .then((res) => {
            const newRes = {...res};
            return newRes;
        })
        .catch((err) => {
            if (err.toJSON().status === 401) {
                resetAuthAfter401()
            }
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
    return await apiCallInit(headers)
        .put(url, requestPayload)
        .then((res) => {
            const newRes = {...res};
            return newRes;
        })
        .catch((err) => {
            if (err.toJSON().status === 401) {
                resetAuthAfter401()
            }
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
    debug.log("request", requestPayload)
    return await apiCallInit(headers)
        .delete(url, requestPayload)
        .then((res) => {
            const newRes = {...res};
            return newRes;
        })
        .catch((err) => {
            if (err.toJSON().status === 401) {
                resetAuthAfter401()
            }
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

export const apiGetBy = (
    url: any,
    headers: AxiosRequestHeaders | undefined | {},
    param: any,
    paramValue: any
) =>
    apiCallInit(headers)
        .get(`${url}?${param}=${paramValue}`)
        .then((res) => {
            const newRes = {...res};
            return newRes;
        })  .catch((err) => {
        if (err.toJSON().status === 401) {
            resetAuthAfter401()
        }
        throw err;
    })
;

export const apiGetFor = (
    url: any,
    headers: AxiosRequestHeaders | undefined | {}
) =>
    apiCallInit(headers)
        .get(`${url}`)
        .then((res) => {
            const newRes = {...res};
            return newRes;
        })
        .catch((err) => {
            if (err.toJSON().status === 401) {
                resetAuthAfter401()
            }
            throw err;
        });

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

const resetAuthAfter401 = () => {
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