import React from 'react';
import { Link } from 'react-router-dom';
import { poemsList } from '../data/quotesData';

const PoemsSelection = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Key Quotes Practice
      </h1>
      
      <p className="text-lg text-slate-600 mb-8">
        Select a poem to practice remembering and analyzing key quotes.
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {poemsList.map(poem => (
          <Link
            key={poem.id}
            to={`/quotes/${poem.id}`}
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-2">{poem.title}</h2>
            <p className="text-sm text-slate-500 mb-2">by {poem.author}</p>
            <p className="text-slate-600 mb-4">{poem.form}</p>
            <p className="text-slate-700 text-sm">{poem.description}</p>
            <div className="mt-4 text-amber-600 font-medium flex items-center">
              Practice Quotes
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PoemsSelection;