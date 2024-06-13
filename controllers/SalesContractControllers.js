const SalesContractModel = require("../models/SalesContractModel");

// Post a Sales Contract Details
const postSalesContractDetails = async (req, res) => {
  try {
    const {
        salesContractNumber,
        salesContractDate,
        exporterName,
        salesContractContactPersonName,
        importingFirmName,
        typeOfDuty,
        typeOfImport,
        paymentMode,
        itemName,
        itemUnit,
        fixedQuantity,
        priceTerms,
        salesContractRemarks,
        floatingPriceRows,
        advancePaymentDetails
    } = req.body;

    // Validate the request body
    if (
      !salesContractNumber ||
      !salesContractDate 
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if a sales contract with the same number already exists
    const existingContract = await SalesContractModel.findOne({ salesContractNumber });

    if (existingContract) {
      return res.status(400).send({ message: "Sales contract with this number already exists" });
    }

    // Create a new sales contract instance
    const newSalesContract = new SalesContractModel({
        salesContractNumber,
        salesContractDate,
        exporterName,
        salesContractContactPersonName,
        importingFirmName,
        typeOfDuty,
        typeOfImport,
        paymentMode,
        itemName,
        itemUnit,
        fixedQuantity,
        priceTerms,
        salesContractRemarks,
        floatingPriceRows,
        advancePaymentDetails
    });

    // Save the new sales contract to the database
    await newSalesContract.save();

    // Send a success response
    res.status(201).send({ message: "Sales Contract Details Created Successfully", newSalesContract });
  } catch (error) {
    console.error(error);

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Validation Error", Details: error.message });
    }

    // Handle any other errors
    res.status(500).send({ message: "An unexpected error occurred", Error: error.message });
  }
};


// Get a Sales Contract Details
const getSalesContractDetails = async (req, res) => {
  try {
    const user = await SalesContractModel.find();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Sales Contract Details By Id
const getSingleSalesContractDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await SalesContractModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Sales Contract Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Sales Contract Details
const editSalesContractDetails = async (req, res) => {
  try {
    const users = await SalesContractModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Sales Contract Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Sales Contract Details
const deleteSalesContractDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await SalesContractModel.deleteOne({ _id: id });
    res.send({ message: "Sales Contract Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postSalesContractDetails,
  getSalesContractDetails,
  getSingleSalesContractDetails,
  deleteSalesContractDetails,
  editSalesContractDetails,
};
