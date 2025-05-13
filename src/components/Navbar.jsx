import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const location = useLocation()
  
  // Function to check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }
  
  return (
    <header className="bg-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            English GCSE Revision
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" active={isActive('/')}>Home</NavLink>
            
            {/* Practice Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                className={`flex items-center transition-colors duration-200 ${
                  isActive('/practice') 
                    ? 'text-emerald-300 font-medium' 
                    : 'text-white hover:text-emerald-200'
                }`}
              >
                Practice
                <svg 
                  className="ml-1 h-4 w-4" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isSubmenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link 
                    to="/practice/word-classes" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setIsSubmenuOpen(false)}
                  >
                    Word Classes
                  </Link>
                  <Link 
                    to="/practice/language-devices" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setIsSubmenuOpen(false)}
                  >
                    Language Devices
                  </Link>
                  <Link 
                    to="/practice/more-devices" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setIsSubmenuOpen(false)}
                  >
                    More Devices
                  </Link>
                  <Link 
                    to="/quotes" 
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setIsSubmenuOpen(false)}
                  >
                    Key Quotes
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-3 pb-6">
            <NavLink to="/" active={isActive('/')}>Home</NavLink>
            
            {/* Practice Links - expanded on mobile */}
            <div className="pl-4 border-l-2 border-slate-700 space-y-3">
              <p className="text-slate-400 text-sm uppercase tracking-wider">Practice:</p>
              <NavLink to="/practice/word-classes" active={isActive('/practice/word-classes')}>
                Word Classes
              </NavLink>
              <NavLink to="/practice/language-devices" active={isActive('/practice/language-devices')}>
                Language Devices
              </NavLink>
              <NavLink to="/practice/more-devices" active={isActive('/practice/more-devices')}>
                More Devices
              </NavLink>
              <NavLink to="/quotes" active={isActive('/quotes')}>
                Key Quotes
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

// Helper component for NavLinks
const NavLink = ({ to, children, active }) => {
  return (
    <Link 
      to={to} 
      className={`transition-colors duration-200 ${
        active 
          ? 'text-emerald-300 font-medium' 
          : 'text-white hover:text-emerald-200'
      }`}
    >
      {children}
    </Link>
  )
}

export default Navbar