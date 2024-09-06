import axios, { AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/graphql",
    headers: {
        'Content-Type': 'application/json',
    },
});

interface Product {
    name: string;
    category_sub_level_1: string;
    amount: number;
    price: number;
    cost_price: number;
    desc?: string;
}


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

    static async createProducts(product: Product) {
        try {

            const { name, category_sub_level_1, amount, cost_price, price, desc } = product

            const response = await api.post('', {
                query: `
                  mutation CreateProduct($input: CreateProductsInput!) {
                    createProducts(input: $input) {
                      status
                      message
                    }
                  }
                `,
                variables: {
                    input: {
                        name,
                        category_sub_level_1,
                        amount,
                        price,
                        cost_price,
                        desc
                    }
                }
            });

            const { data } = response.data;

            enqueueSnackbar(data?.createProducts?.message, { variant: `${data?.createProducts?.status === 500 ? "error" : "success"}` });

        } catch (error) {
            enqueueSnackbar("Create product failed", { variant: "error" });
            return
        }
    }

    static async updateProduct(id: number, product: Product) {
        try {
            const response = await api.post('', {
                query: `
                        mutation {
                            updateProducts(
                                id: ${id},
                                input: {
                                name: "${product?.name}",
                                category_sub_level_1: "${product?.category_sub_level_1}",
                                amount: ${product?.amount},
                                price: ${product?.price},
                                cost_price: ${product?.cost_price},
                                desc: "${product?.desc}"
                                }
                            ) {
                                status
                                message
                            }
                        }
                `,
            });

            const { data } = response.data;
            console.log(data);

            enqueueSnackbar(data?.updateProducts?.message, {
                variant: `${data?.updateProducts?.status === 500 ? "error" : "success"}`
            });

        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar("Updated product failed", { variant: "error" });
        }
    }

    static async deleteProducts(id: number) {
        try {

            const response = await api.post('', {
                query: `
                                    mutation {
                                        deleteProducts(id: ${id}) {
                                            status
                                            message
                                        }
                                    }
                                `
            });
            const { data } = response.data;

            enqueueSnackbar(data?.deleteProducts?.message, { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Network error", { variant: "error" });
            console.error(error);
        }
    }

}