import { Router } from "express";
const router = Router();
import { MongoDBCarts } from "../services/dbcarts.service.js";
import { MongoDBProducts } from "../services/dbproducts.service.js";

const dbCarts = new MongoDBCarts();
const dbProducts = new MongoDBProducts();

router.post("/", async (req, res) => {
  try {
    const cartCreated = await dbCarts.create();
    cartCreated
      ? res.status(201).json({
          status: "success",
          payload: cartCreated,
        })
      : res.json({
          status: "error",
        });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const allCarts = await dbCarts.getAll();
    allCarts
      ? res.status(200).json({
          status: "success",
          payload: allCarts,
        })
      : res.status(200).json({
          status: "success",
          payload: [],
        });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

router.get("/:idCart/products", async (req, res) => {
  try {
    const idCart = req.params.idCart;
    const cart = await dbCarts.getOne(idCart);
    cart
      ? res.status(200).json({
          status: "success",
          payload: cart.products,
        })
      : res.status(404).json({
          status: "error",
          message: "Sorry, no cart found by id: " + idCart,
          payload: {},
        });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

router.put("/:idCart/products/:idProduct", async (req, res) => {
  try {
    const cart = await dbCarts.getOne(req.params.idCart);
    const product = await dbProducts.getOne(req.params.idProduct);

    if (cart && product) {
      const cartUpdated = await dbCarts.addProducts(cart, product);
      const response = await dbCarts.getOne(cartUpdated._id);
      res.status(201).json({
        status: "success",
        payload: response,
      });
    } else {
      res.status(404).json({ message: "Missing data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

export default router;
