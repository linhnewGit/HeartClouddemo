require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

//mongodb+srv://<username>:<password>@cluster0.ec7tlcg.mongodb.net/
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:NzkbuIv2mKW9hLIc@cluster0.ec7tlcg.mongodb.net/?retryWrites=true&w=majority');
}
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected!"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));

app.set('view engine', 'ejs');

/*app.get("/", (req, res) => {
    res.send("Hello");
});*/

app.use("", require("./routes/routes"));

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});