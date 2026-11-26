import { Trash2 } from 'lucide-react';

const SAMPLE_PLACEHOLDER = `Paste target job description here...

Example:
We are looking for a Full Stack Software Engineer to design, build, and deploy high-performance web applications.

Requirements:
- 3+ years experience with React, Node.js, and modern JavaScript
- Strong proficiency in Python, FastAPI, and RESTful APIs
- Experience with PostgreSQL, MongoDB, or SQL databases
- Hands-on experience with Docker, AWS cloud deployment, and Git version control
- Familiarity with AI integrations, LLM workflows, and vector embeddings is a plus`;

export default function JobDescriptionInput({ value, onChange, onClear, disabled }) {
  const charCount = value ? value.length : 0;
  const wordCount = value && value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between h-full transition-all">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Target Job Description
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Paste role requirements, responsibilities, or job posting
            </p>
          </div>

          {value && !disabled && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-slate-100 cursor-pointer"
              title="Clear job description"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder={SAMPLE_PLACEHOLDER}
            rows={9}
            className={`w-full text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 border border-slate-300 rounded-xl p-4 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y min-h-[220px] ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>
      </div>

      {/* Footer info: counts and advice */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span>
            <strong className="text-slate-700 font-semibold">{charCount.toLocaleString()}</strong> characters
          </span>
          <span className="text-slate-300">•</span>
          <span>
            <strong className="text-slate-700 font-semibold">{wordCount.toLocaleString()}</strong> words
          </span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          More detailed job descriptions produce more accurate skill gap analysis
        </span>
      </div>
    </div>
  );
}
