import {
  downloadSummary,
  getExplanationFromText,
  getQuerySummary,
  getSummaryFromId,
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
      const response = await getExplanationFromText(details);
      return response.explanation;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  const generateSummaryPages = async (details) => {
    try {
      const response = await getSummaryFromPages(details);
      return response.data;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  const generateQuerySummary = async (details) => {
    try {
      const response = await getQuerySummary(details);
      return response.summary;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  const getSummaryId = async (summaryId) => {
    try {
      const response = await getSummaryFromId(summaryId);
      return response;
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };

  const downloadSummaryFromId = async (summaryId) => {
    try {
      downloadSummary(summaryId);
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`);
    }
  };
  return {
    generatePassageSummary,
    generateSummaryPages,
    generatePassageExplanation,
    getSummaryId,
    generateQuerySummary,
    downloadSummaryFromId,
  };
};

export default useSummary;
