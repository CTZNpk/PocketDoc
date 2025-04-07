import summaryStore from "@/store/summaryStore";
import {
  downloadSummary,
  getExplanationFromText,
  getQuerySummary,
  getSummaryForUser,
  getSummaryFromId,
  getSummaryFromPages,
  getSummaryFromPassage,
} from "../api/summaryService";
import { emitToast } from "../utils/emitToast";

const useSummary = () => {
  const { isLatest, setSummary, setLatestFalse, summary } = summaryStore();
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
      setLatestFalse();
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

  const getAllUserSummaries = async () => {
    try {
      if (!isLatest) {
        const response = await getSummaryForUser();
        setSummary(response.data);
        return response.data;
      } else {
        return summary;
      }
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
    getAllUserSummaries,
    downloadSummaryFromId,
  };
};

export default useSummary;
