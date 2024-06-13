const FinanceGenerationModel = require("../models/FinanceGenerationModel");

// Post a Finance Generation Details
const postFinanceGenerationDetails = async (req, res) => {
  try {
    const {
      financerOrganizationName,
      transactionRefNo,
      salesContractNumber,
      exporterName,
      exporterInvoiceValue,
      invoiceDate,
      financeCurrency,
      financerCurrency,
      creditTakenDate,
      creditDueDate,
      creditPeriod
    } = req.body;

    // Validate the request body
    if (
      !financerOrganizationName ||
      !transactionRefNo ||
      !salesContractNumber ||
      !exporterName ||
      !exporterInvoiceValue ||
      !invoiceDate ||
      !financeCurrency
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new FinanceGeneration instance
    const new_user = new FinanceGenerationModel({
        financerOrganizationName,
        transactionRefNo,
        salesContractNumber,
        exporterName,
        exporterInvoiceValue,
        invoiceDate,
        financeCurrency,
        financerCurrency,
        creditTakenDate,
        creditDueDate,
        creditPeriod
    });

    // Save the new FinanceGeneration to the database
    await new_user.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Finance Details Created Successfully", new_user });
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

// Get a Finance Generation Details
const getFinanceGenerationDetails = async (req, res) => {
  try {
    const user = await FinanceGenerationModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Finance Generation Details By Id
const getSingleFinanceGenerationDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await FinanceGenerationModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Finance Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Finance Generation Details
const editFinanceGenerationDetails = async (req, res) => {
  try {
    const users = await FinanceGenerationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Finance Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Finance Generation Details
const deleteFinanceGenerationDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await FinanceGenerationModel.deleteOne({ _id: id });
    res.send({ message: "Finance Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postFinanceGenerationDetails,
  getFinanceGenerationDetails,
  getSingleFinanceGenerationDetails,
  deleteFinanceGenerationDetails,
  editFinanceGenerationDetails,
};
