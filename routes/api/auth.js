const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
} = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewares");

const tempDir = path.join(__dirname, "../", "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch("/avatars", authenticate, upload.single("picture"), updateAvatar);

module.exports = router;
