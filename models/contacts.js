const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const parsedData = await listContacts();
  const contact = await parsedData.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const parsedData = await listContacts();
  const contactIndex = await parsedData.findIndex(
    (contact) => contact.id === contactId
  );
  const deletedContact = parsedData[contactIndex];
  parsedData.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(parsedData, null, 2));
  return deletedContact;
}

async function addContact({ name, email, phone }) {
  const id = nanoid();
  const newContact = { name, email, phone, id };
  const parsedData = await listContacts();
  parsedData.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(parsedData, null, 2));
  return newContact;
}

async function updateContact(contactId, body) {
  const data = await listContacts();
  const contactIndex = await data.findIndex(
    (contact) => contact.id === contactId
  );
  if (!data[contactIndex]) {
    return null;
  }
  data[contactIndex] = { ...data[contactIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
