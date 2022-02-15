import { IserviceList } from "@/types/Service";

export const domain = "localhost";

const services: IserviceList = {
    main: {
        domain: `${process.env.DOMAIN}/api/v1`,
        secure: false,
        routes: {
            auth: "user/auth/%id%/hi",
        },
    },
};

export default services;
