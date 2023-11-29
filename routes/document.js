import { Router } from "express";

import { CreateDocument, DeleteDocuments, getDocuments } from '../controller/document.js';
import { getDocumentData, getSharedDocumentByUser, getSharedDocuments, giveAccess } from "../controller/shared.js";

import JWT from '../middlewares/jwt.js';

const router = Router();

router.post('/document', JWT, CreateDocument);
router.get('/document', JWT, getDocuments);
router.delete('/document/:documentId', JWT, DeleteDocuments);

router.post('/document/:documentId/shared', JWT, giveAccess);
router.get('/document/:documentId/shared', JWT, getSharedDocuments);
router.get('/documents/shared', JWT, getSharedDocumentByUser);
router.get('/document/:documentId', JWT, getDocumentData);

export default router;