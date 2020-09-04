import * as config from "../config/App";

const baseApiUrl = config.API_HOST;

const productDetailApi = `${baseApiUrl}/api/product/`;

const productCategoriesApi = `${baseApiUrl}/api/product/type`;

export { productDetailApi, productCategoriesApi };
