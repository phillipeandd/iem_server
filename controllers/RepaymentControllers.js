const RepaymentModel = require("../models/RepaymentModel");

// Post a Re-Payment Details
const postrePaymentDetails = async (req, res) => {
  try {
    const {
      financerOrganizationName,
      transactionRefNo,
      netAmountPayable,
      additionalCharges,
      totalAmount,
      repaymentDate,
      repaymentCurrency,
      reExchangeRate,
      amountInINR,
      bankCharges,
    } = req.body;

    // Validate the request body
    if (!financerOrganizationName || !repaymentDate || !amountInINR) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new Re-Payment instance
    const new_user = new RepaymentModel({
      financerOrganizationName,
      transactionRefNo,
      netAmountPayable,
      additionalCharges,
      totalAmount,
      repaymentDate,
      repaymentCurrency,
      reExchangeRate,
      amountInINR,
      bankCharges,
    });

    // Save the new Re-Payment to the database
    await new_user.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Re-Payment Details Created Successfully", new_user });
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

// Get a Re-Payment Details
const getrePaymentDetails = async (req, res) => {
  try {
    const user = await RepaymentModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Re-Payment Details By Id
const getSinglerePaymentDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await RepaymentModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Re-Payment Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Re-Payment Details
const editrePaymentDetails = async (req, res) => {
  try {
    const users = await RepaymentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Re-Payment Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Re-Payment Details
const deleterePaymentDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await RepaymentModel.deleteOne({ _id: id });
    res.send({ message: "Re-Payment Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postrePaymentDetails,
  getrePaymentDetails,
  getSinglerePaymentDetails,
  deleterePaymentDetails,
  editrePaymentDetails,
};
