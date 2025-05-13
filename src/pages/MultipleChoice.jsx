import React, { useState } from 'react'

// Sample questions - this will be replaced with actual content
const sampleQuestions = [
  {
    id: 1,
    question: "Which literary device is used to give human qualities to non-human objects?",
    options: ["Metaphor", "Simile", "Personification", "Alliteration"],
    correctAnswer: "Personification",
    explanation: "Personification is a figure of speech where human characteristics are attributed to non-human things."
  },
  {
    id: 2,
    question: "In the phrase 'She sells seashells by the seashore,' what literary device is demonstrated?",
    options: ["Assonance", "Alliteration", "Onomatopoeia", "Consonance"],
    correctAnswer: "Alliteration",
    explanation: "Alliteration is the repetition of the same consonant sound at the beginning of nearby words, in this case the 's' sound."
  },
  {
    id: 3,
    question: "What does the term 'juxtaposition' refer to?",
    options: ["Using hyperbole for effect", "Placing contrasting elements side by side", "Breaking down a concept into parts", "Creating ambiguity in meaning"],
    correctAnswer: "Placing contrasting elements side by side",
    explanation: "Juxtaposition is a literary technique where two contrasting elements are placed side by side to create a comparison or highlight differences."
  },
  {
    id: 4,
    question: "What is a sonnet?",
    options: ["A 12-line poem with no set structure", "A 16-line poem with a specific rhyme scheme", "A 14-line poem with a specific rhyme scheme", "Any poem expressing love"],
    correctAnswer: "A 14-line poem with a specific rhyme scheme",
    explanation: "A sonnet is a 14-line poem that follows a specific rhyme scheme and structure, typically with 10 syllables per line."
  },
  {
    id: 5,
    question: "What is the purpose of foreshadowing in literature?",
    options: ["To create humor and irony", "To provide hints about what will happen later", "To directly address the reader", "To analyze a character's thoughts"],
    correctAnswer: "To provide hints about what will happen later",
    explanation: "Foreshadowing is a literary device used to give hints or clues about events that will occur later in the narrative."
  }
]

const MultipleChoice = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [questionsAttempted, setQuestionsAttempted] = useState([])
  
  const currentQuestion = sampleQuestions[currentQuestionIndex]
  
  const handleOptionSelect = (option) => {
    if (isAnswered) return
    
    setSelectedOption(option)
    setIsAnswered(true)
    
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
    
    if (!questionsAttempted.includes(currentQuestion.id)) {
      setQuestionsAttempted([...questionsAttempted, currentQuestion.id])
    }
  }
  
  const handleNext = () => {
    // If we're at the end, loop back to the beginning
    const nextIndex = (currentQuestionIndex + 1) % sampleQuestions.length
    setCurrentQuestionIndex(nextIndex)
    setSelectedOption(null)
    setIsAnswered(false)
  }
  
  const handlePrevious = () => {
    // If we're at the beginning, loop to the end
    const prevIndex = currentQuestionIndex === 0 
      ? sampleQuestions.length - 1 
      : currentQuestionIndex - 1
    setCurrentQuestionIndex(prevIndex)
    setSelectedOption(null)
    setIsAnswered(false)
  }
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setQuestionsAttempted([])
  }
  
  const progress = (questionsAttempted.length / sampleQuestions.length) * 100
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Multiple Choice Quiz</h1>
      
      {/* Score and progress */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-slate-700">
            Score: <span className="font-semibold">{score}/{questionsAttempted.length}</span>
            {questionsAttempted.length > 0 && (
              <span className="text-slate-500 ml-2">
                ({Math.round((score / questionsAttempted.length) * 100)}%)
              </span>
            )}
          </span>
          <button 
            onClick={resetQuiz} 
            className="text-emerald-600 hover:text-emerald-800 text-sm"
          >
            Reset Quiz
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-emerald-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question card */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Question {currentQuestionIndex + 1} of {sampleQuestions.length}
          </h2>
          <p className="text-lg text-slate-700">
            {currentQuestion.question}
          </p>
        </div>
        
        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg border ${
                isAnswered && option === currentQuestion.correctAnswer
                  ? 'bg-green-100 border-green-400 text-green-800'
                  : isAnswered && option === selectedOption
                  ? 'bg-red-100 border-red-400 text-red-800'
                  : 'border-slate-300 hover:border-emerald-500 hover:bg-emerald-50'
              } transition-colors`}
            >
              {option}
              
              {/* Correct/Incorrect indicators */}
              {isAnswered && option === currentQuestion.correctAnswer && (
                <span className="float-right text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              )}
              {isAnswered && option === selectedOption && option !== currentQuestion.correctAnswer && (
                <span className="float-right text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Explanation (shows after answering) */}
        {isAnswered && (
          <div className="bg-slate-50 border-l-4 border-slate-500 p-4 rounded">
            <h3 className="font-semibold text-slate-800 mb-1">Explanation:</h3>
            <p className="text-slate-700">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-lg transition-colors font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Previous
        </button>
        
        <button 
          onClick={handleNext}
          className={`${
            isAnswered 
              ? 'bg-emerald-600 hover:bg-emerald-700' 
              : 'bg-slate-400'
          } text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center`}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MultipleChoice