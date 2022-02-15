export interface Iservice {
    domain: string;
    secure: boolean;
    routes: { [key: string]: string };
}

export interface IserviceList {
    [key: string]: Iservice;
}
