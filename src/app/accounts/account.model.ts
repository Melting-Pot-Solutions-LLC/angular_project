export class Account {
    id: string;
    title: string;
    description: string;
    phone: string;
    website: string;
    facebook: string;
    address: string;
    fees: number;
    email: string;
    image: {
        path: string,
        name: string,
    };
    rating: number;
    data: any;
    total_price: number;
}
