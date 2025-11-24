import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import ConfettiCelebration from '../components/ConfettiCelebration';
import { useProgress } from '../context/ProgressContext';

const SignupPage = ({ setAuth }) => {
  const navigate = useNavigate();
  const { updateStreak } = useProgress();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skill_level: 'Beginner',
    batch: ''
  });
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/signup`, formData);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Show celebration
      setShowConfetti(true);
      setShowWelcome(true);
      updateStreak();

      toast.success(`Welcome! You've earned ${response.data.user.points} points!`);

      // Navigate after animation
      setTimeout(() => {
        setAuth(true);
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Signup failed');
      setLoading(false);
    }
  };

  // Force dark theme for signup page
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      // Cleanup if needed when component unmounts
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none">
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <ConfettiCelebration show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <Link to="/" className="absolute top-6 left-6">
        <Button variant="ghost" className="text-slate-300 hover:text-cyan-400" data-testid="home-btn">
          ← Home
        </Button>
      </Link>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        {showWelcome && (
          <div className="bg-gray-900/90 rounded-2xl p-6 mb-6 text-center border border-gray-800">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
              Welcome to NSTrack! 🎉
            </h2>
            <p className="text-gray-400">Your learning journey begins now...</p>
          </div>
        )}

        <div className="bg-gray-900/90 rounded-2xl p-8 border border-gray-800 hover:border-cyan-500/30 transition-colors">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
              NSTrack
            </h1>
            <p className="text-gray-400 text-lg font-medium">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="signup-form">
            <div>
              <Label htmlFor="name" className="text-slate-200 text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                data-testid="name-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                placeholder="John Doe"
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-200 text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                data-testid="email-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                placeholder="your.email@nst.edu"
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-200 text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                data-testid="password-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="skill_level" className="text-slate-200 text-sm font-medium">Current Skill Level</Label>
              <Select
                value={formData.skill_level}
                onValueChange={(value) => setFormData({ ...formData, skill_level: value })}
                disabled={loading}
              >
                <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-700 text-white" data-testid="skill-level-select">
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="Beginner" data-testid="skill-beginner">Beginner (10 points)</SelectItem>
                  <SelectItem value="Intermediate" data-testid="skill-intermediate">Intermediate (25 points)</SelectItem>
                  <SelectItem value="Advanced" data-testid="skill-advanced">Advanced (50 points)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="batch" className="text-slate-200 text-sm font-medium">Batch</Label>
              <Select
                value={formData.batch}
                onValueChange={(value) => setFormData({ ...formData, batch: value })}
                disabled={loading}
              >
                <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-700 text-white" data-testid="batch-select">
                  <SelectValue placeholder="Select your batch" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="Turing" data-testid="batch-turing">Turing</SelectItem>
                  <SelectItem value="Hopper" data-testid="batch-hopper">Hopper</SelectItem>
                  <SelectItem value="Neumann" data-testid="batch-neumann">Neumann</SelectItem>
                  <SelectItem value="Ramanujan" data-testid="batch-ramanujan">Ramanujan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              data-testid="signup-submit-btn"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium" data-testid="login-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;