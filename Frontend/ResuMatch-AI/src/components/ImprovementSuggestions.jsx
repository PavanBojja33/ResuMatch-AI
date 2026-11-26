import { useState } from 'react';
import { Sparkles, Copy, Check, ShieldCheck } from 'lucide-react';

export default function ImprovementSuggestions({ suggestions }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
    return null;
  }

  const handleCopy = async (text, index) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Resume Improvement Suggestions</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Refined action-driven bullet points aligning your demonstrated work with job requirements
          </p>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
          {suggestions.length} {suggestions.length === 1 ? 'Suggestion' : 'Suggestions'}
        </span>
      </div>

      {/* Fact-preservation disclaimer */}
      <div className="mb-6 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong>Factual Integrity Guarantee:</strong> Rewrites optimize articulation, active verbs, and clarity using only facts from your original resume. They do not invent unearned achievements or numbers.
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-6">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs hover:border-slate-300 transition-all"
          >
            {/* Side-by-side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {/* Original Bullet */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Original Bullet
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{item.original_bullet || 'No original text specified.'}"
                  </p>
                </div>
              </div>

              {/* Suggested Bullet */}
              <div className="bg-blue-50/40 border border-blue-200 rounded-lg p-4 flex flex-col justify-between relative">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      Suggested Enhancement
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.suggested_bullet, index)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white text-slate-700 hover:text-blue-600 rounded-md border border-slate-200 hover:border-blue-300 shadow-2xs transition-all cursor-pointer"
                      title="Copy improved bullet to clipboard"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm font-medium text-slate-900 leading-relaxed">
                    {item.suggested_bullet}
                  </p>
                </div>

                {/* Reason */}
                {item.reason && (
                  <div className="mt-3 pt-3 border-t border-blue-100 text-xs text-slate-600">
                    <strong className="text-slate-800 font-semibold">Why this works: </strong>
                    <span>{item.reason}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
