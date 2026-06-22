const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "./orders.json";

/* Home Route */

app.get("/", (req, res) => {
    res.send("FoodHub Backend Running Successfully");
});

/* Place Order */

app.post("/order", (req, res) => {

    const order = {
        id: Date.now(),
        ...req.body,
        status: "Pending"
    };

    let orders = [];

    if (fs.existsSync(FILE)) {
        orders = JSON.parse(fs.readFileSync(FILE));
    }

    orders.push(order);

    fs.writeFileSync(
        FILE,
        JSON.stringify(orders, null, 2)
    );

    res.json({
        success: true,
        message: "Order Placed Successfully"
    });

});

/* Get All Orders */

app.get("/orders", (req, res) => {

    let orders = [];

    if (fs.existsSync(FILE)) {
        orders = JSON.parse(
            fs.readFileSync(FILE)
        );
    }

    res.json(orders);

});

app.listen(5000, () => {

    console.log(
        "🚀 Server Running on port 5000"
    );

});