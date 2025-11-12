import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('learningProgress');
    return saved ? JSON.parse(saved) : {
      completedTopics: {},
      completedProblems: {},
      streak: 0,
      lastActiveDate: null,
      selectedLanguage: null,
      roadmapProgress: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  const markTopicComplete = (language, topicId) => {
    setProgress(prev => ({
      ...prev,
      completedTopics: {
        ...prev.completedTopics,
        [language]: {
          ...(prev.completedTopics[language] || {}),
          [topicId]: true
        }
      }
    }));
  };

  const markProblemComplete = (language, topicId, problemId) => {
    setProgress(prev => ({
      ...prev,
      completedProblems: {
        ...prev.completedProblems,
        [`${language}-${topicId}-${problemId}`]: true
      }
    }));
  };

  const setSelectedLanguage = (language) => {
    setProgress(prev => ({ ...prev, selectedLanguage: language }));
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (progress.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (progress.lastActiveDate === yesterday.toDateString()) {
        setProgress(prev => ({
          ...prev,
          streak: prev.streak + 1,
          lastActiveDate: today
        }));
      } else {
        setProgress(prev => ({
          ...prev,
          streak: 1,
          lastActiveDate: today
        }));
      }
    }
  };

  const getTopicProgress = (language) => {
    const completed = Object.keys(progress.completedTopics[language] || {}).length;
    return completed;
  };

  const getProblemsSolved = () => {
    return Object.keys(progress.completedProblems).length;
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      markTopicComplete,
      markProblemComplete,
      setSelectedLanguage,
      updateStreak,
      getTopicProgress,
      getProblemsSolved
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};