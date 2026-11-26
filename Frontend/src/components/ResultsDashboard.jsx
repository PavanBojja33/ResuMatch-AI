import { 
  RotateCcw, 
  FileText, 
  CheckCircle, 
  TrendingUp 
} from 'lucide-react';
import ScoreGauge from './ScoreGauge';
import SkillAnalysis from './SkillAnalysis';
import EvidenceSection from './EvidenceSection';
import ImprovementSuggestions from './ImprovementSuggestions';
import Recommendations from './Recommendations';

export default function ResultsDashboard({ result, onReset }) {
  if (!result) return null;

  const { filename, skill_analysis, retrieval_results, ai_analysis } = result;

  const score = ai_analysis?.overall_match_score;
  const summary = ai_analysis?.summary;
  const strengths = ai_analysis?.strengths || [];
  const suggestions = ai_analysis?.improvement_suggestions || [];
  const recommendations = ai_analysis?.recommendations || [];

  return (
    <div id="results-dashboard" className="mt-12 space-y-8 animate-in fade-in duration-500">
      {/* Top Banner / Actions Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Analysis Complete
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live AI Report
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Resume file: <span className="font-semibold text-slate-700">{filename || 'resume.pdf'}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start New Analysis</span>
        </button>
      </div>

      {/* 1. Overall Analysis Card (Score + Summary + Strengths) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 lg:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Overall Match Assessment</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Synthesis of skill alignment, keyword relevance, and candidate background
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Circular Score Gauge (if backend returned score) */}
          {score !== undefined && score !== null && (
            <div className="lg:col-span-4 flex justify-center">
              <ScoreGauge score={score} />
            </div>
          )}

          {/* AI-Generated Summary & Strengths */}
          <div className={`${score !== undefined && score !== null ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}>
            {/* Summary */}
            {summary && (
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Executive Assessment
                </span>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {summary}
                </p>
              </div>
            )}

            {/* Strengths List */}
            {strengths.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Candidate Strengths</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {strengths.map((str, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/40 border border-emerald-100 text-xs text-slate-800"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Skill Analysis (Matched vs Missing) */}
      <SkillAnalysis
        skillAnalysis={skill_analysis}
        aiAnalysis={ai_analysis}
      />

      {/* 3. Resume Evidence & Semantic Similarity */}
      {retrieval_results && retrieval_results.length > 0 && (
        <EvidenceSection retrievalResults={retrieval_results} />
      )}

      {/* 4. Resume Improvement Suggestions */}
      {suggestions.length > 0 && (
        <ImprovementSuggestions suggestions={suggestions} />
      )}

      {/* 5. Actionable Recommendations */}
      {recommendations.length > 0 && (
        <Recommendations recommendations={recommendations} />
      )}

      {/* Bottom Reset Banner */}
      <div className="text-center pt-8 pb-12 border-t border-slate-200/80">
        <p className="text-sm text-slate-500 mb-4">
          Ready to benchmark another role or an updated version of your resume?
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Analyze Another Resume</span>
        </button>
      </div>
    </div>
  );
}
