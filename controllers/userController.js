const { data } = require("../Db/db");
const { nanoid } = require("nanoid"); // is used to create unique id
const bcrypt = require("bcrypt"); // is used to brcypt password
var jwt = require("jsonwebtoken"); //is used to create token with specified string and user id

//Register Handle

exports.registerUser = (req, res) => {
  const { password, username, email } = req.body;

  //controlling if the db contains the username

  const user = data.some((i) => i.username === username);

  // if contains send an error

  if (user) {
    return res
      .status(500)
      .json({ success: false, message: "Username is already exist!" });
  }

  //creating unique id
  const id = nanoid(5);

  //hashing password
  bcrypt.hash(password, 10).then((hashedPassword) => {
    data.push({ id, username, email, hashedPassword });
    res.status(201).json(data[data.length - 1]);
  });
};

//Login Handle

exports.loginUser = (req, res) => {
  const { password, username } = req.body;
  const user = data.find((i) => i.username === username);

  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "username or password is false" });
  }

  bcrypt
    .compare(password, user.hashedPassword)
    .then((result) => {
      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_STRING, {
          expiresIn: "1h",
        });
        return res.status(200).json({ user, token });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "username or password is false" });
      }
    })
    .catch(() => {
      return res
        .status(500)
        .json({ success: false, message: "Internal server Error" });
    });
};

//Get All Users Handle

exports.getAllUsers = (req, res) => {
  res.status(200).json(data);
};

// Get Specific User

exports.getUser = (req, res) => {
  const { id } = req.params;
  const user = data.find((i) => i.id === id);
  if (!user) {
    res.status(404).json({ success: false, message: "user not found" });
  }
  res.status(200).json(user);
};

//update user with patch

exports.updateUser = (req, res) => {
  const { id } = req.user;

  const { password, email, username } = req.body;

  index = data.findIndex((i) => i.id === id);

  switch (req.body) {
    case email !== undefined:
      data[index]["email"] = email;
      break;
    case username !== undefined:
      data[index]["username"] = username;
      break;
    default:
      break;
  }
  if (password) {
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        data[index]["password"] = hashedPassword;
      })
      .then(() => res.status(201).json({ success: true, user: data[index] }))
      .catch(() =>
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" })
      );
  } else {
    return res.status(201).json({ success: true, user: data[index] });
  }
};

// //update put with user

exports.putUser = (req, res) => {
  const { id } = req.user;

  const { password, email, username } = req.body;

  if (!password || !email || !username) {
    return res.status(403).json({
      success: false,
      message: "password, email and username required!",
    });
  }

  index = data.findIndex((i) => i.id === id);

  data[index]["email"] = email;
  data[index]["username"] = username;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      data[index]["password"] = hashedPassword;
    })
    .then(() => res.status(201).json({ success: true, user: data[index] }))
    .catch(() =>
      res.status(500).json({ success: false, message: "Internal Server Error" })
    );
};

// Delete the User

exports.deleteUser = (req, res) => {
  const { id } = req.user;
  index = data.findIndex((i) => i.id === id);
  data.splice(index, 1);
  res.status(201).json({ success: true, message: "Item is deleted" });
};
