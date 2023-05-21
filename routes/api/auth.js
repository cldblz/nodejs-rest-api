const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
} = require("../../controllers/auth");

const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

module.exports = router;
