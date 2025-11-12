import React, { useState } from 'react';
import axios from 'axios';
import { API, getAuthHeaders } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Loader2, Sparkles, BookOpen, Code } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RoadmapPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('questions'); // questions, roadmap, choice
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goals: '',
    time_availability: '',
    current_level: ''
  });
  const [roadmap, setRoadmap] = useState(null);

  const selectedTrack = localStorage.getItem('selectedTrack');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const trackNames = {
        'web-dev': 'Web Development',
        'app-dev': 'App Development',
        'ai-ml': 'AI / Machine Learning',
        'dsa-cp': 'DSA & Competitive Programming'
      };

      const response = await axios.post(
        `${API}/roadmap/generate`,
        {
          track: trackNames[selectedTrack] || selectedTrack,
          ...formData
        },
        { headers: getAuthHeaders() }
      );

      setRoadmap(response.data.content);
      setStep('choice');
      toast.success('Roadmap generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleStartLearning = () => {
    setStep('roadmap');
  };

  const handleStartProblems = () => {
    window.open('/problems', '_blank');
    toast.success('Opening problems page...');
  };

  const formatRoadmap = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('##')) {
        return (
          <h3 key={index} className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
            {line.replace('##', '').trim()}
          </h3>
        );
      } else if (line.startsWith('-')) {
        return (
          <li key={index} className="text-slate-300 ml-6 mb-2">
            {line.replace('-', '').trim()}
          </li>
        );
      } else if (line.trim()) {
        return (
          <p key={index} className="text-slate-300 mb-2">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(135deg, rgb(3,7,18) 0%, rgb(6,15,35) 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3" data-testid="roadmap-title">
            Your Personalized Roadmap
          </h1>
          <p className="text-slate-300 text-lg">{selectedTrack?.replace('-', ' ').toUpperCase()}</p>
        </div>

        {step === 'questions' && (
          <div className="glass-effect rounded-2xl p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Let's customize your learning path</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="roadmap-form">
              <div>
                <Label htmlFor="goals" className="text-slate-200 text-sm font-medium">What are your learning goals?</Label>
                <Textarea
                  id="goals"
                  data-testid="goals-input"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="mt-2 bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 min-h-[100px]"
                  placeholder="E.g., Build a portfolio website, Get a job at a tech company, Master algorithms..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="time" className="text-slate-200 text-sm font-medium">How much time can you dedicate per week?</Label>
                <Select
                  value={formData.time_availability}
                  onValueChange={(value) => setFormData({ ...formData, time_availability: value })}
                  required
                >
                  <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-700 text-white" data-testid="time-select">
                    <SelectValue placeholder="Select time commitment" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="5-10 hours">5-10 hours/week</SelectItem>
                    <SelectItem value="10-15 hours">10-15 hours/week</SelectItem>
                    <SelectItem value="15-20 hours">15-20 hours/week</SelectItem>
                    <SelectItem value="20+ hours">20+ hours/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level" className="text-slate-200 text-sm font-medium">Current skill level in this track?</Label>
                <Select
                  value={formData.current_level}
                  onValueChange={(value) => setFormData({ ...formData, current_level: value })}
                  required
                >
                  <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-700 text-white" data-testid="level-select">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="Complete Beginner">Complete Beginner</SelectItem>
                    <SelectItem value="Some basics">Some basics</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                data-testid="submit-roadmap-btn"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating your roadmap...
                  </>
                ) : (
                  'Generate My Roadmap'
                )}
              </Button>
            </form>
          </div>
        )}

        {step === 'choice' && roadmap && (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-effect rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Your Roadmap is Ready! 🎉</h2>
              <p className="text-lg text-slate-300 mb-8">Choose how you want to proceed with your learning journey</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={handleStartLearning}
                  className="glass-effect rounded-xl p-8 cursor-pointer hover-glow border-2 border-transparent hover:border-cyan-500 transition-all"
                  data-testid="start-learning-btn"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Follow Roadmap</h3>
                  <p className="text-slate-300">Learn step-by-step according to the personalized roadmap. Perfect for structured learning.</p>
                </div>

                <div 
                  onClick={handleStartProblems}
                  className="glass-effect rounded-xl p-8 cursor-pointer hover-glow border-2 border-transparent hover:border-cyan-500 transition-all"
                  data-testid="start-problems-btn"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Start Practicing</h3>
                  <p className="text-slate-300">Jump into coding problems right away. Great for hands-on learners.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'roadmap' && roadmap && (
          <div className="glass-effect rounded-2xl p-8 animate-fade-in" data-testid="roadmap-content">
            <div className="prose prose-invert max-w-none">
              {formatRoadmap(roadmap)}
            </div>

            <div className="mt-8 flex gap-4">
              <Button
                onClick={() => setStep('choice')}
                data-testid="back-to-choice-btn"
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                Back to Options
              </Button>
              <Button
                onClick={handleStartProblems}
                data-testid="goto-problems-btn"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                Start Practicing Now
              </Button>
              <Button
                onClick={() => window.close()}
                data-testid="close-btn"
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;