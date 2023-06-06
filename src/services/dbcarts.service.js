import MongoClass from "./general.service.js";
import { cartsSchema } from "../DAO/models/cart.schema.js"

export class MongoDBCarts extends MongoClass {
    constructor() {
        super("carts", cartsSchema);
    }
    async getAllItem() {
        const carts = await this.collection.find({}).populate({
            path: "products",
            populate: { path: "_id", model: "products" },
        });
        return carts;
    }
    async getOneItem(id) {
        try {
            const one = await this.collection.findById(id).populate({
                path: "products",
                populate: { path: "_id", model: "products" },
            });
            return one;
        } catch (err) {
            throw new Error (err);
        }
    }
    async addProducts (cart, product) {
        const allProducts = cart.products;
        const productExists = allProducts.find(
            (p) => p._id._id.valueOf() == product.id.valueOf()
        );
        if (productExists) {
            productExists.quantity++;
        } else {
            cart.products.push({ _id: product._id, quantity: 1});
        } 
        const cartUpdated = await this.collection.findByIdAndUpdate(cart._id, {
            products: cart.products,
        });
        return cartUpdated;
    }
    async deleteProduct (cart, productId) {
        const productInCart = cart.products.find(
            (p) => p._id == productId
        );
        if (productInCart) {
            productInCart.quantity > 1
            ? productInCart.quantity--
            : (cart.products = cart.products.filter (
                (p) => p._id != productId
            ));
        } else {
           throw new Error("Product is not in the cart")
        }
        const cartUpdated = await this.collection.findByIdAndUpdate (
            carrito._id,
            { products: cart.products }
        );
        return cartUpdated;
    }
}