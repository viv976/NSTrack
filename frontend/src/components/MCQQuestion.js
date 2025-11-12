import React, { useState } from 'react';
import { Button } from './ui/button';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

const MCQQuestion = ({ question, options, correctAnswer, explanation, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer');
      return;
    }

    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      toast.success('Correct! 🎉');
      if (onComplete) {
        setTimeout(() => onComplete(), 1000);
      }
    } else {
      toast.error('Incorrect. Try again!');
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="glass-effect rounded-xl p-6 border border-cyan-500/20" data-testid="mcq-question">
      <div className="flex items-start gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <p className="text-lg text-white font-medium">{question}</p>
      </div>

      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === correctAnswer;
          
          let bgColor = 'bg-slate-800/30 border-slate-700';
          let hoverColor = 'hover:bg-slate-700/30';
          
          if (showResult) {
            if (isCorrectOption) {
              bgColor = 'bg-green-500/20 border-green-500/50';
              hoverColor = '';
            } else if (isSelected && !isCorrect) {
              bgColor = 'bg-red-500/20 border-red-500/50';
              hoverColor = '';
            }
          } else if (isSelected) {
            bgColor = 'bg-cyan-500/20 border-cyan-500';
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${bgColor} ${hoverColor} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              data-testid={`mcq-option-${index}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  showResult && isCorrectOption
                    ? 'border-green-400 bg-green-500'
                    : showResult && isSelected && !isCorrect
                    ? 'border-red-400 bg-red-500'
                    : isSelected
                    ? 'border-cyan-400 bg-cyan-500'
                    : 'border-slate-500'
                }`}>
                  {showResult && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-white" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                </div>
                <span className="text-slate-200">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && explanation && (
        <div className={`p-4 rounded-lg mb-4 ${
          isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-blue-500/10 border border-blue-500/30'
        }`}>
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-white">Explanation: </span>
            {explanation}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            data-testid="submit-mcq-btn"
          >
            Submit Answer
          </Button>
        ) : (
          !isCorrect && (
            <Button
              onClick={handleRetry}
              variant="outline"
              className="border-cyan-500 text-cyan-400"
              data-testid="retry-mcq-btn"
            >
              Try Again
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default MCQQuestion;