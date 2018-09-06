/*******************************************
** Author            : Melting Pot Solutions LLC
** Last modified     : 09/05/2018
**
********************************************/

import {TotalInfoModel} from '../shared/models/total.Info.model';

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
    totalInfo: TotalInfoModel;
}
