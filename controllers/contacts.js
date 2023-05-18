const { HttpError } = require("../helpers");
const { Contact } = require("../models/contact");

async function getAll(req, res, next) {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateFavorite(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  createContact,
  deleteContact,
  updateContact,
  updateFavorite,
};
