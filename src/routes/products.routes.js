import { Router } from "express";
import { MongoDBProducts } from "../services/dbproducts.service.js";
import { validateNumber } from "../utils/utils.js";
import { checkRequest } from "../middleware/validators.js";
import multer from "multer";
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
router.use(multer({storage}).single("thumbnail"));

const dbProducts = new MongoDBProducts();

router.get("/", async (req, res) => {
    try {
        const products = await dbProducts.getAll();
        const limit = req.query.limit;
        const isValidLimit = validateNumber(limit);
        products
            ? isValidLimit
            ? res.status(200).json({
                status: "success",
                payload: products.slice(0, limit),
                })
            : res.status(200).json({
                status: "success",
                payload: products,
                })
            : res.status(200).json({ status: "success", payload: [] });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await dbProducts.getOne(id);
        product
            ? res.status(200).json({
                status: "success",
                payload: product,
            })
            : res.status(404).json({
                status: "error",
                message: "Sorry, no product found by id: " + id,
                payload: {},
            });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

router.post("/", checkRequest, async (req, res) => {
    try {
        const newProduct = req.body;
        const allProducts = await dbProducts.getAll();
        const product = allProducts.find(
            (product) => product.code == newProduct.code
        );
        if (product) {
            res.status(400).json({
                status: "error",
                payload: "Invalid request body. Code already exists: " + newProduct.code,
            });
            return;
        }
        const productCreated = await dbProducts.create(newProduct);
        console.log(productCreated);
        res.status(201).json({
            status: "success",
            payload: productCreated,
        });
        } catch (err) {
            res.status(err.status || 500).json({
                status: "error",
                payload: err.message,
            });
        }
    });

router.put("/:id", checkRequest, async (req, res) => {
    try {
        const id = req.params.id;
        const newProduct = req.body;
        const productUpdated = await dbProducts.updateProduct(id, newProduct);
        res.status(200).json({
            status: "success",
            payload: productUpdated,
        });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const productDeleted = await dbProducts.delete(id);
        res.status(200).json({
            status: "success",
            payload: productDeleted,
        });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });
    
export default router;