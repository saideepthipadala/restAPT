import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
    sharedUserid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sharedDocumentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true
    },
    sharedMobile: {
        type: String,
        required: true
    },
    documentName: {
        type: String,
        required: true
    },
    ownerMobile: {
        type: String,
        required: true
    },
});


const Share = mongoose.model("Share", shareSchema);

export default Share;