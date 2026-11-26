import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, FileText, Info } from 'lucide-react';

export default function EvidenceSection({ retrievalResults }) {
  const [openItems, setOpenItems] = useState({});

  if (!retrievalResults || !Array.isArray(retrievalResults) || retrievalResults.length === 0) {
    return null;
  }

  const toggleItem = (idx) => {
    setOpenItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const expandAll = () => {
    const allOpen = {};
    retrievalResults.forEach((_, idx) => {
      allOpen[idx] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            <span>Resume Evidence & Semantic Relevance</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Relevant resume excerpts retrieved for each job requirement using cosine similarity
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={expandAll}
            className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Semantic disclaimer banner */}
      <div className="mb-4 bg-blue-50/60 border border-blue-200/80 rounded-lg p-3 text-xs text-blue-800 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong>Note on Semantic Similarity:</strong> Embeddings indicate how closely resume sections semantically correlate with the job requirement. High similarity reflects relevant context, not necessarily verified mastery.
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {retrievalResults.map((item, idx) => {
          const isOpen = !!openItems[idx];
          const matches = item.matches || [];

          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50/30"
            >
              {/* Requirement Header */}
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full text-left px-4 py-3.5 flex items-center justify-between hover:bg-slate-100/60 transition-colors cursor-pointer gap-3"
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                    #{idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">
                    {item.jd_requirement}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                  </span>
                  <div className="p-1 rounded-md text-slate-400 hover:text-slate-700">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Collapsible Body */}
              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-200/70 bg-white space-y-3">
                  {matches.length > 0 ? (
                    matches.map((match, matchIdx) => {
                      const similarityVal = typeof match.similarity === 'number' ? match.similarity : null;
                      const formattedScore = similarityVal !== null ? (similarityVal * 100).toFixed(1) : null;

                      return (
                        <div
                          key={matchIdx}
                          className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                              <FileText className="w-3 h-3 text-slate-400" />
                              <span>Section: {match.resume_section || 'General'}</span>
                            </span>

                            {formattedScore !== null && (
                              <span
                                className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                                  similarityVal >= 0.7
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : similarityVal >= 0.5
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}
                              >
                                {formattedScore}% match
                              </span>
                            )}
                          </div>

                          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed font-sans bg-white p-2.5 rounded border border-slate-100">
                            {match.resume_text}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 italic py-2">
                      No matching resume chunks extracted for this requirement.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
