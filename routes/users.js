const {Router} = require("express");
const con = require("../db/dbCon");
const usersSentences = require("../db/usersSql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = Router();

//register endpoint
route.post("/api/users/register", async (req, res) => {
    if(!req.body.name || !req.body.last_name || !req.body.email || !req.body.password) {
        res.status(400).send("Incomplete data");
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);
    const data = [
        req.body.name,
        req.body.last_name,
        req.body.email,
        passwordHashed
    ];
    con.query(usersSentences.register, data, err => {
        if(err) {
            console.log(err);
            res.status(500).send("Something is wrong");
            return;
        }

        res.send(`Congratulations ${data[0]}, your account has been registered`);
    });
});

//auth endpoint
route.post("/api/users/auth", (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).send("Incomplete data");
        return;
    }
    const data = {
        email : req.body.email,
        password : req.body.password
    };
    con.query(usersSentences.auth, [data.email], async (err, result) => {
        if(err) {
            res.status(500).send("Incomplete data");
            return;
        }
        //verifies if exists user
        if(result.length === 0) {
            res.status(400).send("The account doesn't exist");
            return;   
        }
        //validate password
        const verifiedPassword = await bcrypt.compare(data.password, result[0].password);
        
        //verify password
        if(!verifiedPassword) {
            res.status(400).send("Wrong password");
            return;
        }

        //making token
        jwt.sign({ check : true }, "loremloremlorem", { expiresIn : "30m" }, function(err, token) {
            if(err) {
                console.log(err);
                res.status(500).send("Something is wrong");
                return;
            }
            const message = {
                text : `Welcome ${result[0].name}`,
                token
            };
            res.send(message);
          });
    });
});

module.exports = route;