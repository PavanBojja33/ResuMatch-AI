import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes timeout for LLM and embedding processing
});

/**
 * Analyzes resume PDF against target job description.
 * Sends multipart/form-data with exact field names expected by FastAPI:
 * - 'file': UploadFile (.pdf)
 * - 'jd_text': str Form parameter
 * 
 * Note: We let the browser/Axios determine the boundary by NOT setting Content-Type manually.
 */
export const analyzeResume = async (file, jdText) => {
  if (!file) {
    throw new Error('Please select a PDF resume file.');
  }

  if (!file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Only PDF files are allowed.');
  }

  if (!jdText || !jdText.trim()) {
    throw new Error('Please provide the target job description.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('jd_text', jdText.trim());

  try {
    const response = await api.post('/analyze', formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Backend returned HTTP status outside 2xx
      const detail = error.response.data?.detail;
      const status = error.response.status;

      if (typeof detail === 'string') {
        throw new Error(detail, { cause: error });
      } else if (Array.isArray(detail)) {
        // FastAPI validation error array
        const msg = detail.map((err) => `${err.loc?.join('.') || 'field'}: ${err.msg}`).join(', ');
        throw new Error(msg || `Request validation failed (${status}).`, { cause: error });
      } else {
        throw new Error(`Server returned an error (${status}). Please try again.`, { cause: error });
      }
    } else if (error.request) {
      // Network error / server not responding
      throw new Error(
        `Unable to reach the backend server at ${API_BASE_URL}. Please ensure the FastAPI server is running.`,
        { cause: error }
      );
    } else {
      throw new Error(error.message || 'An unexpected error occurred.', { cause: error });
    }
  }
};

export default api;
