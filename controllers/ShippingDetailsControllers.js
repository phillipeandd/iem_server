const ShippingDetailsModel = require("../models/ShippingDetailsModel");

// Post a Shipping Details
const postShippingDetails = async (req, res) => {
  try {
    const {
      salesContractNumber,
      shipmentWiseData,
      rows,
      documentsStatusData,
      paymentStatusRows,
      paymentStatusData,
      customerClearingStatusData,
      rowsCCS,
      rowsWeightLevel1,
      rowsWeightLevel2,
      rowsWeightLevel3,
      totalsWeightLevel1,
      totalsWeightLevel2,
      totalsWeightLevel3,
    } = req.body;

    // Validate the request body
    //   if (!shipmentWiseData || !rows || !paymentStatusRows || !paymentStatusData || !customerClearingStatusData || !summary) {
    //     return res.status(400).send({ message: "All fields are required" });
    //   }

    if (!salesContractNumber) {
      return res.status(400).send({ message: "Sales Contract ID is required" });
    }

    // Create a new shipping details instance
    const newShippingDetails = new ShippingDetailsModel({
      salesContractNumber,
      shipmentWiseData,
      rows,
      documentsStatusData,
      paymentStatusRows,
      paymentStatusData,
      customerClearingStatusData,
      rowsCCS,
      rowsWeightLevel1,
      rowsWeightLevel2,
      rowsWeightLevel3,
      totalsWeightLevel1,
      totalsWeightLevel2,
      totalsWeightLevel3,
    });

    // Save the new shipping details to the database
    await newShippingDetails.save();

    // Send a success response
    res
      .status(201)
      .send({
        message: "Shipping Details Created Successfully",
        newShippingDetails,
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

// Get a Shipping Details
const getShippingDetails = async (req, res) => {
  try {
    const user = await ShippingDetailsModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Shipping Details By Id
const getSingleShippingDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await ShippingDetailsModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Shipping Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Shipping Details
const editShippingDetails = async (req, res) => {
  try {
    const users = await ShippingDetailsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Shipping Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Shipping Details
const deleteShippingDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await ShippingDetailsModel.deleteOne({ _id: id });
    res.send({ message: "Shipping Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postShippingDetails,
  getShippingDetails,
  getSingleShippingDetails,
  deleteShippingDetails,
  editShippingDetails,
};
