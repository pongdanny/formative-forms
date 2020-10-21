const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const app = express();
const port = process.env.PORT || 3000;

const csrfProtection = csrf({ cookie: true });
app.use(cookieParser());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { users });
});

app.get("/create", csrfProtection, (req, res) => {
  res.render();
});

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com",
    age: 30,
    favoriteBeatle: "John Lennon",
    likesIceCream: true,
  },
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
