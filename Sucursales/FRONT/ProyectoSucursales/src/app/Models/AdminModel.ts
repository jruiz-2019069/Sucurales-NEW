export class AdminModel{
    constructor(
        public _id: string,
        public name: string,
        public userAdmin: string,
        public passwordAdmin: string,
        public role: string
    ){};
}