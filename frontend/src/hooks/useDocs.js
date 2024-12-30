import { getUserDocs } from "../api/documentService";
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

  // const uploadDoc = async () => {
  //   try {
  //     const data = await getUserDocs();
  //     setDocs({ username: data.username });
  //     emitToast("Sign in Successful");
  //   } catch (error) {
  //     emitToast(`Error Signing In: ${error.response.data.error}`);
  //   }
  // };


  return { getMyDocs };
};

export default useDocs

