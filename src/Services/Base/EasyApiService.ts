import { BaseApiService } from "./BaseApiService";


export class EasyApiService extends BaseApiService {
    protected async fetchEasy<T>(url: string, init?: RequestInit) {
        let baseUrl = "http://localhost:3000/api/";
        const fullUrl = baseUrl + url;
        const response = await this.fetchAuthorized(fullUrl, init);
        return this.asJson<T>(response);
    }

    protected async postEasy<T>(url: string, body: any) {
        return await this.fetchEasy<T>(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    protected async patchEasy<T>(url: string, body: any) {
        return await this.fetchEasy<T>(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    protected async deleteEasy<T>(url: string): Promise<T>;
    protected async deleteEasy<T>(url: string, body: any): Promise<T>;
    protected async deleteEasy<T>(url: string, body?: any) {
        const init: any = {
            method: "DELETE",
        };

        if (body) {
            init.headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
            };
            init.body = JSON.stringify(body);
        }

        return await this.fetchEasy<T>(url, init);
    }

    protected async uploadEasy<T>(url: string, file: File[]) {
        const formData = new FormData();
        for (let name in file) {
            formData.append(name, file[name]);
        }
        return await this.fetchEasy<T>(url, {
            method: "POST",
            body: formData,
        });
    }
}
