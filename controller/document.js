import Document from '../models/document.js';
import Share from '../models/share.js';

export const CreateDocument = async (req, res) => {
    const { name, document } = req.body;
    const nameregex = /^[a-zA-Z ]{1,50}$/;
    if (!nameregex.test(name)) {
        return res.status(400).json({ message: "Name should be maximum 50 characters and can only contain alphabets and spaces" });
    }
    const owner = req.user.id;
    const newDocument = new Document({ name, document, owner });
    try {
        const doc = await newDocument.save();
        res.status(201).json({ _id: doc._id });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const getDocuments = async (req, res) => {
    const documents = await Document.find({ owner: req.user.id }, { name: 1, _id: 1 });
    res.status(200).json(documents);
};


export const DeleteDocuments = async (req, res) => {
    const { documentId } = req.params;
    const owner = req.user.id;
    try {
        const deleted = await Document.deleteOne({ _id: documentId, owner: owner });
        const shared = await Share.deleteMany({ documentId: documentId });
        res.status(200).json({ message: "Document deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};