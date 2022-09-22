const express = require("express")
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


app.post("/registerUser", async (req, res) => {
    try {
        const { firstName, secondName, countryName, phoneNumber, email, password, conPassword } = req.body
        const newUser = await pool.query(
            "INSERT INTO users (firstName,secondName,countryName,phoneNumber,email,password,conPassword) VALUES ($1,$2,$3,$4,$5,$6,$7)",
            [firstName, secondName, countryName, phoneNumber, email, password, conPassword]
        )
        res.json("Success")
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/getUsers", async (req, res) => {
    try {

        const allUsers = await pool.query(
            "SELECT * FROM users"
        )
        res.json(allUsers.rows)
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {

    console.log("Server has started on port 5000");

});