import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { BookOpen, Code2, CheckCircle2, Circle, Lock, Trophy, Play, X, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useProgress } from '../context/ProgressContext';
import { languageRoadmaps } from '../data/languageContent';
import CodeEditor from '../components/CodeEditor';
import MCQQuestion from '../components/MCQQuestion';
import MiniCodingQuestion from '../components/MiniCodingQuestion';
import { practiceQuestions } from '../data/practiceQuestions';

const LanguagePage = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [showPractice, setShowPractice] = useState({});
  const [completedPractice, setCompletedPractice] = useState({});
  const { progress, markTopicComplete, getTopicProgress, resetLanguageProgress } = useProgress();

  const roadmap = languageRoadmaps[lang];
  // practice questions removed from roadmap sections
  const completedTopics = progress.completedTopics[lang] || {};
  const totalTopics = roadmap?.sections.reduce((acc, section) => acc + section.topics.length, 0) || 0;
  const completedCount = Object.keys(completedTopics).length;
  const progressPercent = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;

  const isTopicCompleted = (sectionId, topicIndex) => {
    return completedTopics[`${sectionId}-${topicIndex}`] === true;
  };

  const isSectionCompleted = (sectionId) => {
    const section = roadmap.sections.find(s => s.id === sectionId);
    if (!section) return false;

    return section.topics.every((_, index) => isTopicCompleted(sectionId, index));
  };

  const isTopicLocked = (sectionIndex, topicIndex) => {
    // First topic is always unlocked
    if (sectionIndex === 0 && topicIndex === 0) return false;

    // Check if previous topic is completed
    if (topicIndex > 0) {
      const prevTopicId = `${roadmap.sections[sectionIndex].id}-${topicIndex - 1}`;
      return !completedTopics[prevTopicId];
    }

    // Check if previous section's last topic is completed
    if (sectionIndex > 0) {
      const prevSection = roadmap.sections[sectionIndex - 1];
      const lastTopicId = `${prevSection.id}-${prevSection.topics.length - 1}`;
      return !completedTopics[lastTopicId];
    }

    return false;
  };

  const handlePracticeComplete = (sectionId, type, index) => {
    const key = `${sectionId}-${type}-${index}`;
    setCompletedPractice(prev => ({ ...prev, [key]: true }));
  };

  const isPracticeCompleted = (sectionId, type, index) => {
    return completedPractice[`${sectionId}-${type}-${index}`] === true;
  };

  const handleTopicComplete = (sectionId, topicIndex) => {
    markTopicComplete(lang, `${sectionId}-${topicIndex}`);
    toast.success('Topic completed! 🎉', {
      description: '+15 progress points'
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[difficulty] || 'bg-slate-500/20 text-slate-400';
  };

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgb(3,7,18) 0%, rgb(6,15,35) 100%)' }}>
        <div className="text-slate-400 text-xl">Language not found</div>
      </div>
    );
  }

  // Close handler: try to go back in history; if no history, go to dashboard
  const handleClose = () => {
    try {
      // If there is history to go back to, navigate back
      if (window.history && window.history.length > 1) {
        navigate(-1);
        return;
      }
    } catch (e) {
      // ignore and fallback
    }
    // fallback route (dashboard is a safe internal route)
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 pb-32 flex-1">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <Code2 className="w-12 h-12 text-cyan-400" />
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" data-testid="language-title">
                  {roadmap.title}
                </h1>
              </div>
              <p className="text-lg text-slate-300">{roadmap.description}</p>
            </div>
            <div className="glass-effect rounded-xl p-6 text-center min-w-[200px]">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white mb-1">{Math.round(progressPercent)}%</p>
              <p className="text-sm text-slate-400">Complete</p>
              <Progress value={progressPercent} className="h-2 mt-3" />
              <p className="text-xs text-slate-500 mt-2">{completedCount} / {totalTopics} topics</p>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="space-y-8">
          {roadmap.sections.map((section, sectionIndex) => (
            <div key={section.id} className="glass-effect rounded-2xl p-8" data-testid={`section-${section.id}`}>
              {/* Section Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <Badge className="mb-3 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {section.phase}
                    </Badge>
                    <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                  </div>
                  <div className="text-right">
                    <Badge className={getDifficultyColor(section.difficulty)}>
                      {section.difficulty}
                    </Badge>
                    <p className="text-slate-400 text-sm mt-2">⏱️ {section.duration}</p>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-4 mb-8">
                {section.topics.map((topic, topicIndex) => {
                  const topicId = `${section.id}-${topicIndex}`;
                  const isCompleted = isTopicCompleted(section.id, topicIndex);
                  const isLocked = isTopicLocked(sectionIndex, topicIndex);

                  return (
                    <div
                      key={topicIndex}
                      className={`border rounded-xl overflow-hidden transition-all ${isLocked
                          ? 'border-slate-700 bg-slate-900/30 opacity-60'
                          : isCompleted
                            ? 'border-green-500/30 bg-green-500/5'
                            : 'border-cyan-500/30 bg-slate-800/30'
                        }`}
                      data-testid={`topic-${topicId}`}
                    >
                      <Accordion type="single" collapsible>
                        <AccordionItem value={topicId} className="border-none">
                          <AccordionTrigger
                            className="px-6 py-4 hover:no-underline hover:bg-slate-700/20 transition-colors"
                            disabled={isLocked}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex-shrink-0">
                                {isLocked ? (
                                  <Lock className="w-6 h-6 text-slate-500" />
                                ) : isCompleted ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                                ) : (
                                  <Circle className="w-6 h-6 text-cyan-400" />
                                )}
                              </div>
                              <div className="text-left flex-1">
                                <h3 className="text-lg font-semibold text-white">{topic.name}</h3>
                                {isLocked && (
                                  <p className="text-sm text-slate-500">Complete previous topics to unlock</p>
                                )}
                              </div>
                            </div>
                          </AccordionTrigger>

                          {!isLocked && (
                            <AccordionContent className="px-6 py-6 bg-slate-900/30">
                              {/* Content */}
                              <div className="prose prose-invert max-w-none mb-6">
                                <div className="text-slate-300 text-base leading-7 mb-6 space-y-3">
                                  {topic.content}
                                </div>

                                {/* Code Example */}
                                {topic.example && (
                                  <div className="code-block mb-6">
                                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                                      <Code2 className="w-4 h-4" />
                                      <span className="text-sm font-semibold">Example Code:</span>
                                    </div>
                                    <pre className="text-sm text-slate-300 overflow-x-auto">
                                      <code>{topic.example}</code>
                                    </pre>
                                  </div>
                                )}
                              </div>

                              {/* Complete Button */}
                              {!isCompleted && (
                                <div className="flex justify-end">
                                  <Button
                                    onClick={() => handleTopicComplete(section.id, topicIndex)}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                                    data-testid={`complete-topic-${topicId}`}
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Mark as Complete
                                  </Button>
                                </div>
                              )}

                              {isCompleted && (
                                <div className="flex items-center justify-center gap-2 text-green-400 py-4">
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span className="font-semibold">Topic Completed!</span>
                                </div>
                              )}
                            </AccordionContent>
                          )}
                        </AccordionItem>
                      </Accordion>
                    </div>
                  );
                })}
              </div>

              {/* Practice questions for Phase 1: show a small set after the section is completed */}
              {isSectionCompleted(section.id) && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-lg font-semibold text-white">Practice: Full Set (MCQs + Coding)</h4>

                  {/* MCQs displayed in a responsive 2-column grid (2 by 2 feel) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {practiceQuestions[lang] && practiceQuestions[lang][section.id]?.mcqs?.map((q, idx) => (
                      <MCQQuestion
                        key={`mcq-${idx}`}
                        question={q.question}
                        options={q.options}
                        correctAnswer={q.correctAnswer}
                        explanation={q.explanation}
                        onComplete={() => handlePracticeComplete(section.id, 'mcq', idx)}
                      />
                    ))}
                  </div>

                  {/* Coding challenges rendered full-width so their CodeEditor can expand across the page */}
                  <div className="mt-4 space-y-6">
                    {practiceQuestions[lang] && practiceQuestions[lang][section.id]?.coding?.slice(0, 3)?.map((c, idx) => {
                      const questionText = c.question || c.title || c.prompt || '';
                      const hintText = c.hint || c.hintText || '';
                      const solutionText = c.solution || c.starter || c.answer || '';
                      const langKey = c.language || (lang === 'html_css' ? 'html' : lang) || '';
                      const expected = c.expectedOutput || c.expected_output || c.expected || '';
                      const tests = c.testCases || c.test_cases || c.tests || [];
                      return (
                        <div key={`code-full-${idx}`} className="glass-effect rounded-2xl p-6">
                          <MiniCodingQuestion
                            question={questionText}
                            hint={hintText}
                            solution={solutionText}
                            language={langKey}
                            expectedOutput={expected}
                            testCases={tests}
                            onComplete={() => handlePracticeComplete(section.id, 'coding', idx)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Practice Section Teaser */}
        {progressPercent > 20 && (
          <div className="mt-12 glass-effect rounded-2xl p-8 text-center animate-fade-in">
            <Play className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Practice?</h3>
            <p className="text-slate-300 mb-6">
              Test your knowledge with interactive coding problems!
            </p>
            <Button
              onClick={() => window.open('/problems', '_blank')}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              Start Solving Problems
            </Button>
          </div>
        )}

      </div>

      {/* Footer Buttons - At the end of content */}
      <div className="w-full bg-gray-800 border-t border-gray-700 p-4 flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={handleClose}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Close
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate('/problems')}
          className="flex items-center gap-2"
        >
          Problems
        </Button>
        <Button
          variant="default"
          onClick={() => {
            // Reset progress for the current language
            resetLanguageProgress(lang);

            // Force a re-render by updating state
            setActiveSection(null);
            setShowPractice({});

            // Show a success message
            toast.success('Progress has been reset. Starting fresh!');

            // Scroll to top after a small delay to ensure state updates are processed
            setTimeout(() => {
              window.scrollTo(0, 0);
              // Force a re-render of the component to reflect the reset progress
              setActiveSection(prev => null);
            }, 100);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Restart Learning
        </Button>
      </div>

    </div>
  );
};

export default LanguagePage;