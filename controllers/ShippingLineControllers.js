const ShippingLineModel = require("../models/ShippingLineModel");

// Post a Shipping Line Details
const postShippingLineDetails = async (req, res) => {
  try {
    const { shippingName, shippingGSTNumber } = req.body;

    // Validate the request body
    if (!shippingName  || !shippingGSTNumber ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new Shipping Line instance
    const new_user = new ShippingLineModel({
        shippingName, shippingGSTNumber
    });

    // Save the new Shipping Line to the database
    await new_user.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Shipping Line Details Created Successfully", new_user });
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

// Get a Shipping Line Details
const getShippingLineDetails = async (req, res) => {
  try {
    const user = await ShippingLineModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Shipping Line Details By Id
const getSingleShippingLineDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await ShippingLineModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Shipping Line Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Shipping Line Details
const editShippingLineDetails = async (req, res) => {
  try {
    const users = await ShippingLineModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Shipping Line Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Shipping Line Details
const deleteShippingLineDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await ShippingLineModel.deleteOne({ _id: id });
    res.send({ message: "Shipping Line Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    postShippingLineDetails,
    getShippingLineDetails,
    getSingleShippingLineDetails,
    deleteShippingLineDetails,
    editShippingLineDetails,
};
