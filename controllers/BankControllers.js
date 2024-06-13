const BankModel = require("../models/BankModel");

// Post a Bank Details
const postBankDetails = async (req, res) => {
  try {
    const { bankName, bankAddress, bankAccountNo } = req.body;

    // Validate the request body
    if (!bankName || !bankAddress || !bankAccountNo) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new importer instance
    const new_user = new BankModel({
      bankName,
      bankAddress,
      bankAccountNo,
    });

    // Save the new importer to the database
    await new_user.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Bank Details Created Successfully", new_user });
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

// Get a Bank Details
const getBankDetails = async (req, res) => {
  try {
    const user = await BankModel.find();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Bank Details By Id
const getSingleBankDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await BankModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single IBank Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Bank Details
const editBankDetails = async (req, res) => {
  try {
    const users = await BankModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Bank Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Importer Details
const deleteBankDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await BankModel.deleteOne({ _id: id });
    res.send({ message: "Bank Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postBankDetails,
  getBankDetails,
  getSingleBankDetails,
  deleteBankDetails,
  editBankDetails,
};
