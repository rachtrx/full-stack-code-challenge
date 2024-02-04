import axios from "axios";

const API_URL = "http://localhost:3001/api/currencies/";


export default class CurrencyService {

    static header() {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return {};
        }
        return {
            'x-access-token': token,
        };
    }
    
    static async addCurrencyToDB(currency) {
        try {
            console.log(currency);
            console.log(this.header());
            const response = await axios.post(API_URL + "add", currency, { headers: this.header() });
            return response.data;
        } catch(err) {
            throw err;
        }
        
    }

    static async updateCurrencyInDB(currency) {
        try {
            await axios.patch(API_URL + `update/${currency.id}`, currency, { headers: this.header() });
        } catch(err) {
            throw err;
        }
    }

    static async deleteCurrencyFromDB(currencyId) {
        try {
            await axios.delete(API_URL + `delete/${currencyId}`, { headers: this.header() });
        } catch(err) {
            throw err;
        }
    }

    static async fetchCurrencies() {
        try {
            console.log("fetching currencies");
            const response = await axios.get(API_URL, { headers: this.header() });
            console.log(response);
            return response.data
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
