const ItemNameModel = require("../models/ItemNameModel");

// Post a ItemName Details
const postItemNameDetails = async (req, res) => {
  try {
    const { itemSlNo, itemName } = req.body;

    // Validate the request body
    if (!itemSlNo || !itemName ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new importer instance
    const new_user = new ItemNameModel({
        itemSlNo, itemName
    });

    // Save the new importer to the database
    await new_user.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Item Name Details Created Successfully", new_user });
  } catch (error) {
    console.error(error);

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Validation Error", Details: error.message });
    }

    // Handle any other errors
    res
      .status(500)
      .send({ message: "An unexpected error occurred", Error: error.message });
  }
};

// Get a ItemName Details
const getItemNameDetails = async (req, res) => {
  try {
    const user = await ItemNameModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single ItemName Details By Id
const getSingleItemNameDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await ItemNameModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Item Name Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit ItemName Details
const editItemNameDetails = async (req, res) => {
  try {
    const users = await ItemNameModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Item Name Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Importer Details
const deleteItemNameDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await ItemNameModel.deleteOne({ _id: id });
    res.send({ message: "Item Name Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postItemNameDetails,
  getItemNameDetails,
  getSingleItemNameDetails,
  deleteItemNameDetails,
  editItemNameDetails,
};
