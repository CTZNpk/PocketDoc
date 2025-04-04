const express = require("express");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const {
  uploadDocumentController,
  getDocumentsByUserId,
  getDocument,
  getDocumentMetadata,
  generateEmbeddings,
} = require("../controllers/documentController");
const documentRouter = express.Router();
documentRouter.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadDocumentController,
);
documentRouter.get("/", auth, getDocumentsByUserId);
documentRouter.get("/:documentId", auth, getDocument);
documentRouter.get("/:documentId/meta", auth, getDocumentMetadata);
documentRouter.get("/:documentId/embed", auth, generateEmbeddings);

module.exports = documentRouter;
