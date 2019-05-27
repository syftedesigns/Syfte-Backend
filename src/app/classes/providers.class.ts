export class ObjectSoluclicProvider {
    constructor (
        public store_id: number,
        public language_id: number,
        public firstname: string,
        public lastname: string,
        public email: string,
        public telephone: number,
        public fax: number,
        public cart: string,
        public wishlist: string,
        public address_id: number,
        public custom_field: string,
        public ip: number | string,
        public status: string,
        public safe: string,
        public date_added: Date,
        public company: string,
        public address_1: string,
        public address_2: string,
        public city: string,
        public postcode: string,
        public country_id: number,
        public zone_id: number,
        public customer_id?: number,
        public customer_group_id?: number
    ) {}
}
