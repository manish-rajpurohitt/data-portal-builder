import mongoose from "mongoose";
import ENUMS from "./enums.js";

let AttributeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ENUMS.AttributeTypesList,
        required: true,
    },
    subType: {
        type: String,
        enum: ENUMS.AttributeTypesList,
        required: function () {
            return this.type === 'LIST' || this.type === 'MAP';
        },
    },
    subValue: {
        type: String,
        enum: ENUMS.AttributeTypesList,
        required: function () {
            return this.type === 'MAP';
        },
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

let Attribute = mongoose.model("attributes", AttributeSchema);

export default Attribute;