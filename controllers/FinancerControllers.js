const FinancerModel = require("../models/FinancerModel");

// Post a Financer Details
const postFinancerDetails = async (req, res) => {
  try {
    const {
      financerOrganizationName,
      financerAddress,
      financerContactPersonNo,
      financerBankAccountNo,
      financerSwiftCode,
      financerBankName,
      limitOfFinance,
      financerCurrency,
    } = req.body;

    // Validate the request body
    if (
      !financerOrganizationName ||
      !financerAddress ||
      !financerContactPersonNo ||
      !financerBankAccountNo ||
      !financerSwiftCode ||
      !financerBankName ||
      !limitOfFinance
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new exporter instance
    const new_user = new FinancerModel({
      financerOrganizationName,
      financerAddress,
      financerContactPersonNo,
      financerBankAccountNo,
      financerSwiftCode,
      financerBankName,
      limitOfFinance,
      financerCurrency,
    });

    // Save the new exporter to the database
    await new_user.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Financer Details Created Successfully", new_user });
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

// Get a Financer Details
const getFinancerDetails = async (req, res) => {
  try {
    const user = await FinancerModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Financer Details By Id
const getSingleFinancerDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await FinancerModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Financer Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Financer Details
const editFinancerDetails = async (req, res) => {
  try {
    const users = await FinancerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Financers Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Financer Details
const deleteFinancerDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await FinancerModel.deleteOne({ _id: id });
    res.send({ message: "Financer Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postFinancerDetails,
  getFinancerDetails,
  getSingleFinancerDetails,
  deleteFinancerDetails,
  editFinancerDetails,
};
