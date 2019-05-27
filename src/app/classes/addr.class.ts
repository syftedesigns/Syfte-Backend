export class AddrObject {
    constructor (
        public firstname: string,
        public lastname: string,
        public company: string,
        public address_1: string,
        public address_2: string,
        public city: string,
        public postcode: number | string,
        public country_id: number,
        public zone_id: number,
        public custom_field: string,
        public name: string,
        public iso_code_2: string,
        public iso_code_3: string,
        public address_format: string,
        public postcode_required,
        public status: number | boolean,
        public code: string,
        public address_id?: number,
        public customer_id?: number
    ) {}
}
