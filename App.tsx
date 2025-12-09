import React, { useState } from 'react';
import { AppState, Language } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import { analyzeQuizImage } from './services/geminiService';
import { generateWorksheetPDF } from './services/pdfService';
import { Loader2, Download, AlertCircle, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    image: null,
    isLoading: false,
    result: null,
    language: Language.TAGLISH,
    error: null,
  });

  const handleImageSelect = (base64: string) => {
    setState(prev => ({ ...prev, image: base64, result: null, error: null }));
  };

  const handleClear = () => {
    setState(prev => ({ ...prev, image: null, result: null, error: null }));
  };

  const handleLanguageChange = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const handleAnalyze = async () => {
    if (!state.image) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await analyzeQuizImage(state.image, state.language);
      setState(prev => ({ ...prev, isLoading: false, result }));
    } catch (err) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Failed to analyze the image. Please try again or use a clearer photo." 
      }));
    }
  };

  const handleDownload = () => {
    if (state.result) {
      try {
        generateWorksheetPDF(state.result, state.language);
      } catch (err) {
        console.error("Download error:", err);
        setState(prev => ({
          ...prev,
          error: "Failed to download PDF. Try refreshing the page."
        }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 pb-20">
      <Header 
        selectedLanguage={state.language} 
        onLanguageChange={handleLanguageChange} 
        disabled={state.isLoading}
      />

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        
        {/* Step 1: Upload */}
        <section>
           <div className="flex justify-between items-center mb-2 px-1">
             <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Step 1: Upload Quiz</h2>
           </div>
           <ImageUploader 
            image={state.image} 
            onImageSelect={handleImageSelect} 
            onClear={handleClear}
            isLoading={state.isLoading}
          />
        </section>

        {/* Action Button: Analyze */}
        {state.image && !state.result && (
          <div className="flex justify-center animate-fade-in-up">
            <button
              onClick={handleAnalyze}
              disabled={state.isLoading}
              className={`
                w-full md:w-auto px-8 py-3 rounded-full font-bold text-white shadow-lg flex items-center justify-center transition-all transform hover:scale-105 active:scale-95
                ${state.isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-deped-blue hover:bg-deped-dark'}
              `}
            >
              {state.isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Analyzing with Gemini...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2" size={20} />
                  Generate Worksheet
                </>
              )}
            </button>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center animate-shake">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            <p className="text-sm">{state.error}</p>
          </div>
        )}

        {/* Step 2: Result & Output */}
        {state.result && (
          <section className="animate-fade-in">
             <div className="flex justify-between items-center mb-2 px-1">
               <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Step 2: Review & Download</h2>
             </div>
             
             <AnalysisResult data={state.result} />

             {/* Sticky Download Button for Mobile */}
             <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-40">
               <button
                 onClick={handleDownload}
                 className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-full shadow-xl flex items-center justify-center transition-colors border-2 border-white/20"
               >
                 <Download className="mr-2" size={24} />
                 Download Worksheet (PDF)
               </button>
             </div>
             
             {/* Spacer for sticky button */}
             <div className="h-16"></div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;