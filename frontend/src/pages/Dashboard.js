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
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    window.open(`/language/${lang}`, '_blank');
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
    window.open('/roadmap', '_blank');
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgb(3,7,18) 0%, rgb(6,15,35) 100%)' }}>
      {/* Header */}
      <nav className="glass-effect border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer hover:opacity-80 transition-opacity" data-testid="dashboard-title">
              NSTrack
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="text-slate-300 hover:text-cyan-400"
              data-testid="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link to="/problems" target="_blank">
              <Button variant="ghost" className="text-slate-300 hover:text-cyan-400" data-testid="problems-nav-btn">
                <Trophy className="w-4 h-4 mr-2" />
                Problems
              </Button>
            </Link>
            <Link to="/profile" target="_blank">
              <Button variant="ghost" className="text-slate-300 hover:text-cyan-400" data-testid="profile-nav-btn">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleLogout} className="text-slate-300 hover:text-red-400" data-testid="logout-btn">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section with Progress */}
        <div className="mb-12 animate-fade-in" data-testid="welcome-section">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-lg text-slate-300">
                Your Points: <span className="text-cyan-400 font-bold text-xl" data-testid="user-points">{user?.points || 0}</span>
              </p>
            </div>
            {progress.streak > 0 && (
              <div className="glass-effect rounded-xl px-6 py-4 flex items-center gap-3" data-testid="streak-indicator">
                <Flame className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{progress.streak}</p>
                  <p className="text-sm text-slate-400">Day Streak</p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-300">Overall Progress</p>
                <span className="text-cyan-400 font-bold">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" data-testid="overall-progress" />
            </div>
            <div className="glass-effect rounded-xl p-6">
              <p className="text-slate-300 mb-2">Topics Completed</p>
              <p className="text-3xl font-bold text-white" data-testid="topics-completed">{topicsCompleted}</p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <p className="text-slate-300 mb-2">Problems Solved</p>
              <p className="text-3xl font-bold text-white" data-testid="problems-solved">{problemsSolved}</p>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-12 glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Choose a Programming Language</h3>
          <p className="text-slate-300 mb-6">Learn any language with our comprehensive internal guides</p>
          <Select value={selectedLanguage} onValueChange={handleLanguageSelect}>
            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white max-w-md" data-testid="language-selector">
              <SelectValue placeholder="Select a language to learn" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="python" data-testid="lang-python">Python</SelectItem>
              <SelectItem value="java" data-testid="lang-java">Java</SelectItem>
              <SelectItem value="cpp" data-testid="lang-cpp">C++</SelectItem>
              <SelectItem value="javascript" data-testid="lang-javascript">JavaScript</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Learning Tracks */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Select Your Learning Track</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((track) => {
              const Icon = track.icon;
              const isSelected = selectedTrack === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackSelect(track.id)}
                  data-testid={`track-${track.id}`}
                  className={`glass-effect rounded-2xl p-6 cursor-pointer transition-all hover-glow ${
                    isSelected ? 'ring-2 ring-cyan-500' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{track.name}</h4>
                  <p className="text-slate-300">{track.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generate Roadmap Button */}
        {selectedTrack && (
          <div className="flex justify-center animate-fade-in">
            <Button
              onClick={handleGenerateRoadmap}
              data-testid="generate-roadmap-btn"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-12 py-6 text-lg rounded-xl"
            >
              Generate Roadmap
            </Button>
          </div>
        )}

        {/* Motivational Message */}
        {totalProgress > 0 && (
          <div className="mt-12 glass-effect rounded-2xl p-6 text-center animate-fade-in">
            <p className="text-lg text-slate-300">
              {totalProgress < 25 && "🌱 Great start! Keep learning consistently."}
              {totalProgress >= 25 && totalProgress < 50 && "🚀 You're making solid progress! Keep going."}
              {totalProgress >= 50 && totalProgress < 75 && "🌟 Excellent work! You're more than halfway there."}
              {totalProgress >= 75 && "🏆 Outstanding! You're becoming a master!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;