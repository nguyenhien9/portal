require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./models/index");
const {
  staffRouter,
  serviceRouter,
  customerRouter,
  bookingRouter,
} = require("./routes");
const ERROR_CODE = require("./constants/errorCode");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(
  cors({
    // origin: "http://localhost:5173",
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true, //access-control-allow-credentials:true
    // optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối đến cơ sở dữ liệu và đồng bộ các model
connectToDB();

app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/bookings", bookingRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    status: "failed",
    code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
    message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
