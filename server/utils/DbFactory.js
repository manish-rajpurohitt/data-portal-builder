import ApiError from "./apiError.utils";
import httpStatus from "http-status";

// CREATE
const create = async (model, data) => {
  try {
    const createdRecord = await model.create(data);
    return createdRecord;
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      // Duplicate key error
      const duplicatedKey = Object.keys(error.keyPattern)[0];
      const errorMessage = `The ${duplicatedKey} must be unique.`;
      console.error(errorMessage);
      // Return or handle the error message as needed
      throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
    } else {
      // Handle other types of errors
      console.error(error);
      // Return or handle the error as needed
      throw new ApiError(httpStatus.BAD_REQUEST, error.toString());
    }
  }
};

// UPDATE
const update = async (record, data, options = {}) => {
  const updatedRecord = await record.updateOne(data, options);
  return updatedRecord;
};

// DELETE
const deleteRecord = async (record, options = {}) => {
  await record.deleteOne(options);
  return `${record.constructor.modelName} record deleted successfully`;
};

// GET
const get = async (model, options) => {
  const record = await model.findOne(options);
  return record;
};

// GET ALL
const getAll = async (model, options = {}) => {
  const records = await model.find(options);
  return records;
};

export default {
  create,
  update,
  deleteRecord,
  get,
  getAll,
};
