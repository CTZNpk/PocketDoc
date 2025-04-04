import {
  getExplanationFromText,
  getSummaryFromPages,
  getSummaryFromPassage,
} from "../api/summaryService";
import { emitToast } from "../utils/emitToast";

const useSummary = () => {
  const generatePassageSummary = async (details) => {
    try {
      const response = await getSummaryFromPassage(details);
      return response.summary;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  const generatePassageExplanation = async (details) => {
    try {
      console.log("WE ARE HEHRHEHREH");
      const response = await getExplanationFromText(details);
      return response.explanation;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  const generateSummaryPages = async (details) => {
    try {
      const response = await getSummaryFromPages(details);
      console.log(response.data.summary);
      return response.data.summary;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  return {
    generatePassageSummary,
    generateSummaryPages,
    generatePassageExplanation,
  };
};

export default useSummary;
