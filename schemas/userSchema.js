const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const userSchema = new Schema(
    {
        username: reqString,
        fname: reqString,
        lname: reqString,
        password: reqString,
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        },
        score: {
            type: Number,
            required: true,
            default: 0
        },
        coins: {
            type: Number,
            required: true,
            default: 0
        },
        admin: {
            type: Boolean,
            required: true,
            default: false
        },
        items: {
            type: Array,
            required: false,
            default: []
        },
        participant: {
            type: Boolean, 
            required: true,
            default : false
        }
    }
);

module.exports = mongoose.model("user", userSchema);