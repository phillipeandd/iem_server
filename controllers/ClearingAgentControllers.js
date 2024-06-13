const ClearingAgentModel = require("../models/ClearingAgentModel");

// Post a Clearing Agent Details
const postClearingAgentDetails = async (req, res) => {
  try {
    const {
      agentCompanyName,
      agentEmailAddress,
      agentContactPersonName,
      agentContactPersonNo,
      agentAddress,
    } = req.body;

    // Validate the request body
    if (!agentCompanyName || !agentEmailAddress || !agentContactPersonName || !agentContactPersonNo || !agentAddress) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new exporter instance
    const new_user = new ClearingAgentModel({
      agentCompanyName,
      agentEmailAddress,
      agentContactPersonName,
      agentContactPersonNo,
      agentAddress,
    });

    // Save the new exporter to the database
    await new_user.save();

    // Send a success response
    res
      .status(201)
      .send({
        message: "Clearing Agent Details Created Successfully",
        new_user,
      });
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

// Get a Clearing Agent Details
const getClearingAgentDetails = async (req, res) => {
  try {
    const user = await ClearingAgentModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Clearing Agent Details By Id
const getSingleClearingAgentDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await ClearingAgentModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Clearing Agent Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Clearing Agent Details
const editClearingAgentDetails = async (req, res) => {
  try {
    const users = await ClearingAgentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Clearing Agent Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Clearing Agent Details
const deleteClearingAgentDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await ClearingAgentModel.deleteOne({ _id: id });
    res.send({ message: "Clearing Agent Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postClearingAgentDetails,
  getClearingAgentDetails,
  getSingleClearingAgentDetails,
  deleteClearingAgentDetails,
  editClearingAgentDetails,
};
