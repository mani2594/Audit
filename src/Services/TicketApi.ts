import { Audit } from "../Components/Incident/Incident";
import { EasyApiService } from "./Base/EasyApiService";

const URLs = {
    GetAllTicket: "getAudit?uid={uid}",
    CreateAudit: "createAudit",
    EditAudit: "editAudit",
}

class TicketApiServiceClass extends EasyApiService {
    public getAllTicket = (uid: string) => this.fetchEasy<Audit[]>(
        URLs.GetAllTicket.replace("{uid}", uid));
    public createAudit = (audit: Audit) => this.postEasy<void>(URLs.CreateAudit, audit);
    public EditAudit = (audit: Audit) => this.postEasy<void>(URLs.EditAudit, audit);
}

export const TicketApi = new TicketApiServiceClass();