const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const app = express();
const port = process.env.PORT || 3000;

const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());
app.use(express.urlencoded());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { users });
});

app.get("/create", csrfProtection, (req, res, next) => {
  res.render("create-normal", { csrfToken: req.csrfToken() });
});

app.post("/create", csrfProtection, (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;

  const errors = [];
  if (!firstName) {
    errors.push("Please provide a first name.");
  }
  if (!lastName) {
    errors.push("Please provide a last name.");
  }
  if (!email) {
    errors.push("Please provide an email.");
  }
  if (!password) {
    errors.push("Please provide a password.");
  }
  if (password !== confirmedPassword) {
    errors.push(
      "The provided values for the password and password confirmation fields did not match."
    );
  }

  res.render("create-normal", {
    errors,
    firstName,
    lastName,
    email,
    password,
    confirmedPassword,
  });
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
