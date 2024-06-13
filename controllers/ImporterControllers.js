const ImporterModel = require("../models/ImporterModel");

// Post a Importer Details
const postImporterDetails = async (req, res) => {
  try {
    const {
      importerName,
      importerAddress,
      importerEmailAddress,
      importerContactPersonNo,
      importertelephoneNo,
      
    } = req.body;

    // Validate the request body
    if (!importerName || !importerEmailAddress || !importerAddress || !importerContactPersonNo || !importertelephoneNo ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Create a new importer instance
    const new_user = new ImporterModel({
        importerName,
        importerAddress,
        importerEmailAddress,
        importerContactPersonNo,
        importertelephoneNo,
    });

    // Save the new importer to the database
    await new_user.save();

    // Send a success response
    res.status(201).send({ message: "Importer Details Created Successfully", new_user });
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

// Get a Importer Details
const getImporterDetails = async (req, res) => {
  try {
    const user = await ImporterModel.find();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single Importer Details By Id
const getSingleImporterDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await ImporterModel.findOne({ _id: id });
    res
      .status(404)
      .send({ message: "Single Importers Details By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Importer Details
const editImporterDetails = async (req, res) => {
  try {
    const users = await ImporterModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!users) {
      return res.status(404).send();
    }
    res.send({ message: "Importers Details Updated Successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Importer Details
const deleteImporterDetails = async (req, res) => {
  try {
    const id = req.params.id;
    await ImporterModel.deleteOne({ _id: id });
    res.send({ message: "Importer Details Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postImporterDetails,
  getImporterDetails,
  getSingleImporterDetails,
  deleteImporterDetails,
  editImporterDetails,
};
