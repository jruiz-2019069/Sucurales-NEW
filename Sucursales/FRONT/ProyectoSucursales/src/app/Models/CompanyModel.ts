export class CompanyModel{
    constructor(
        public _id: string,
        public name: string,
        public typeCompany: string,
        public location: string,
        public phone: string,
        public email: string,
        public userCompany: string,
        public passwordCompany: string,
        public role: string
    ){};
}