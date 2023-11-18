const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const hackSubSchema = new Schema(
    {
        teamName: reqString,
        submissionLink: reqString,
        gdLink: reqString,
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        },
        images: {
            type: Array,
            required: false
        },
        prize: {
            type: String,
            required: false,
            default: "no rank"
        },
        rank: {
            type: String,
            required: false,
            default: "no rank"
        }
    }
);


module.exports = mongoose.model("hacks", hackSubSchema);
