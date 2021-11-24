const {Router} = require("express");
const con = require("../db/dbCon");
const furnitureSentences = require("../db/furnitureSql");
const route = Router();

//verify data entry
route.use("/api/furniture",(req, res, next) => {
    if(req.path === "/read"){
        return next();
    }

    if(req.path === "/delete") {
        if(!req.headers.id){
            return res.status(400).send("Incomplete data");
        }
       return next();
    }
    if(req.path === "/add") {
        if(!req.body.name || !req.body.brand || !req.body.furniture_type || !req.body.price || !req.body.stock) { 
            
           return res.status(400).send("Incomplete data");
        }
        return next();
    }
    if(req.path === "/modify") {
        if(!req.body.name || !req.body.brand || !req.body.furniture_type || !req.body.price || !req.body.stock || !req.body.id) { 
            return res.status(400).send("Incomplete data");
        }
       return next();
    }
})

//sends all 
route.get("/api/furniture/read", (req, res) => {
    con.query(furnitureSentences.read, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send("Something is wrong");
            return;
        }
        res.send(result);
    });
});

//add a furniture
route.post("/api/furniture/add", (req, res) => {

    const data = [
        req.body.name,
        req.body.brand,
        req.body.furniture_type,
        req.body.price,
        req.body.stock
    ];
    con.query(furnitureSentences.create, data, err => {
        if(err){
            console.log(err);
            res.status(500).send("Something is wrong");
            return;
        }
        res.send("Added a furniture");
    });
});

//modify a furniture
route.put("/api/furniture/modify", (req, res) => {
    const data = [
        req.body.name, 
        req.body.brand,
        req.body.furniture_type,
        req.body.price,
        req.body.stock,
        req.body.id
    ];
    con.query(furnitureSentences.update, data, err => {
        if(err){
            console.log(err);
            res.status(500).send("Something is wrong");
            return;
        }
        res.send("A furniture was mofified");
    });
});

//delete a furniture
route.delete("/api/furniture/delete", (req, res) => {
    const id = req.headers.id;
    con.query(furnitureSentences.delete, [id], err => {
        if(err) {
            console.log(err);
            res.status(500).send("Something is wrong");
            return;
        }
        res.send("A funiture was deleted");
    })
})

module.exports = route;