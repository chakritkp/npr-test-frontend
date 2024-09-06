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
                                products_id
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

    static async getProduct(id: number) {
        try {
            const response = await api.post('', {
                query: `
                    query {
                        getProduct(id: ${id}) {
                            products_id
                            name
                            category_sub_level_1
                            amount
                            price
                            cost_price
                            desc
                        }
                    }
                `,
            });

            const { data } = response.data;
            return {
                data: data?.getProduct,
            };

        } catch (error) {
            enqueueSnackbar("Network error", { variant: "error" });
            console.error("Error fetching product:", error);
            return { data: {} };
        }
    }

    static async getCategory1() {
        try {
            const response = await api.post('', {
                query: `
                    query {
                        getCategory1 {
                            name
                        }
                    }
                `
            });

            const { data } = response.data;
            return {
                data: data?.getCategory1,
            };
        } catch (error) {
            enqueueSnackbar("Network error", { variant: "error" });
            return { data: [] };
        }
    }

    // async createProducts(product: any) {
    //     try {

    //     } catch (error) {

    //     }
    // }

    static async deleteProducts(name: string) {
        try {
            const response = await api.post('', {
                query: `
                                    mutation {
                                        deleteProducts(name: "${name}") {
                                            status
                                            message
                                        }
                                    }
                                `
            });
            const { data } = response.data;
            console.log(data.deleteProducts.message)
            enqueueSnackbar(data?.deleteProducts?.message, { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Network error", { variant: "error" });
            console.error(error);
        }
    }

}