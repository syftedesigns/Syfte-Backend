/* Clase que se encarga de enviar los emails personalizados */
export class SyfteInboxClass {
    constructor(
        public client_email: string,
        public client_name: string,
        public client_service: string,
        public subject: string,
        public message: string,
        public emaiLType: string,
        public file?: File
    ) {}
}
