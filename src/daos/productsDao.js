import { Product } from "../models/Product";
import logger from '../utils/loggers';

class ProductsDao {
    constructor() {
        this.product = Product;
    }

    async getAllProducts() {
        try {
            const products = await this.product.find({});
            return products;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await this.product.findById(productId);
            return product;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async createProduct(product) {
        try {
            const newProduct = await this.product.create(product);
            return newProduct;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async saveProduct(product) {
        try {
            const newProduct = await product.save();
            return newProduct;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async updateProduct(productId, product) {
        try {
            const updatedProduct = await this.product.findByIdAndUpdate(productId, product);
            return updatedProduct;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async deleteProductById(productId) {
        try {
            const deletedProduct = await this.product.findByIdAndDelete(productId);
            return deletedProduct;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

export default new ProductsDao();