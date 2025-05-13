import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { wordClassesData, languageDevicesData, moreLanguageDevicesData, quotesData } from '../data/practiceData'

const Practice = () => {
  const { topic } = useParams()
  const navigate = useNavigate()
  
  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [questionsAttempted, setQuestionsAttempted] = useState([])
  
  // Get data based on topic
  useEffect(() => {
    let topicData = []
    let title = ''
    
    switch(topic) {
      case 'word-classes':
        title = 'Word Classes'
        topicData = wordClassesData
        break
      case 'language-devices':
        title = 'Language Devices'
        topicData = languageDevicesData
        break
      case 'more-devices':
        title = 'More Language Devices'
        topicData = moreLanguageDevicesData
        break
      case 'quotes':
        title = 'Key Quotes'
        topicData = quotesData
        break
      default:
        navigate('/')
        return
    }
    
    document.title = `${title} Practice - English GCSE Revision`
    
    // Transform data into questions
    const allQuestions = []
    
    topicData.forEach(item => {
      if (item.practice && item.practice.length > 0) {
        item.practice.forEach((practice, i) => {
          allQuestions.push({
            id: `${item.id}-question-${i}`,
            term: item.term,
            question: practice.question,
            options: practice.options,
            answer: practice.answer,
            explanation: practice.explanation
          })
        })
      }
    })
    
    // Shuffle the questions
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffledQuestions)
    
    // Reset state when topic changes
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuestionsAttempted([])
    setSelectedOption(null)
    setIsAnswered(false)
  }, [topic, navigate])
  
  // Handle option selection
  const handleOptionSelect = (option) => {
    if (isAnswered) return
    
    setSelectedOption(option)
    setIsAnswered(true)
    
    const currentQuestion = questions[currentQuestionIndex]
    
    // Check if answer is correct
    const isCorrect = option === currentQuestion.answer
    
    if (isCorrect) {
      setScore(score + 1)
    }
    
    if (!questionsAttempted.includes(currentQuestion.id)) {
      setQuestionsAttempted([...questionsAttempted, currentQuestion.id])
    }
  }
  
  // Handle next button click
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Loop back to first question
      setCurrentQuestionIndex(0)
    }
    
    // Reset for next question
    setSelectedOption(null)
    setIsAnswered(false)
  }
  
  // Handle previous button click
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      // Loop to last question
      setCurrentQuestionIndex(questions.length - 1)
    }
    
    // Reset for previous question
    setSelectedOption(null)
    setIsAnswered(false)
  }
  
  // Reset progress
  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setQuestionsAttempted([])
  }
  
  // Calculate progress percentage
  const progress = questionsAttempted.length > 0 
    ? (questionsAttempted.length / questions.length) * 100 
    : 0
  
  // Get topic title
  const getTopicTitle = () => {
    switch(topic) {
      case 'word-classes':
        return 'Word Classes'
      case 'language-devices':
        return 'Language Devices'
      case 'more-devices':
        return 'More Language Devices'
      case 'quotes':
        return 'Key Quotes'
      default:
        return 'Practice'
    }
  }
  
  // If no questions, show loading or empty state
  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        {topic === 'quotes' ? (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">
              Key Quotes Practice
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Quotes will be added soon. Please check back later.
            </p>
            <Link 
              to="/"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          <div>Loading practice questions...</div>
        )}
      </div>
    )
  }
  
  const currentQuestion = questions[currentQuestionIndex]
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        {getTopicTitle()} Practice
      </h1>
      
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
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          {currentQuestion.term && (
            <p className="text-lg font-medium text-emerald-700 mb-2">
              {currentQuestion.term}
            </p>
          )}
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

export default Practice