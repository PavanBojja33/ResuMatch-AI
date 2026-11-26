import { CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function SkillAnalysis({ skillAnalysis, aiAnalysis }) {
  // Combine skills safely from both deterministic regex report and AI evaluation
  const regexMatched = skillAnalysis?.matched_skills || [];
  const aiMatched = aiAnalysis?.matched_skills || [];
  const matchedSkills = Array.from(new Set([...aiMatched, ...regexMatched]));

  const regexMissing = skillAnalysis?.missing_skills || [];
  const aiMissing = aiAnalysis?.missing_skills || [];
  const missingSkills = Array.from(
    new Set([...aiMissing, ...regexMissing])
  ).filter((s) => !matchedSkills.includes(s));

  const totalSkillsCount = matchedSkills.length + missingSkills.length;
  const matchRate = totalSkillsCount > 0 ? Math.round((matchedSkills.length / totalSkillsCount) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>Skill Match Analysis</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparison between requirements and detected competencies
          </p>
        </div>

        {totalSkillsCount > 0 && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span>Coverage:</span>
            <strong className="text-slate-900 font-bold">{matchRate}%</strong>
            <span className="text-slate-400">({matchedSkills.length}/{totalSkillsCount} skills)</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Matched Skills
                </h4>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {matchedSkills.length} Identified
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Skills explicitly demonstrated in your resume that match the job posting.
            </p>

            {matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white text-emerald-800 border border-emerald-300 shadow-2xs hover:bg-emerald-50 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-3">
                No matching skills identified based on the provided text.
              </p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Missing or Undetected Skills
                </h4>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {missingSkills.length} Gaps
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Requirements from the job posting not explicitly highlighted in your resume.
            </p>

            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white text-amber-900 border border-amber-300 shadow-2xs hover:bg-amber-50 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-emerald-700 bg-emerald-100/60 p-3 rounded-lg border border-emerald-200">
                🎉 Great match! All extracted primary skills were located in your resume.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
