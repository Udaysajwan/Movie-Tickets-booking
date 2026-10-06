import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Search, Ticket, ChevronLeft, UserCircle } from 'lucide-react';
import { movies, categories } from './data/movies';

const SEAT_ROWS = 6;
const SEAT_COLS = 8;

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'booking', 'login'
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setCurrentView('booking');
    setSelectedSeats([]);
  };

  const toggleSeat = (row, col) => {
    const seatId = `${row}-${col}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.length * 15; // $15 per ticket
  };

  // Filter movies based on category and search query
  const filteredMovies = useMemo(() => {
    let filtered = movies;
    if (activeCategory !== 'All') {
      filtered = filtered.filter(m => m.category === activeCategory);
    }
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            <Ticket className="w-8 h-8 text-teal-600" />
            <span className="text-xl font-extrabold tracking-tight text-gray-900">CineReserve</span>
          </div>
          
          <div className="flex items-center gap-6">
            {currentView === 'home' && (
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search movies..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-48 placeholder-gray-500 text-gray-900"
                />
              </div>
            )}
            
            <button 
              onClick={() => setCurrentView('login')}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-full font-semibold transition-colors shadow-md shadow-teal-500/20"
            >
              <UserCircle className="w-5 h-5" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen relative">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Now Showing</h1>
                
                {/* Category Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeCategory === cat 
                          ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20' 
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              {filteredMovies.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-xl">No movies found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredMovies.map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-gray-200 hover:border-teal-500/50 transition-all flex flex-col h-full bg-white"
                      onClick={() => handleMovieSelect(movie)}
                    >
                      <div className="aspect-[2/3] relative w-full overflow-hidden bg-gray-100">
                        <img 
                          src={movie.image} 
                          alt={movie.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient for text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
                        
                        <div className="absolute top-3 right-3 bg-teal-600/90 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                          {movie.category}
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                        <h3 className="text-lg font-bold mb-1 line-clamp-2 text-white">{movie.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Clock className="w-3 h-3 text-teal-400" />
                          {movie.duration}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* BOOKING VIEW */}
          {currentView === 'booking' && selectedMovie && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row gap-12"
            >
              {/* Left Column - Details */}
              <div className="lg:w-1/3">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium mb-8 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Movies
                </button>
                
                <motion.img 
                  layoutId={`movie-img-${selectedMovie.id}`}
                  src={selectedMovie.image}
                  className="w-full max-w-sm aspect-[2/3] object-cover rounded-2xl shadow-xl border border-gray-100 mb-6"
                />
                <div className="inline-block bg-teal-50 text-teal-700 border border-teal-200 text-sm font-bold px-3 py-1 rounded-full mb-3">
                  {selectedMovie.category}
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-gray-900">{selectedMovie.title}</h2>
                <div className="flex items-center gap-4 text-gray-500 font-medium mb-6">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-gray-400"/> Today</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gray-400"/> 19:30</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gray-400"/> Room 4</span>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">Booking Summary</h3>
                  <div className="flex justify-between text-gray-600 font-medium mb-2">
                    <span>Tickets ({selectedSeats.length})</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium mb-4 pb-4 border-b border-gray-100">
                    <span>Fee</span>
                    <span>$2</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-2xl mb-6 text-gray-900">
                    <span>Total</span>
                    <span>${calculateTotal() > 0 ? calculateTotal() + 2 : 0}</span>
                  </div>
                  <button 
                    disabled={selectedSeats.length === 0}
                    className="w-full py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white disabled:bg-gray-200 disabled:text-gray-400 font-bold transition-all shadow-md shadow-teal-500/20 disabled:shadow-none"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>

              {/* Right Column - Seat Selection */}
              <div className="lg:w-2/3 flex flex-col items-center pt-12 overflow-x-auto">
                
                {/* Screen */}
                <div className="w-full min-w-[400px] max-w-lg mb-20 perspective-1000">
                  <div className="w-full h-24 bg-gradient-to-b from-teal-50 to-transparent rounded-t-3xl border-t-4 border-teal-400 rotate-x-12 relative flex items-center justify-center shadow-[0_-10px_40px_rgba(20,184,166,0.15)]">
                    <div className="absolute top-4 text-teal-800/40 text-sm tracking-[0.5em] font-bold">SCREEN</div>
                  </div>
                </div>

                {/* Seats */}
                <div className="flex flex-col gap-4 min-w-[400px]">
                  {Array.from({ length: SEAT_ROWS }).map((_, row) => (
                    <div key={row} className="flex gap-4 justify-center">
                      {Array.from({ length: SEAT_COLS }).map((_, col) => {
                        const seatId = `${row}-${col}`;
                        const isSelected = selectedSeats.includes(seatId);
                        // Mock booked seats
                        const isBooked = (row === 2 && col === 3) || (row === 2 && col === 4) || (row === 4 && col === 7) || (row === 1 && col === 1);
                        
                        return (
                          <motion.button
                            key={col}
                            whileHover={!isBooked ? { scale: 1.15 } : {}}
                            whileTap={!isBooked ? { scale: 0.95 } : {}}
                            onClick={() => !isBooked && toggleSeat(row, col)}
                            className={`
                              w-8 h-8 md:w-10 md:h-10 rounded-t-xl rounded-b-md flex items-center justify-center transition-all border
                              ${isBooked 
                                ? 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-50' 
                                : isSelected 
                                  ? 'bg-teal-500 border-teal-600 shadow-[0_4px_15px_rgba(20,184,166,0.4)] text-white' 
                                  : 'bg-white hover:bg-gray-100 border-gray-300 shadow-sm'
                              }
                            `}
                          >
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex gap-8 mt-12 text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-t-lg bg-white border border-gray-300 shadow-sm"></div>
                    Available
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-t-lg bg-teal-500 border border-teal-600 shadow-sm shadow-teal-500/40"></div>
                    Selected
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-t-lg bg-gray-200 border border-gray-300 opacity-50"></div>
                    Booked
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* LOGIN VIEW */}
          {currentView === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center min-h-[70vh]"
            >
              <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                  <UserCircle className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-gray-900">Welcome Back</h2>
                  <p className="text-gray-500 font-medium">Sign in to book your tickets</p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="you@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm font-medium">
                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 bg-gray-50 text-teal-600 focus:ring-teal-500" />
                      Remember me
                    </label>
                    <a href="#" className="text-teal-600 hover:text-teal-500 font-bold">Forgot password?</a>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-teal-500/30"
                    onClick={() => setCurrentView('home')}
                  >
                    Sign In
                  </button>
                </form>
                
                <p className="text-center text-gray-500 text-sm mt-8 font-medium">
                  Don't have an account? <a href="#" className="text-teal-600 hover:text-teal-500 font-bold">Sign up</a>
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
