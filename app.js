const express = require("express");
const cors = require("cors");
const app = express();
const furniture = require("./routes/furnitures");
const users = require("./routes/users");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());
app.use("/api/furniture", (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(400).send("There's no token");
    }
    jwt.verify(token, "loremloremlorem", (err, decoded) => {
        if(err){
            return res.status(400).send("Invalid token");
        }
        req.decoded = decoded;
        next();
    })
});
app.use(furniture);
app.use(users);



app.listen("8000", () => console.log("server online on port 8000"));