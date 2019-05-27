export class ObjectDocument {
    constructor (
        public img: string,
        public documento: string,
        public estado: boolean,
        public client_id?: number | any,
        public key?: string
    ) {}
}
