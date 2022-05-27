export class productCompanyModel{
    constructor(
        public _id: string,
        public name: string,
        public supplier: string,
        public price: number,
        public stock: number,
        public idCompany: string
    ){}
}