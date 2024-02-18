import {AxiosRequestHeaders} from "axios";
import {GenericResponseType} from "../../type";
import {FetchGivingPayloadType} from "../giving/type";
import {getFor} from "../../index";
import {GIVING_FETCH_URL, SUBSCRIPTION_FETCH_URL} from "../../../constants/url";
import {SubscriptionPayloadType} from "./type";

export class SubscriptionService {
    static async fetchLiveSubscription(
        token: string | undefined,
        extraHeaders?: AxiosRequestHeaders | undefined | {}
    ): Promise<GenericResponseType<SubscriptionPayloadType>> {
        return await getFor(SUBSCRIPTION_FETCH_URL, token);
    }
}