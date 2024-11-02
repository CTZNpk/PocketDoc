const express=require("express")
const auth=require('../middlewares/auth');
const upload = require("../middlewares/multer");
const { uploadDocumentController, getAllDocuments, summarizeEntireDocController } = require("../controllers/documentController");
const documentRouter=express.Router();
documentRouter.post('/upload',auth,upload.single("file"),uploadDocumentController)
documentRouter.get('/',auth,getAllDocuments)

module.exports=documentRouter