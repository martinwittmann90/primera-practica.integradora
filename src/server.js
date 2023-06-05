/* -------IMPORTS-------*/
import express from 'express'
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";

import viewsfsRoutes from './routes/filesystemroutes/viewsfs.routes.js';
import { apiRouter } from './routes/filesystemroutes/apifs.routes.js';
import productfsroutes from "./routes/filesystemroutes/productsfs.routes.js";
import cartfsroutes from "./routes/filesystemroutes/cartsfs.routes.js";

import viewsRoutes from "./routes/view.routes.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import chatRoutes from "./routes/chat.routes.js"

import websockets from "./websockets/websockets.js";
import exphbs from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { connectMongo } from "./utils/utils.js";

/*-------VARIABLES-------*/
const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*-------SERVIDORES-------*/
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);
websockets(io);

/*-------SETTING MIDDLEWARES-------*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/*-------SETTING HANDLEBARS-------*/
app.engine ('handlebars', exphbs.engine());
app.set('views',__dirname + "/views");
app.set("view engine", "handlebars");

/*-------SETTING ROUTES-------*/

app.use("/fs/home", viewsfsRoutes);
app.use("/fs/api", apiRouter);
app.use("/fs/products", productfsroutes)
app.use("/fs/carts", cartfsroutes)


app.use("/", viewsRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/chat", chatRoutes);
app.use('/realTimeProducts', viewsRoutes); 

//SERVER START

connectMongo();
const server = httpServer.listen(PORT, () =>
  console.log(
    `🚀 Server started on port ${PORT}. 
      at ${new Date().toLocaleString()}`
  )
);

server.on("error", (err) => console.log(err));

app.get('/*', async (req, res) => {
    return res.status(404).json({ status: 'error', message: 'incorrect route' })
  })
