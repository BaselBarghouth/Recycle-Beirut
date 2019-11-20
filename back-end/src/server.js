import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routers/api";

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET, PATCH");
    return res.status(200).json({});
  }
  next();
});
// start code
app.use("/users", router);
app.use("/orders", router);
app.use("/payments", router);
app.use("/v1/orders/users", router);
app.use("/v1/users/orders", router);

app.use("/v1/pickup/pickup_order", router);
app.use("/pickup", router);
app.use("/pickup_order", router);
app.use("/role", router);

app.use("/login", router);
// end code

app.use((req, res, next) => {
  const error = new Error("Soory you are using a wrong API");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
export default app;
