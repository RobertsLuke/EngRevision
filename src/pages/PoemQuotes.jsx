import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  poemsList, 
  londonQuotes, 
  bayonetChargeQuotes, 
  remainsQuotes, 
  kamikazeQuotes, 
  mldQuotes 
} from '../data/quotesData';

const PoemQuotes = () => {
  const { poemId } = useParams();
  const navigate = useNavigate();
  
  // State variables
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [poem, setPoemData] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [mode, setMode] = useState('quote'); // 'quote', 'devices', 'practice'
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState([]);
  
  // Get poem data
  useEffect(() => {
    const poemData = poemsList.find(p => p.id === poemId);
    
    if (!poemData) {
      navigate('/quotes');
      return;
    }
    
    setPoemData(poemData);
    document.title = `${poemData.title} Quotes - English GCSE Revision`;
    
    // Get quotes based on poem ID
    let poemQuotes = [];
    switch(poemId) {
      case 'london':
        poemQuotes = londonQuotes;
        break;
      case 'bayonet-charge':
        poemQuotes = bayonetChargeQuotes;
        break;
      case 'remains':
        poemQuotes = remainsQuotes;
        break;
      case 'kamikaze':
        poemQuotes = kamikazeQuotes;
        break;
      case 'mld':
        poemQuotes = mldQuotes;
        break;
      default:
        poemQuotes = [];
    }
    
    // If no quotes available, redirect
    if (poemQuotes.length === 0 && poemId !== 'london') {
      navigate('/quotes');
      return;
    }
    
    setQuotes(poemQuotes);
    
    // Reset state
    setQuoteIndex(0);
    setMode('quote');
    setSelectedOption(null);
    setIsAnswered(false);
    setQuestionIndex(0);
    setScore(0);
    setAttempted([]);
  }, [poemId, navigate]);
  
  // If loading or no data
  if (!poem || quotes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 text-center">
        {poemId !== 'london' ? (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">
              Quotes Coming Soon
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Quotes for this poem will be added soon. Please check back later.
            </p>
            <Link 
              to="/quotes"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Back to Poems
            </Link>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
  
  const currentQuote = quotes[quoteIndex];
  const currentQuestion = currentQuote.practice[questionIndex];
  
  // Handle next quote
  const handleNextQuote = () => {
    if (quoteIndex < quotes.length - 1) {
      setQuoteIndex(quoteIndex + 1);
    } else {
      setQuoteIndex(0); // Loop back to the first quote
    }
    setMode('quote');
    setSelectedOption(null);
    setIsAnswered(false);
    setQuestionIndex(0);
  };
  
  // Handle previous quote
  const handlePreviousQuote = () => {
    if (quoteIndex > 0) {
      setQuoteIndex(quoteIndex - 1);
    } else {
      setQuoteIndex(quotes.length - 1); // Loop to the last quote
    }
    setMode('quote');
    setSelectedOption(null);
    setIsAnswered(false);
    setQuestionIndex(0);
  };
  
  // Handle option selection
  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    // Check if answer is correct
    const isCorrect = option === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Mark as attempted
    if (!attempted.includes(`${currentQuote.id}-${questionIndex}`)) {
      setAttempted([...attempted, `${currentQuote.id}-${questionIndex}`]);
    }
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (questionIndex < currentQuote.practice.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // If no more questions, go back to quote view
      setMode('quote');
      setQuestionIndex(0);
    }
    setSelectedOption(null);
    setIsAnswered(false);
  };
  
  // Calculate progress percentage
  const progress = attempted.length > 0 
    ? (attempted.length / quotes.reduce((total, quote) => total + quote.practice.length, 0)) * 100 
    : 0;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center">
        <Link 
          to="/quotes"
          className="text-emerald-600 hover:text-emerald-800 mr-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">
          {poem.title} Quotes
        </h1>
      </div>
      
      {/* Info bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
          <span className="text-slate-700 mb-2 sm:mb-0">
            <span className="font-medium">{poem.title}</span> by {poem.author}
          </span>
          <span className="text-slate-700">
            Quote: <span className="font-semibold">{quoteIndex + 1}/{quotes.length}</span>
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-emerald-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Mode buttons */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setMode('quote')}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            mode === 'quote' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Quote
        </button>
        <button
          onClick={() => setMode('devices')}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            mode === 'devices' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Devices & Analysis
        </button>
        <button
          onClick={() => {
            setMode('practice');
            setQuestionIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
          }}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            mode === 'practice' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          Practice
        </button>
      </div>
      
      {/* Main content card */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
        {mode === 'quote' && (
          <div className="flex items-center justify-center min-h-48">
            <div className="text-center">
              <p className="text-slate-500 mb-2 text-sm">Remember this quote:</p>
              <blockquote className="text-2xl font-serif italic text-slate-800">
                "{currentQuote.quote}"
              </blockquote>
              <p className="mt-4 text-slate-500 text-sm">
                Click "Devices & Analysis" to learn more, or "Practice" to test your knowledge.
              </p>
            </div>
          </div>
        )}
        
        {mode === 'devices' && (
          <div>
            <blockquote className="text-xl font-serif italic text-slate-800 mb-6 pb-4 border-b">
              "{currentQuote.quote}"
            </blockquote>
            
            <h3 className="font-semibold text-lg text-slate-800 mb-3">Language Devices</h3>
            <ul className="mb-6 space-y-4">
              {currentQuote.devices.map((device, index) => (
                <li key={index} className="flex">
                  <div className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-md text-slate-800">{device.name}</h4>
                    <p className="text-slate-600">{device.explanation}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold text-lg text-slate-800 mb-3">Analysis</h3>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-700">{currentQuote.analysis}</p>
            </div>
          </div>
        )}
        
        {mode === 'practice' && (
          <div>
            <h3 className="font-semibold text-xl text-slate-800 mb-6">
              Practice Question {questionIndex + 1} of {currentQuote.practice.length}
            </h3>
            
            <blockquote className="text-lg font-serif italic text-slate-800 mb-6 pb-4 border-b">
              "{currentQuote.quote}"
            </blockquote>
            
            <p className="text-lg text-slate-700 mb-6">
              {currentQuestion.question}
            </p>
            
            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border ${
                    isAnswered && option === currentQuestion.answer
                      ? 'bg-green-100 border-green-400 text-green-800'
                      : isAnswered && option === selectedOption
                      ? 'bg-red-100 border-red-400 text-red-800'
                      : 'border-slate-300 hover:border-emerald-500 hover:bg-emerald-50'
                  } transition-colors`}
                >
                  {option}
                  
                  {/* Correct/Incorrect indicators */}
                  {isAnswered && option === currentQuestion.answer && (
                    <span className="float-right text-green-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                  {isAnswered && option === selectedOption && option !== currentQuestion.answer && (
                    <span className="float-right text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Explanation */}
            {isAnswered && (
              <div className="bg-slate-50 border-l-4 border-slate-500 p-4 rounded">
                <h4 className="font-semibold text-slate-800 mb-1">Explanation:</h4>
                <p className="text-slate-700">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button 
          onClick={handlePreviousQuote}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-lg transition-colors font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Previous Quote
        </button>
        
        {mode === 'practice' ? (
          <button 
            onClick={handleNextQuestion}
            className={`${
              isAnswered 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-slate-400'
            } text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center`}
          >
            Next Question
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ) : (
          <button 
            onClick={handleNextQuote}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center"
          >
            Next Quote
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PoemQuotes;