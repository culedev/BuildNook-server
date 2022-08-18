const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated")

// POST "/auth/signup" -> Register user
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ errorMessage: "You must to fill the fields" });
    return;
  }

  const passRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  if (passRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "Password must contain at least 8 characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special character",
    });
    return;
  }

  try {
    const foundEmail = await User.findOne({ email: email });
    const foundUser = await User.findOne({ username: username });

    if (foundEmail !== null) {
      res.status(400).json({ errorMessage: "Email already in use" });
      return;
    }

    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "Username already in use" });
      return;
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ username, email, password: hashedPassword });
    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

// POST "/auth/login" -> User log in
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ errorMessage: "Fill the fields" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });

    if (foundUser === null) {
      res.status(400).json({ errorMessage: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (isPasswordValid === null) {
      res.status(400).json({ errorMessage: "Invalid Password" });
      return;
    }

    const payload = {
        _id: foundUser._id,
        email: foundUser.email,
    }

    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {algorithm: "HS256", expiresIn: "24h"}
    )
    res.json({authToken: authToken})
  } catch (error) {
    next(error);
  }
});

// GET "/auth/verify" => Verifies if user is active (Used for FE logic)
router.get("/verify", isAuthenticated, (req, res, next) => {
    console.log(req.payload)
    res.json(req.payload)
})

module.exports = router;
