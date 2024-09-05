import axios, { AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/graphql",
    headers: {
        'Content-Type': 'application/json',
    },
});


export default class Products {

    static async getProducts() {
        try {
            const response = await api.post('', {
                query: `
                    query {
                        getProducts {
                            data {
                                name
                                category_1 {
                                    name
                                }
                                amount
                                price
                                cost_price
                            }
                            meta {
                                count
                            }
                        }
                    }
                `
            });

            const { data } = response.data;

            return {
                data: data.getProducts.data,
                meta: data.getProducts.meta
            };
        } catch (error) {
            enqueueSnackbar("Network error", { variant: "error" });
            return { data: [], meta: { count: 0 } };
        }
    }

    // async createProducts(product: any) {
    //     try {

    //     } catch (error) {

    //     }
    // }

    static async deleteProducts() {
        try {
            await api.post('', {
                query: `
                    mutation {
                        deleteProducts(name: "Winter Jacket") {
                            status
                            message
                        }
                    }
                `
            });
        } catch (error) {
            enqueueSnackbar("Network error", { variant: "error" });
        }
    }


}