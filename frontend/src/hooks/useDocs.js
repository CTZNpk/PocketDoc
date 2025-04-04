import {
  generateEmbeddings,
  getDocMetaFromId,
  getUserDocFromId,
  getUserDocs,
  uploadUserDoc,
} from "../api/documentService";
import docsStore from "../store/docsStore";
import { emitToast } from "../utils/emitToast";

const useDocs = () => {
  const { setDocs, addDoc, isLatest } = docsStore();
  const getMyDocs = async () => {
    if (isLatest) return;
    try {
      const data = await getUserDocs();
      const docs = data.docs.map((datum) => ({
        id: datum._id,
        title: datum.title,
      }));
      setDocs(docs);
      emitToast("Documents Retrieved Successfully");
    } catch (error) {
      emitToast(`Error Getting Documents: ${error}`);
    }
  };

  const uploadDoc = async (file, title) => {
    try {
      const data = await uploadUserDoc(file, title);
      addDoc({ id: data._id, title: data.title });
      emitToast("Document Uploaded Successfully");
    } catch (error) {
      emitToast(`Error Uploading Document: ${error.response.error}`);
    }
  };

  const getDocumentFromId = async (docId) => {
    try {
      const blob = await getUserDocFromId(docId);
      return blob;
    } catch (err) {
      emitToast(`Error Getting Document Toc : ${err}`);
    }
  };

  const getDocumentMetaData = async (docId) => {
    try {
      const document = await getDocMetaFromId(docId);
      return document;
    } catch (err) {
      emitToast(`Error Getting Document Toc : ${err}`);
    }
  };

  const generateDocumentEmbeddings = async (docId) => {
    try {
      const document = await generateEmbeddings(docId);
      return document;
    } catch (err) {
      emitToast(`Error Getting Document Toc : ${err}`);
    }
  };

  return {
    getMyDocs,
    uploadDoc,
    getDocumentFromId,
    getDocumentMetaData,
    generateDocumentEmbeddings,
  };
};

export default useDocs;
