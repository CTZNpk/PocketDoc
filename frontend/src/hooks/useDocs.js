import { getUserDocFromId, getUserDocs, getUserDocToc, uploadUserDoc } from "../api/documentService";
import docsStore from "../store/docsStore";
import { emitToast } from "../utils/emitToast";

const useDocs = () => {

  const { setDocs, addDoc, isLatest } = docsStore()
  const getMyDocs = async () => {
    if (isLatest) return;
    try {
      const data = await getUserDocs();
      const docs = data.docs.map((datum) =>
      ({
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
      addDoc({ id: data._id, title: data.title })
      emitToast("Document Uploaded Successfully");
    } catch (error) {
      emitToast(`Error Uploading Document: ${error.response.error}`);
    }
  };

  const getDocumentToc = async (docId) => {
    try {
      const data = await getUserDocToc(docId);
      emitToast("Document Toc Retrieved Successfully");
      const lvl1Chapters = data.chapters.filter((doc) => doc.level === 1)
        .map((doc) => ({
          id: doc.chapterId,
          title: doc.title,
          startPage: doc.startPageNum,
          endPage: doc.endPageNum,
          subChapters: []
        }));

      const lvl2Chapters = data.chapters.filter((doc) => doc.level === 2)
        .map((doc) => ({
          id: doc.chapterId,
          title: doc.title,
          startPage: doc.startPageNum,
          endPage: doc.endPageNum,
        }));

      const toc = lvl1Chapters.map((lvl1) => ({
        ...lvl1,
        subChapters: lvl2Chapters.filter(
          (lvl2) => lvl2.startPage >= lvl1.startPage && lvl2.startPage <= lvl1.endPage
        ),
      }));
      return toc
    } catch (error) {
      emitToast(`Error Getting Document Toc : ${error}`);
    }
  }

  const getDocumentFromId = async (docId) => {
    try {
      const blob = getUserDocFromId(docId);
      return blob
    } catch (err) {
      emitToast(`Error Getting Document Toc : ${err}`);
    }
  }



  return { getMyDocs, uploadDoc, getDocumentToc, getDocumentFromId };
};

export default useDocs

