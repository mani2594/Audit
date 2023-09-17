import { LoginModel } from "../Components/Login/Login";
import { EasyApiService } from "./Base/EasyApiService";

const URLs = {    
    login: "login",
}

export interface LoginResponse{
    token: string;
    uid: string;
    username: string;
    auditor: boolean
}
class LoginApiServiceClass extends EasyApiService {
    public login = (login: LoginModel) => this.postEasy<LoginResponse>(URLs.login, login);
}

export const LoginApi = new LoginApiServiceClass();