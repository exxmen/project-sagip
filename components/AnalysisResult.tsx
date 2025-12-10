import React from 'react';
import { Lightbulb, PenTool, CheckCircle2, Key, Sparkles } from 'lucide-react';
import { RemediationData } from '../types';

interface AnalysisResultProps {
  data: RemediationData;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* AI Disclaimer */}
      <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-lg p-3 flex items-start shadow-sm">
        <Sparkles size={16} className="mt-0.5 mr-2 flex-shrink-0 text-deped-light" />
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong className="text-deped-blue">AI-Generated Content:</strong> This worksheet was created by Gemini AI. Please review the concepts and problems for accuracy and curriculum alignment before printing.
        </p>
      </div>

      {/* Insight Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-amber-400">
        <div className="p-4 bg-amber-50 flex items-center border-b border-amber-100">
          <Lightbulb className="text-amber-600 mr-2" size={24} />
          <h2 className="text-lg font-bold text-gray-800">Teacher's Notes (Insight)</h2>
        </div>
        <div className="p-5">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {data.conceptReview}
          </p>
        </div>
      </div>

      {/* Practice Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-deped-blue">
        <div className="p-4 bg-blue-50 flex items-center border-b border-blue-100">
          <PenTool className="text-deped-blue mr-2" size={24} />
          <h2 className="text-lg font-bold text-gray-800">Remediation Exercises</h2>
        </div>
        <div className="p-5">
          <ul className="space-y-6">
            {data.practiceProblems.map((problem, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-deped-blue text-xs font-bold mr-3 mt-0.5">
                  {idx + 1}
                </span>
                {/* whitespace-pre-wrap ensures MCQ options appear on new lines */}
                <span className="text-gray-700 whitespace-pre-wrap leading-relaxed">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
          <div className="flex items-center justify-center text-xs text-green-600 font-medium">
             <CheckCircle2 size={14} className="mr-1"/> Localized Filipino Context Applied
          </div>
        </div>
      </div>

      {/* Answer Key Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-green-500">
        <div className="p-4 bg-green-50 flex items-center border-b border-green-100">
          <Key className="text-green-600 mr-2" size={24} />
          <h2 className="text-lg font-bold text-gray-800">Answer Key</h2>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {data.answerKey && data.answerKey.map((answer, idx) => (
              <li key={idx} className="flex items-start">
                <span className="font-semibold text-gray-600 mr-2">{idx + 1}.</span>
                <span className="text-gray-800">{answer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;