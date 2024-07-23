const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const connection = require("./config/db");
const UserRoutes = require("./routes/UserRoutes");
const ExporterRoutes = require("./routes/ExporterRoutes");
const ImporterRoutes = require("./routes/ImporterRoutes");
const ClearingAgentRoutes = require("./routes/ClearingAgentRoutes");
const BankRoutes = require("./routes/BankRoutes");
const ItemNameRoutes = require("./routes/ItemNameRoutes");
const FinancerRoutes = require("./routes/FinancerRoutes");
const SalesContractRoutes = require("./routes/SalesContractRoutes");
const ShippingDetailsRoutes = require("./routes/ShippingDetailsRoutes");
const ShippingLineRoutes = require("./routes/ShippingLineRoutes");
const TransporterNameRoutes = require("./routes/TransporterNameRoutes");
const FinanceGenerationRoutes = require("./routes/FinanceGenerationRoutes");
const RepaymentRoutes = require("./routes/RepaymentRoutes");

const app = express();
app.use(cors());
PORT = process.env.PORT || 8000;

const http = require("http");
const socketIO = require("socket.io");
const httpServer = http.createServer(app);
const io = socketIO(httpServer);
const path = require("path");


// Middlewares
app.use(bodyParser.json());

// Get Request
app.get("/", async (req, res) => {
  res.send("Connected to server");
});

// Routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", UserRoutes);
app.use("/", ExporterRoutes);
app.use("/", ImporterRoutes);
app.use("/", ClearingAgentRoutes);
app.use("/", BankRoutes);
app.use("/", ItemNameRoutes);
app.use("/", FinancerRoutes);
app.use("/", SalesContractRoutes);
app.use("/", ShippingDetailsRoutes);
app.use("/", ShippingLineRoutes);
app.use("/", TransporterNameRoutes);
app.use("/", FinanceGenerationRoutes);
app.use("/", RepaymentRoutes);


// Listening & Connection

httpServer.listen(PORT, async () => {
  try {
    await connection;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
  console.log(`Listening on PORT ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle custom events here
  socket.on("customEvent", (data) => {
    console.log("Received custom event:", data);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


