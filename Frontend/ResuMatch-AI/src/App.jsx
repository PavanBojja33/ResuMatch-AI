import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ResumeUploader from './components/ResumeUploader';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultsDashboard from './components/ResultsDashboard';
import { analyzeResume } from './services/api';
import { Sparkles, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const isFormValid = !!file && !!jdText.trim();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleFileRemove = () => {
    setFile(null);
    setError(null);
  };

  const handleJdChange = (text) => {
    setJdText(text);
    setError(null);
  };

  const handleJdClear = () => {
    setJdText('');
    setError(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!file) {
      setError('Please upload your resume in PDF format before submitting.');
      return;
    }

    if (!jdText.trim()) {
      setError('Please enter or paste the target job description.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeResume(file, jdText);
      setResult(data);

      // Smooth scroll to results after rendering
      setTimeout(() => {
        const resultsEl = document.getElementById('results-dashboard');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      // Keep file and jdText intact so the user does not have to re-enter them
      setError(err.message || 'An unexpected error occurred during resume analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJdText('');
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section */}
        <Hero />

        {/* Form Section */}
        <section id="analyzer-form" className="mt-4 scroll-mt-20">
          <form onSubmit={handleSubmit}>
            {/* Two-Column Form Layout on Desktop, Stacked on Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="h-full">
                <ResumeUploader
                  file={file}
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                  disabled={loading}
                />
              </div>

              <div className="h-full">
                <JobDescriptionInput
                  value={jdText}
                  onChange={handleJdChange}
                  onClear={handleJdClear}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error Notification Banner (Preserves inputs) */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-300">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-900">
                      Analysis Request Failed
                    </h4>
                    <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                      {error}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !isFormValid}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-red-800 bg-red-100 hover:bg-red-200 rounded-lg transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Analysis</span>
                </button>
              </div>
            )}

            {/* Submit Action Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-sm ${
                  loading
                    ? 'bg-blue-500 text-white cursor-wait opacity-90'
                    : isFormValid
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing your resume with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Analyze My Resume</span>
                  </>
                )}
              </button>

              {!isFormValid && (
                <p className="text-center text-xs text-slate-500 mt-2">
                  Please upload a PDF resume and provide a target job description to enable analysis.
                </p>
              )}
            </div>
          </form>
        </section>

        {/* Results Dashboard (Rendered on same page below form) */}
        {result && (
          <ResultsDashboard
            result={result}
            onReset={handleReset}
          />
        )}

        {/* How It Works Section */}
        <div className="mt-16">
          <HowItWorks />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">RasuMatch AI</span>
            <span>—</span>
            <span>AI-Powered Resume Analysis & Semantic Matcher</span>
          </div>
          <div>
            <span>Powered by PyMuPDF, Sentence Transformers & Gemini API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
