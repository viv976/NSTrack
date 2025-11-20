import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Code, Smartphone, Brain, Trophy, User, LogOut, Sun, Moon, Flame } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { progress, getProblemsSolved, getTopicProgress } = useProgress();
  const [user, setUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      
      // Check if this is the first time the user is logging in
      const firstLogin = localStorage.getItem('firstLogin');
      if (firstLogin === null) {
        // This is the first login
        localStorage.setItem('firstLogin', 'false');
        // You could also set a state to show a special welcome message
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    navigate(`/language/${lang}`);
  };

  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
    localStorage.setItem('selectedTrack', track);
    toast.success(`${track} selected!`);
  };

  const handleGenerateRoadmap = () => {
    if (!selectedTrack) {
      toast.error('Please select a learning track first');
      return;
    }
    navigate('/roadmap');
  };

  const tracks = [
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: Code,
      description: 'Build modern websites and web applications',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'app-dev',
      name: 'App Development',
      icon: Smartphone,
      description: 'Create mobile applications for iOS and Android',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'ai-ml',
      name: 'AI / Machine Learning',
      icon: Brain,
      description: 'Master artificial intelligence and ML algorithms',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'dsa-cp',
      name: 'DSA & Competitive Programming',
      icon: Trophy,
      description: 'Excel in data structures and problem-solving',
      color: 'from-pink-500 to-red-600'
    }
  ];

  const problemsSolved = getProblemsSolved();
  const topicsCompleted = progress.selectedLanguage ? getTopicProgress(progress.selectedLanguage) : 0;
  const totalProgress = Math.min(((problemsSolved * 10 + topicsCompleted * 15) / 100) * 100, 100);

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-200">
      {/* Header */}
      <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" data-testid="dashboard-title">
              NSTrack
            </h1>
          </Link>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <div className="hidden md:block">
              <Select value={selectedLanguage} onValueChange={handleLanguageSelect}>
                <SelectTrigger className="w-[220px] bg-gray-900/70 border-gray-800 text-slate-200 hover:border-cyan-500/50 transition-colors" data-testid="language-nav-selector">
                  <SelectValue placeholder="Languages" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-slate-200">
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="html_css">HTML & CSS</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-300 hover:text-cyan-400 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link to="/problems">
              <Button variant="ghost" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50" data-testid="problems-nav-btn">
                <Trophy className="w-4 h-4 mr-2" />
                Problems
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50" data-testid="profile-nav-btn">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-400 hover:bg-gray-800/50"
              data-testid="logout-button"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-12">
          <div className="bg-black/90 rounded-2xl p-8 shadow-lg border border-gray-800 hover:shadow-xl transition-all hover:border-cyan-500/30">
            <h2 className="text-3xl font-bold text-white mb-2">
              {localStorage.getItem('firstLogin') === 'false' ? 
                `Welcome to NSTrack, ${user?.name?.split(' ')[0]}! 🎉` : 
                `Welcome back, ${user?.name?.split(' ')[0]}!`}
            </h2>
            <p className="text-lg text-slate-300">
              Your Points: <span className="text-cyan-500 font-bold text-xl" data-testid="user-points">{user?.points || 0}</span>
            </p>
          </div>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/80 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/30 transition-colors hover:shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400">Overall Progress</p>
              <span className="text-cyan-500 dark:text-cyan-400 font-bold">{Math.round(totalProgress)}%</span>
            </div>
            <Progress value={totalProgress} className="h-2 bg-gray-100 dark:bg-gray-700" data-testid="overall-progress" />
          </div>
          <div className="bg-black/80 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/30 transition-colors hover:shadow-lg">
            <p className="text-gray-400 mb-2">Topics Completed</p>
            <p className="text-3xl font-bold text-white" data-testid="topics-completed">{topicsCompleted}</p>
          </div>
          <div className="bg-black/80 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/30 transition-colors hover:shadow-lg">
            <p className="text-gray-400 mb-2">Problems Solved</p>
            <p className="text-3xl font-bold text-white" data-testid="problems-solved">{problemsSolved}</p>
          </div>
        </div>
        {/* Mobile Language Selector */}
        <div className="md:hidden mb-12 bg-black/80 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-3">Languages</h3>
          <Select value={selectedLanguage} onValueChange={handleLanguageSelect}>
            <SelectTrigger className="bg-black/80 border-gray-800 text-white" data-testid="language-selector-mobile">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-gray-100">
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="html_css">HTML & CSS</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Learning Tracks */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Select a Learning Track</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => handleTrackSelect(track.name)}
                className="group bg-black/80 rounded-xl p-6 cursor-pointer border border-gray-800 hover:border-cyan-500/30 hover:shadow-md transition-all duration-200"
                data-testid={`track-card-${track.id}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${track.color} text-white`}>
                  <track.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-600 transition-colors">
                  {track.name}
                </h3>
                <p className="text-slate-300 text-sm">{track.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Generate Roadmap Button */}
        {selectedTrack && (
          <div className="flex justify-center animate-fade-in">
            <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <Button
                className="bg-transparent text-white font-medium px-8 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-cyan-500/30 focus:outline-none"
                onClick={handleGenerateRoadmap}
                data-testid="generate-roadmap-btn"
              >
                Generate Roadmap
              </Button>
            </div>
          </div>
        )}

        {/* Motivational Message */}
        {totalProgress > 0 && (
          <div className="mt-12 bg-black/80 rounded-2xl p-6 text-center border border-gray-800 hover:border-cyan-500/30 transition-colors">
            <p className="text-lg text-gray-300">
              {totalProgress < 25 && "🌱 Great start! Keep learning consistently."}
              {totalProgress >= 25 && totalProgress < 50 && "🚀 You're making solid progress! Keep going."}
              {totalProgress >= 50 && totalProgress < 75 && "🌟 Excellent work! You're more than halfway there."}
              {totalProgress >= 75 && "🏆 Outstanding! You're becoming a master!"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;