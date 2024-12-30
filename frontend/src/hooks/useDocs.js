import { getUserDocs, uploadUserDoc } from "../api/documentService";
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
      emitToast(`Error Signing In: ${error.response.data.error}`);
    }
  };


  return { getMyDocs, uploadDoc };
};

export default useDocs

