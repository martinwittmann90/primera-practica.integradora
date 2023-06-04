import MongoClass from "./general.service.js";
import { productsSchema } from "../DAO/models/product.schema.js";

export class MongoDBProducts extends MongoClass {
    constructor () {
        super ("products", productsSchema );
    }
}