const express = require("express");

const {
  getAll,
  getById,
  createContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), createContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "Missing field favorite"),
  updateFavorite
);

module.exports = router;
