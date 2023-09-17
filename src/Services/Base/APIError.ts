export class APIError extends Error {
    public response: Response;

    constructor(response: Response) {
        super(`Server returned a ${response.status} response.`);
        this.name = "APIError";
        this.response = response;
    }
}