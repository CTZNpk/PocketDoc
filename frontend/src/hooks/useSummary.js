import { getSummaryFromPassage } from "../api/summaryService"
import { emitToast } from "../utils/emitToast"

const useSummary = () => {

  const generatePassageSummary = async (passage) => {
    try {
      console.log(passage)
      const response = await getSummaryFromPassage(passage)
      return response.summary
    } catch (e) {
      emitToast(`Error getting Summary: ${e}`)
    }
  }


  return { generatePassageSummary }
}

export default useSummary
