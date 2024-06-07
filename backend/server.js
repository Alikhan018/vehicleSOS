const express = require("express");
const bodyParser = require("body-parser");
const LogUsers = require("./routes/LogUsers");
const logWorkshop = require("./routes/logWorkshop");
const userData = require("./routes/data/userData");
const workshopData = require("./routes/data/workshopData");
const mapRenderUser = require("./routes/mapRenders/maprenderuser");
const brokenCars = require("./routes/brokenCars/fetchbrokencars");
const mapRenderbrokenCars = require("./routes/mapRenders/maprenderbrokenCars");
const carParts = require("./routes/carParts/getcarParts");
const orders = require("./routes/carParts/orders");
const getNotifs = require("./routes/Notifs/getNotifs");
const dismiss = require("./routes/Notifs/dismiss");

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", LogUsers);
app.use("/api/auth", logWorkshop);
app.use("/api/data/user", userData);
app.use("/api/data/user/w", workshopData);
app.use("/api/location", mapRenderUser);
app.use("/api/location/brokenCars", mapRenderbrokenCars);
app.use("/api/brokencars", brokenCars);
app.use("/api/parts", carParts);
app.use("/api/parts", orders);
app.use("/api/notifs", getNotifs);
app.use("/api/notifs", dismiss);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
