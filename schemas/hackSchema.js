const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const hackSchema = new Schema(
    {
        hackname: reqString,
        participants: {
            type: Array,
            required: true,
            default: []
        }
    }
);

module.exports = mongoose.model("hack", hackSchema);