const TransporterNameModel = require("../models/TransporterNameModel");

// Post a Transporter Name Details
const postTransporterNameDetails = async (req, res) => {
  try {
    const { transporterName, transporterNumber } = req.body;

    // Validate the request body
    if (!transporterName  || !transporterNumber ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new Transporter Name instance
    const new_user = new TransporterNameModel({
        transporterName, transporterNumber
    });

    // Save the new Transporter Name to the database
    await new_user.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Transporter Name Details Created Successfully", new_user });
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

// Get a Transporter Name Details
const getTransporterNameDetails = async (req, res) => {
  try {
    const user = await TransporterNameModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Transporter Name Details By Id
const getSingleTransporterNameDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await TransporterNameModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Transporter Name Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Transporter Name Details
const editTransporterNameDetails = async (req, res) => {
  try {
    const users = await TransporterNameModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Transporter Name Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Transporter Name Details
const deleteTransporterNameDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await TransporterNameModel.deleteOne({ _id: id });
    res.send({ message: "Transporter Name Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    postTransporterNameDetails,
    getTransporterNameDetails,
    getSingleTransporterNameDetails,
    editTransporterNameDetails,
    deleteTransporterNameDetails,
};
