import {
  getSummaryFromPages,
  getSummaryFromPassage,
} from "../api/summaryService";
import { emitToast } from "../utils/emitToast";

const useSummary = () => {
  const generatePassageSummary = async (passage) => {
    try {
      const response = await getSummaryFromPassage(passage);
      return response.summary;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  const generateSummaryPages = async (documentId, start_page, end_page) => {
    try {
      const response = await getSummaryFromPages(
        documentId,
        start_page,
        end_page,
      );
      console.log(response.data.summary);
      return response.data.summary;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  return {
    generatePassageSummary,
    generateSummaryPages,
  };
};

export default useSummary;
