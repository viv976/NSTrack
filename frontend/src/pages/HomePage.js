import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Users, ArrowRight, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import FeaturesSection from '../components/FeaturesSection';

const HomePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const benefits = [
    'Personalized learning paths tailored to YOUR goals',
    'AI-powered content generation for roadmaps and problems',
    'Gamified point system to track your progress',
    'Internal learning resources - everything in one place',
    'No scattered tutorials or random YouTube playlists',
    'Community-focused for NST students'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-20">
            <h1 className={`text-3xl font-bold text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`} data-testid="home-logo">
              NSTrack
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login', { replace: false });
                }}
                className="text-gray-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
                data-testid="home-login-btn"
              >
                Login
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup', { replace: false });
                }}
                className="border-cyan-500 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-500/10"
                data-testid="home-nav-signup-btn"
              >
                Sign Up
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup', { replace: false });
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                data-testid="home-signup-btn"
              >
                Get Started
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 mb-6">
              <Users className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
              <span className="text-cyan-700 dark:text-cyan-400 text-sm font-medium">Built for NST Students</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500">
                Your AI-Powered
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-cyan-400 dark:to-blue-500">
                Learning Mentor
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Stop struggling with scattered resources. NSTrack creates personalized learning paths, 
              generates practice problems, and guides you from basics to mastery - all in one place.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup', { replace: false });
                }}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all"
                data-testid="hero-get-started-btn"
              >
                Start Learning Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-600 hover:bg-cyan-50 dark:text-cyan-400 hover:dark:bg-cyan-500/10 px-8 py-6 text-lg"
                data-testid="learn-more-btn"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 mb-6">
              <Users className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
              <span className="text-cyan-700 dark:text-cyan-400 text-sm font-medium">Built for NST Students</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500">
                Your AI-Powered
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-cyan-400 dark:to-blue-500">
                Learning Mentor
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Stop struggling with scattered resources. NSTrack creates personalized learning paths, 
              generates practice problems, and guides you from basics to mastery - all in one place.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button 
                onClick={() => navigate('/signup')} 
                className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => {
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-12 text-center border-2 border-gray-100 dark:border-gray-700 shadow-xl">
          <h3 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Learning Journey?
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-10 max-w-2xl mx-auto font-medium">
            Join NSTrack today and get your personalized AI-powered learning roadmap in minutes
          </p>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup', { replace: false });
            }}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-12 py-6 text-xl"
            data-testid="cta-signup-btn"
          >
            Get Started Free
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 dark:text-slate-400">
          <p>© 2025 NSTrack - AI-Powered Learning Mentor for NST Students</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;