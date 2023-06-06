import { connect, Schema, model } from 'mongoose';
import ProductManager from "../DAO/appManager/productManager.js";
import { MessageModel } from '../DAO/models/message.model.js';
import { MongoDBProducts } from '../services/dbproducts.service.js';

const path = "src/DAO/db/products.json";

const newProductManager = new ProductManager(path);
const productManager = new MongoDBProducts();

const handleNewProduct = async (dataNewProduct, io) => {
  try {
    await productManager.create(dataNewProduct);
    const productListUpdated = await productManager.getAll();
    io.sockets.emit("products_back_to_front", { productListUpdated });
  } catch (err) {
    console.log(err);
  }
};

const handleMessageFromFront = async (message, io) => {
  try {
    const msgCreated = await MessageModel.create(message);
    const messageChat = await MessageModel.find({});
    io.sockets.emit('chat_back_to_front', messageChat);
  } catch (err) {
    console.log(err);
  }
};

const handleDeleteProduct = async (socket, id, io) => {
  try {
    await productManager.delete(id);
    socket.emit('productDeleted', { message: 'Product successfully removed' });
    const productListUpdated = await productManager.getAll();
    io.emit('products_back_to_front', {productListUpdated} );
  } catch (error) {
    console.error('Error deleting the product:', error);
  }
};

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New client websocket: ", socket.id);

    socket.on("product_front_to_back", async (dataNewProduct) => {
      handleNewProduct(dataNewProduct, io);
    });

    socket.on('deleteProduct', async (id) => {
      handleDeleteProduct(socket, id, io);
    });

    socket.on('chat_front_to_back', async (message) => {
      handleMessageFromFront(message, io);
    });
  });
};





