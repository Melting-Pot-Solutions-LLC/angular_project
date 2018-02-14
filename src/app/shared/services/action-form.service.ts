import {Injectable} from '@angular/core';
import {ActionFormModel} from '../models/action-form.model';

@Injectable()
export class ActionFormService {

    constructor() {
    }

    getTotal(actionFormModel: ActionFormModel, company_fees: number): number {
        let total = 0;
        if (actionFormModel.state === 'DC') {
            if (actionFormModel.type === 'Purchase') {
                let title_insurance = 0;
                const number_of_thousands = Math.ceil(actionFormModel.price / 1000);
                if (number_of_thousands < 250) {
                    title_insurance = number_of_thousands * 5.7;
                } else if (number_of_thousands >= 250 && number_of_thousands < 500) {
                    title_insurance = 250 * 5.7 + (number_of_thousands - 250) * 5.1;
                } else if (number_of_thousands >= 500 && number_of_thousands < 1000) {
                    title_insurance = 250 * 5.7 + 250 * 5.1 + (number_of_thousands - 500) * 4.5;
                } else if (number_of_thousands >= 1000 && number_of_thousands < 5000) {
                    title_insurance = 250 * 5.7 + 250 * 5.1 + 500 * 4.5 + (number_of_thousands - 1000) * 3.9;
                } else if (number_of_thousands >= 5000 && number_of_thousands < 15000) {
                    title_insurance = 250 * 5.7 + 250 * 5.1 + 500 * 4.5 + 4000 * 3.9 + (number_of_thousands - 5000) * 1.05;
                } else if (number_of_thousands >= 15000) {
                    title_insurance = 250 * 5.7 + 250 * 5.1 + 500 * 4.5 + 4000 * 3.9 + 10000 * 1.05 + (number_of_thousands - 15000) * 0.9;
                } else {
                    console.log('purchase error');
                }

                const recording_fee = (actionFormModel.price < 400000) ? actionFormModel.price * 0.011 : actionFormModel.price * 0.014;
                const document_recording = 180;

                total = title_insurance + recording_fee + document_recording + company_fees;
            } else if (actionFormModel.type === 'Refinance') {
                let title_insurance = 0;
                const number_of_thousands = Math.ceil(actionFormModel.price / 1000);
                if (number_of_thousands < 250) {
                    title_insurance = number_of_thousands * 2.7;
                } else if (number_of_thousands >= 250 && number_of_thousands < 500) {
                    title_insurance = 250 * 5.7 + (number_of_thousands - 250) * 2.34;
                } else if (number_of_thousands >= 500 && number_of_thousands < 1000) {
                    title_insurance = 250 * 5.7 + 250 * 2.34 + (number_of_thousands - 500) * 1.98;
                } else if (number_of_thousands >= 1000 && number_of_thousands < 5000) {
                    title_insurance = 250 * 5.7 + 250 * 2.34 + 500 * 1.98 + (number_of_thousands - 1000) * 1.62;
                } else if (number_of_thousands >= 5000 && number_of_thousands < 15000) {
                    title_insurance = 250 * 5.7 + 250 * 2.34 + 500 * 1.98 + 4000 * 1.62 + (number_of_thousands - 5000) * 0.75;
                } else if (number_of_thousands >= 15000) {
                    title_insurance = 250 * 5.7 + 250 * 2.34 + 500 * 1.98 + 4000 * 1.62 + 10000 * 0.75 +
                        (number_of_thousands - 15000) * 0.6;
                } else {
                    console.log('refinance error 1');
                }
                const document_recording = 180;
                total = title_insurance + document_recording + company_fees;
            } else {
                console.log('refinance error 2');
            }
        } else if (actionFormModel.state === 'VA') {
            if (actionFormModel.type === 'purchase') {
                const deed_document_recording = 43;
                const loan_document_recording = (actionFormModel.loanAmount > 0) ? 56 : 0;
                const city_transfer_tax = actionFormModel.price * 0.000834;
                const mortgage_tax = actionFormModel.loanAmount * 0.000834;
                const state_transfer_tax = actionFormModel.price * 0.0025;
                const state_mortgage_tax = actionFormModel.loanAmount * 0.0025;
                let title_insurance = 0;

                const number_of_thousands = Math.ceil(actionFormModel.price / 1000)

                if (number_of_thousands < 250) {
                    title_insurance = number_of_thousands * 3.9;
                } else if (number_of_thousands >= 250 && number_of_thousands < 500) {
                    title_insurance = 250 * 3.9 + (number_of_thousands - 250) * 3.7
                } else if (number_of_thousands >= 500 && number_of_thousands < 1000) {
                    title_insurance = 250 * 3.9 + 250 * 3.7 + (number_of_thousands - 500) * 3.4
                } else if (number_of_thousands >= 1000 && number_of_thousands < 5000) {
                    title_insurance = 250 * 3.9 + 250 * 3.7 + 500 * 3.4 + (number_of_thousands - 1000) * 2.25
                } else if (number_of_thousands >= 5000) {
                    title_insurance = 250 * 3.9 + 250 * 3.7 + 500 * 3.4 + 4000 * 2.25 + (number_of_thousands - 5000) * 2.1
                } else {
                    console.log('purchase error VA');
                }

                const document_recording = 150;

                const grantor_tax = actionFormModel.price * 0.001;
                const congestion_tax = actionFormModel.price * 0.00115;

                total = title_insurance + document_recording + company_fees + grantor_tax + congestion_tax +
                    deed_document_recording + loan_document_recording + city_transfer_tax + mortgage_tax +
                    state_transfer_tax + state_mortgage_tax;
            } else if (actionFormModel.type === 'refinance') {

                // const deed_document_recording = 43
                const loan_document_recording = (actionFormModel.loanAmount > 0) ? 56 : 0;
                // const city_transfer_tax = actionFormModel.price*0.000834
                const mortgage_tax = actionFormModel.loanAmount * 0.000834;
                // const state_transfer_tax = actionFormModel.price*0.0025
                const state_mortgage_tax = actionFormModel.loanAmount * 0.0025;
                let title_insurance = 0;

                const number_of_thousands = Math.ceil(actionFormModel.price / 1000);
                if (number_of_thousands < 250) {
                    title_insurance = number_of_thousands * 2.9;
                } else if (number_of_thousands >= 250 && number_of_thousands < 500) {
                    title_insurance = 250 * 2.9 + (number_of_thousands - 250) * 2.7;
                } else if (number_of_thousands >= 500 && number_of_thousands < 1000) {
                    title_insurance = 250 * 2.9 + 250 * 2.7 + (number_of_thousands - 500) * 2.4;
                } else if (number_of_thousands >= 1000 && number_of_thousands < 5000) {
                    title_insurance = 250 * 2.9 + 250 * 2.7 + 500 * 2.4 + (number_of_thousands - 1000) * 1.25;
                } else if (number_of_thousands >= 5000) {
                    title_insurance = 250 * 2.9 + 250 * 2.7 + 500 * 2.4 + 4000 * 1.25 + (number_of_thousands - 5000) * 1.1;
                } else {
                    console.log('refinance error VA 1')
                }

                // document_recording = 180
                total = title_insurance + actionFormModel.price + loan_document_recording + mortgage_tax + state_mortgage_tax;

            } else {
                console.log('error VA')
            }
        } else {
            alert('invalid state');
        }
        return total;
    }
}
