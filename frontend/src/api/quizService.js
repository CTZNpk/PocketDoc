export const generateQuiz = async (documentId, params) => {
    try {
      const response = await apiClient.post(
        '/quizzes/generate',
        {
          document_id: documentId,
          file_path: params.filePath,
          start_page: params.startPage,
          end_page: params.endPage,
          answer_formats: params.answerFormats, // e.g. ['multiple_choice', 'true_false']
          question_type: params.questionType || 'mixed'
        },
        { protected: true }
      );
      return response.data;
    } catch (error) {
      console.error('Quiz generation failed:', error.response?.data || error.message);
      throw error;
    }
  };