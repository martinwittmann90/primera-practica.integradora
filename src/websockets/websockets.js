import { connect, Schema, model } from 'mongoose';
import ProductManager from "../DAO/appManager/productManager.js";
const path = "src/DAO/db/products.json";
const newProductManager = new ProductManager(path);
import { MessageModel } from '../DAO/models/message.model.js';

const handleNewProduct = async (data, io) => {
  try {
    await newProductManager.addProduct(data);
    const productListUpdated = await newProductManager.getProducts();
    io.sockets.emit("products_back_to_front", productListUpdated);
  } catch (err) {
    console.log(err);
  }
};

const handleMessageFromFront = async (message, io) => {
  try {
    const msgCreated = await MessageModel.create(message);
    const messagesChat = await MessageModel.find({});
    io.sockets.emit('chat_back_to_front', messagesChat);
  } catch (err) {
    console.log(err);
  }
};

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New client websocket: ", socket.id);
    socket.on("product_front_to_back", async (data) => {
      handleNewProduct(data, io);
    });
    socket.on('chat_front_to_back', async (message) => {
      handleMessageFromFront(message, io);
    });
  });
};










