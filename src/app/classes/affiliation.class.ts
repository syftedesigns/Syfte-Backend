export class AffiliationClass {
    constructor (
        public client_email: string,
        public client_name: string,
        public client_service: string,
        public client_campaign: string,
        public client_coupon?: string,
        public client_email_sended?: boolean,
        public client_id?: number,
        public date?: Date
    ) {}
}
