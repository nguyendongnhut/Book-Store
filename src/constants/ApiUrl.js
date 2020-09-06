import * as config from "../config/App";

const baseApiUrl = config.API_HOST;

const productDetailApi = `${baseApiUrl}/api/products/`;

const productCategoriesApi = `${baseApiUrl}/api/categorys`;

export { productDetailApi, productCategoriesApi };
