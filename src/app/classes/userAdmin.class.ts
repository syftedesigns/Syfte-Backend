export class UserAdminModel {
    constructor(
        public admin_user: string,
        public admin_pwd: string,
        public admin_email: string,
        public admin_name?: string,
        public admin_priority?: number,
        public admin?: number,
    ) {}
}
