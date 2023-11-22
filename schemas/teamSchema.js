const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const teamSchema = new Schema(
    {
        teamName: reqString,
        teamAdmin: reqString,
        participant1: reqString,
        participant2: nonReqString,
        participant3: nonReqString,
        participant4: nonReqString,
        teamPfp: reqString
    }
);


module.exports = mongoose.model("teams", teamSchema);