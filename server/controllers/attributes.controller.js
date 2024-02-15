import catchAsync from "../utils/catchAsync.utils.js";
import responseHelper from "../helpers/response.helper.js";
import Attribute from "../models/attribute.model.js";
import ENUMS from "../models/enums.js";


let attributeController = {};


attributeController.getAllAttributes = catchAsync(
    async (req, res, next) => {
        try {

            let attributes = await Attribute.find({ userId: req.user.id });

            return responseHelper.sendResponse(res, 200, "Fetch Attributes Success.", {
                attributes
            });

        } catch (err) {
            console.log(err);
            return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
        }
    }
);

attributeController.getAttributeDetails = catchAsync(
    async (req, res, next) => {
        try {

            let attributes = await Attribute.find({ userId: req.user.id, id: req.params.id });

            return responseHelper.sendResponse(res, 200, "Fetch Attribute Success.", {
                attributes
            });

        } catch (err) {
            console.log(err);
            return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
        }
    }
);

attributeController.createAttribute = catchAsync(
    async (req, res, next) => {
        try {

            if (req.body.type === "LIST" && (req.body.subType === null || req.body.subType === undefined || !ENUMS.AttributeTypesList.filter(x => x != "LIST").includes(req.body.subType))) {
                return responseHelper.sendResponse(res, 400, "Subtype cannot be empty or LIST if type is LIST or should be one of " + ENUMS.AttributeTypesList.filter(x => x != "LIST").toString(), null);
            }

            if (!ENUMS.AttributeTypesList.includes(req.body.type)) {
                return responseHelper.sendResponse(res, 400, "Type should be one of " + ENUMS.AttributeTypesList.toString(), null);
            }

            let attribute = await Attribute.create({ userId: req.user.id, ...req.body });

            return responseHelper.sendResponse(res, 200, "Attribute Created Successfully.", {
                attribute
            });

        } catch (err) {
            console.log(err);
            return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
        }
    }
);

attributeController.updateAttribute = catchAsync(
    async (req, res, next) => {
        try {

            let attribute = await Attribute.findOne({ id: req.params.id, userId: req.user.id });

            if (!attribute) {
                return responseHelper.sendResponse(res, 400, "Attribute with provided id not found ", null);
            }

            if (req.body.type === "LIST" && (req.body.subType === null || req.body.subType === undefined || !ENUMS.AttributeTypesList.filter(x => x != "LIST").includes(req.body.subType))) {
                return responseHelper.sendResponse(res, 400, "Subtype cannot be empty or LIST if type is LIST or should be one of " + ENUMS.AttributeTypesList.filter(x => x != "LIST").toString(), null);
            }

            if (!ENUMS.AttributeTypesList.includes(req.body.type)) {
                return responseHelper.sendResponse(res, 400, "Type should be one of " + ENUMS.AttributeTypesList.toString(), null);
            }

            let updated = await Attribute.updateOne({ userId: req.user.id, id: req.params.id }, { ...req.body });

            return responseHelper.sendResponse(res, 200, "Attribute Updated Successfully.", {});

        } catch (err) {
            console.log(err);
            return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
        }
    }
);

attributeController.deleteAttribute = catchAsync(
    async (req, res, next) => {
        try {

            let attribute = await Attribute.findOne({ id: req.params.id, userId: req.user.id });

            if (!attribute) {
                return responseHelper.sendResponse(res, 400, "Attribute with provided id not found ", null);
            }

            //check if being used
            let deleted = await Attribute.remove({ userId: req.user.id, id: req.params.id });

            return responseHelper.sendResponse(res, 200, "Attribute Deleted Successfully.", {});

        } catch (err) {
            console.log(err);
            return responseHelper.sendResponse(res, 500, "Internal Server Error !", null);
        }
    }
);



export default attributeController;