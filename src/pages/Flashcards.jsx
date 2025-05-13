import React, { useState } from 'react'

// Sample flashcard data - this will be replaced with actual content
const sampleFlashcards = [
  {
    id: 1,
    question: "What is a metaphor?",
    answer: "A figure of speech that makes a comparison between two unrelated things without using 'like' or 'as'."
  },
  {
    id: 2,
    question: "What is a simile?",
    answer: "A figure of speech that directly compares two different things, usually using 'like' or 'as'."
  },
  {
    id: 3,
    question: "What is personification?",
    answer: "A figure of speech in which human characteristics are attributed to non-human things."
  },
  {
    id: 4,
    question: "What is alliteration?",
    answer: "The repetition of the same consonant sounds at the beginning of words that are close together."
  },
  {
    id: 5,
    question: "What is onomatopoeia?",
    answer: "The formation of a word from a sound associated with what is named (e.g., 'buzz', 'crash')."
  }
]

const Flashcards = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [completed, setCompleted] = useState([])
  
  const currentCard = sampleFlashcards[currentCardIndex]
  
  const handleNext = () => {
    // If we're at the end, loop back to the beginning
    const nextIndex = (currentCardIndex + 1) % sampleFlashcards.length
    setCurrentCardIndex(nextIndex)
    setFlipped(false)
    
    // Mark card as completed if not already
    if (!completed.includes(currentCard.id)) {
      setCompleted([...completed, currentCard.id])
    }
  }
  
  const handlePrevious = () => {
    // If we're at the beginning, loop to the end
    const prevIndex = currentCardIndex === 0 
      ? sampleFlashcards.length - 1 
      : currentCardIndex - 1
    setCurrentCardIndex(prevIndex)
    setFlipped(false)
  }
  
  const resetProgress = () => {
    setCompleted([])
    setCurrentCardIndex(0)
    setFlipped(false)
  }
  
  const progress = (completed.length / sampleFlashcards.length) * 100
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Flashcards</h1>
      
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <span>Progress: {completed.length}/{sampleFlashcards.length} cards</span>
          <button 
            onClick={resetProgress} 
            className="text-purple-600 hover:text-purple-800"
          >
            Reset
          </button>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-purple-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Flashcard */}
      <div 
        className={`bg-white rounded-xl shadow-lg border border-slate-200 h-64 md:h-80 mb-6 cursor-pointer relative overflow-hidden transform transition-transform duration-500 ${flipped ? 'scale-[0.98]' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`absolute inset-0 p-8 flex flex-col items-center justify-center backface-visibility-hidden transition-opacity duration-500 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
            {currentCard.question}
          </h2>
          <p className="text-slate-600 text-center">
            (Click to reveal answer)
          </p>
        </div>
        
        <div className={`absolute inset-0 p-8 flex flex-col items-center justify-center backface-visibility-hidden transition-opacity duration-500 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xl text-center text-slate-800">
            {currentCard.answer}
          </p>
        </div>
        
        {/* Card counter */}
        <div className="absolute bottom-3 right-3 bg-slate-100 px-3 py-1 rounded text-sm text-slate-600">
          {currentCardIndex + 1} / {sampleFlashcards.length}
        </div>
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
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center"
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

export default Flashcards