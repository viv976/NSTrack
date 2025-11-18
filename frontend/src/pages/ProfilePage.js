import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API, getAuthHeaders } from '../App';
import { Button } from '../components/ui/button';
import { User, Trophy, Target, Calendar as CalendarIcon, Flame, Award, Edit3, LogOut } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { useProgress } from '../context/ProgressContext';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { progress, getProblemsSolved, getTopicProgress } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  // profile photo preview state
  const [photoPreview, setPhotoPreview] = useState(() => {
    try {
      const saved = localStorage.getItem('profilePhoto');
      return saved || null;
    } catch (e) {
      return null;
    }
  });
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const fileInputRef = useRef(null);

  const triggerFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setPhotoPreview(result);
      try {
        localStorage.setItem('profilePhoto', result);
        toast.success('Profile photo saved locally');
      } catch (err) {
        toast.error('Failed to save photo');
      }
    };
    reader.readAsDataURL(file);
    setShowPhotoMenu(false);
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API}/auth/profile`, {
        headers: getAuthHeaders()
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgb(3,7,18) 0%, rgb(6,15,35) 100%)' }}>
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  const getSkillLevelColor = (level) => {
    const colors = {
      'Beginner': 'from-green-500 to-emerald-600',
      'Intermediate': 'from-yellow-500 to-orange-600',
      'Advanced': 'from-purple-500 to-pink-600'
    };
    return colors[level] || 'from-slate-500 to-slate-600';
  };

  const trackNames = {
    'web-dev': 'Web Development',
    'app-dev': 'App Development',
    'ai-ml': 'AI / Machine Learning',
    'dsa-cp': 'DSA & Competitive Programming'
  };

  const problemsSolved = getProblemsSolved();
  const topicsCompleted = progress.selectedLanguage ? getTopicProgress(progress.selectedLanguage) : 0;
  const totalProgress = Math.min(((problemsSolved * 10 + topicsCompleted * 15) / 100) * 100, 100);

  const getAchievements = () => {
    const achievements = [];
    if (problemsSolved >= 1) achievements.push({ icon: Trophy, title: 'First Problem', desc: 'Solved your first problem' });
    if (problemsSolved >= 10) achievements.push({ icon: Award, title: 'Problem Solver', desc: 'Solved 10 problems' });
    if (progress.streak >= 3) achievements.push({ icon: Flame, title: 'On Fire!', desc: '3 day streak' });
    if (progress.streak >= 7) achievements.push({ icon: Flame, title: 'Week Warrior', desc: '7 day streak' });
    if (topicsCompleted >= 5) achievements.push({ icon: Target, title: 'Quick Learner', desc: 'Completed 5 topics' });
    return achievements;
  };

  const achievements = getAchievements();

  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (e) {
      // ignore
    }
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgb(3,7,18) 0%, rgb(6,15,35) 100%)' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="w-24 h-24 relative mx-auto mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt="avatar" className="w-24 h-24 object-cover" />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            {/* pencil overlay */}
            <button
              aria-label="edit photo"
              onClick={() => setShowPhotoMenu((s) => !s)}
              className="absolute right-0 bottom-0 -mb-1 -mr-1 bg-slate-800/70 hover:bg-slate-700 rounded-full p-1 shadow-lg border border-slate-700"
            >
              <Edit3 className="w-4 h-4 text-white" />
            </button>
            {showPhotoMenu && (
              <div className="absolute left-full top-0 ml-3 w-44 bg-white border border-slate-200 rounded shadow-lg z-30">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoFileChange} />
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 text-slate-900"
                  onClick={() => {
                    triggerFilePicker();
                  }}
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 text-slate-900"
                  onClick={() => {
                    setPhotoPreview(null);
                    localStorage.removeItem('profilePhoto');
                    setShowPhotoMenu(false);
                    toast.success('Profile photo removed');
                  }}
                >
                  Remove Photo
                </button>
              </div>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2" data-testid="profile-name">{user?.name}</h1>
          <p className="text-slate-300 text-lg">{user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Points */}
          <div className="glass-effect rounded-2xl p-6 hover-glow" data-testid="profile-points-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Points</p>
                <p className="text-3xl font-bold text-white" data-testid="profile-points">{user?.points || 0}</p>
              </div>
            </div>
          </div>

          {/* Skill Level */}
          <div className="glass-effect rounded-2xl p-6 hover-glow" data-testid="profile-skill-card">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getSkillLevelColor(user?.skill_level)} flex items-center justify-center`}>
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Skill Level</p>
                <p className="text-xl font-bold text-white" data-testid="profile-skill">{user?.skill_level}</p>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="glass-effect rounded-2xl p-6 hover-glow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Current Streak</p>
                <p className="text-3xl font-bold text-white">{progress.streak} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="glass-effect rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Learning Progress</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">Overall Progress</span>
                <span className="text-cyan-400 font-bold">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-slate-300 mb-2">Topics Completed</p>
                <p className="text-3xl font-bold text-white">{topicsCompleted}</p>
              </div>
              <div>
                <p className="text-slate-300 mb-2">Problems Solved</p>
                <p className="text-3xl font-bold text-white">{problemsSolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="glass-effect rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Achievements 🏆</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-cyan-500/20">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{achievement.title}</p>
                      <p className="text-sm text-slate-400">{achievement.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Track */}
        <div className="glass-effect rounded-2xl p-8 mb-8" data-testid="profile-track-card">
          <h2 className="text-2xl font-bold text-white mb-4">Current Learning Track</h2>
          {user?.selected_track ? (
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xl text-cyan-400 font-semibold" data-testid="profile-track">
                  {trackNames[user.selected_track] || user.selected_track}
                </p>
                <p className="text-slate-400 mt-2">Keep up the great work on your learning journey!</p>
              </div>
            </div>
          ) : (
            <p className="text-slate-400">No track selected yet. Visit the dashboard to choose a track!</p>
          )}
        </div>

  {/* Member Since */}
        <div className="glass-effect rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Member Since</p>
              <p className="text-xl font-bold text-white">
                {new Date(user?.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom actions: logout moved here */}
        <div className="mt-8 pt-6 border-t border-slate-700 flex justify-center">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium"
            data-testid="profile-logout-btn"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;