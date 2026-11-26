import { Lightbulb } from 'lucide-react';

export default function Recommendations({ recommendations }) {
  if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Actionable Next Steps</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key steps to improve your resume's competitive standing for this specific role
          </p>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
              {idx + 1}
            </div>
            <div className="text-sm text-slate-700 leading-relaxed">
              {rec}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
