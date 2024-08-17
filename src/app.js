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
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối đến cơ sở dữ liệu và đồng bộ các model
connectToDB();

app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/bookings", bookingRouter);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
