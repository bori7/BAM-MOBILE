import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../../type";
import {FetchGivingPayloadType} from "../giving/type";
import {getFor} from "../../index";
import {GIVING_FETCH_URL, SUBSCRIPTION_FETCH_URL} from "../../../constants/url";
import {SubscriptionFetchRequestType, SubscriptionPayloadType} from "./type";

export class SubscriptionService {
    static async fetchLiveSubscription(
        token: string | undefined,
        request: SubscriptionFetchRequestType,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SubscriptionPayloadType>> {

        const url = SUBSCRIPTION_FETCH_URL.replace("{userId}", request.userId || "");
        return await getFor(url, token);
    }
}