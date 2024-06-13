const ExporterModel = require("../models/ExporterModel");

// Post a Exporter Details
const postExporterDetails = async (req, res) => {
  try {
    const {
      exporterName,
      exporterAddress,
      exporterEmailAddress,
      exporterContactPersonNo,
      exportertelephoneNo,
      exportercountry
    } = req.body;

    // Validate the request body
    if (!exporterName || !exporterEmailAddress || !exporterAddress || !exporterContactPersonNo || !exportertelephoneNo ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new exporter instance
    const new_user = new ExporterModel({
      exporterName,
      exporterAddress,
      exporterEmailAddress,
      exporterContactPersonNo,
      exportertelephoneNo,
      exportercountry,
    });

    // Save the new exporter to the database
    await new_user.save();

    // Send a success response
    res.status(201).send({ message: "Exporter Details Created Successfully", new_user });
  } catch (error) {
    console.error(error);

    // Check if the error is a Mongoose validation error
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: "Validation Error", Details: error.message });
    }

    // Handle any other errors
    res.status(500).send({ message: "An unexpected error occurred", Error: error.message });
  }
};

// Get a Exporter Details
const getExporterDetails = async (req, res) => {
  try {
    const user = await ExporterModel.find().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Exporter Details By Id
const getSingleExporterDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await ExporterModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Exporters Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Exporter Details
const editExporterDetails = async (req, res) => {
  try {
    const users = await ExporterModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Exporters Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Exporter Details
const deleteExporterDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await ExporterModel.deleteOne({ _id: id });
    res.send({ message: "Exporter Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postExporterDetails,
  getExporterDetails,
  getSingleExporterDetails,
  deleteExporterDetails,
  editExporterDetails,
};
