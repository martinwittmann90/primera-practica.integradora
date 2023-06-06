import { Router } from "express";
const router = Router()
import ProductManager from "../DAO/appManager/productManager.js";
const path = "src/DAO/db/products.json";

import { validateNumber } from "../utils/utils.js";
import {MongoDBProducts} from "../services/dbproducts.service.js"

const newProductManager = new MongoDBProducts;

router.get("/", async (req, res) => {
    try {
        const products = await newProductManager.getAllItem();
        const limit = req.query.limit;
        const isValidLimit = validateNumber(limit);
        products
            ? isValidLimit
            ? res.render("home", {
                products: products.slice(0, limit),
                })
            : res.render("home", {
                products: products,
                })
            : res.render("home", {
                products: [],
            });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await newProductManager.getAllItem();
        const limit = req.query.limit;
        const isValidLimit = validateNumber(limit);
        products
            ? isValidLimit
            ? res.render("realTimeProducts", {
                products: products.slice(0, limit),
                })
            : res.render("realTimeProducts", {
                products: products,
                })
            : res.render("realTimeProducts", {
                products: [],
            });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

export default router;