const asyncHandler = require("express-async-handler"); //handles async errors
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc GET a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //prevent a user from viewing contacts of another user.
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("This contact doesn't belong to this user");
  }
  res.status(200).json(contact);
});

//@desc UPDATE a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  //check if contact exists
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //prevent a user from updating contacts of another user.
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other users contacts"
    );
  }

  //find and update
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc DELETE a contact
//@route delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  //check if contact exists
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //prevent a user from deleting contacts of another user.
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to delete other users contacts"
    );
  }

  //find and delete
  await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
