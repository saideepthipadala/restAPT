import Document from "../models/document.js";
import Share from "../models/share.js";
import User from "../models/user.js";

export const giveAccess = async (req, res) => {
    const { mobilenos } = req.body;
    const { documentId } = req.params;
    const document = await Document.findById(documentId, {
        name: 1,
        owner: 1,
    });
    const documentname = document.name;
    const owner = document.owner;
    const ownerdetails = await User.findById(owner, { mobile: 1, _id: 0 });
    const documentownermobile = ownerdetails.mobile;

    for (let i = 0; i < mobilenos.length; i++) {
        if (mobilenos[i].length !== 10) {
            return res.status(400).send("Invalid Mobile Number");
        }
        const user = await User.findOne({ mobile: mobilenos[i] });
        if (!user) {
            return res.status(400).send("Invalid Mobile Number");
        }
        const isShared = await Share.findOne({ sharedUserid: user._id, sharedDocumentid: documentId });
        if (isShared) {
            await Share.findByIdAndDelete(isShared._id);
        }
        else {
            const share = new Share({
                sharedUserid: user._id,
                sharedDocumentid: documentId,
                sharedMobile: mobilenos[i],
                documentName: documentname,
                ownerMobile: documentownermobile,
            });
            await share.save();
        }
    }
    return res.status(200).send("Access Given or taken");
};


export const getSharedDocuments = async (req, res) => {
    const { documentId } = req.params;
    const shared = await Share.find({ sharedDocumentid: documentId }, { sharedMobile: 1, _id: 0 });
    return res.status(200).send(shared);
};


export const getSharedDocumentByUser = async (req, res) => {
    const user = req.user;
    const access = await Share.find({ sharedUserid: user.id }, {
        documentName: 1, ownerMobile: 1,
        sharedDocumentid: 1,
        _id: 0
    });
    return res.status(200).send(access);
};



export const getDocumentData = async (req, res) => {
    const { documentId } = req.params;
    const user = req.user;
    const document = await Document.findById(documentId);
    if (document.owner.toString() === user.id.toString()) {
        return res.status(200).json(document.document);
    }
    const shared = await Share.findOne({ sharedUserid: user.id, sharedDocumentid: documentId });
    if (!shared) {
        return res.status(400).send("Access Denied");
    }
    return res.status(200).json(document.document);
};