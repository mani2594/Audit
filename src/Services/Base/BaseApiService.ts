
import { APIError } from "./APIError";

export class BaseApiService {
    protected async fetchAuthorized(input: RequestInfo, init?: RequestInit): Promise<Response> {        

        if (!init) init = {};

        if (!init.headers) init.headers = {};

        (init.headers as any)["Authorization"] = `Bearer ${"jhviuhu"}`;
        const response = await fetch(input, init);
        if (!response.ok) {
            throw new APIError(response);
        }

        return response;
    }

    protected async asJson<T>(response: Response): Promise<T> {
        const text = await response.text();
        if(text)
            return JSON.parse(text) as T;

        // @ts-ignore
        return null;
    }
}
