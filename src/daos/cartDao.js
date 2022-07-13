import Cart from '../models/cart';
import Product from '../models/product';
import User from '../models/user';
import logger from '../utils/loggers';

class CartDao {
    constructor() {
        this.cart = Cart;
        this.product = Product;
        this.user = User;
    }

    async getAllCarts() {
        try {

            const carts = await this.cart.find({});
            return carts;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await this.cart.findById(cartId);
            return cart;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async createCart(userId) {
        try {
            const cart = new this.cart({
                user: userId
            });
            const newCart = await cart.save();
            return newCart;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async saveCart(cart) {
        try {
            const newCart = await cart.save();
            return newCart;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async deleteCartById(cartId) {
        try {
            const cart = await this.cart.findByIdAndDelete(cartId);
            return cart;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getCartProducts(cartId) {
        try {
            const cart = await this.cart.findById(cartId);
            const products = await this.product.find({ _id: { $in: cart.products } });
            return products;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.cart.findById(cartId);
            const product = await this.product.findById(productId);
            cart.products.push(product._id);
            await cart.save();
            return cart;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await this.cart.findById(cartId);
            const product = await this.product.findById(productId);
            cart.products.pull(product._id);
            await cart.save();
            return cart;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getCart(userId) {
        try {
            const cart = await this.cart.findOne({
                where: {
                    userId: userId
                }
            });
            return cart;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async buyCart(cartId) {
        try {
            const cart = await this.cart.findById(cartId);
            cart.status = 'completed';
            await cart.save();
            return cart;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

export default new CartDao();