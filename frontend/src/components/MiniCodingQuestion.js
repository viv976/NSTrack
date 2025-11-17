import React, { useState } from 'react';
import { Button } from './ui/button';
import { Code, CheckCircle2, Lightbulb, Eye, EyeOff } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { toast } from 'sonner';

const MiniCodingQuestion = ({ question, hint, solution, language, expectedOutput, testCases, onComplete }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (code) => {
    setCompleted(true);
    toast.success('Solution submitted! 🎉');
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6 border border-purple-500/20" data-testid="mini-coding-question">
      <div className="flex items-start gap-3 mb-4">
        <Code className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-2">Coding Challenge</h4>
          <p className="text-slate-300">{question}</p>
        </div>
      </div>

      {!showEditor && !completed && (
        <Button
          onClick={() => setShowEditor(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          data-testid="open-mini-editor-btn"
        >
          <Code className="w-4 h-4 mr-2" />
          Start Coding
        </Button>
      )}

      {showEditor && !completed && (
        <div className="space-y-4 mt-4">
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowHint(!showHint)}
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
              data-testid="toggle-hint-btn"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSolution(!showSolution)}
              className="border-green-500 text-green-400 hover:bg-green-500/10"
              data-testid="toggle-solution-btn"
            >
              {showSolution ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showSolution ? 'Hide Solution' : 'View Solution'}
            </Button>
          </div>

          {showHint && (
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-yellow-400">Hint: </span>
                {hint}
              </p>
            </div>
          )}

          {showSolution && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-semibold text-green-400 mb-2">Solution:</p>
              <pre className="text-sm text-slate-300 overflow-x-auto code-block">
                <code>{solution}</code>
              </pre>
            </div>
          )}

          <CodeEditor
            language={language}
            problem={{
              expectedOutput,
              testCases
            }}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {completed && (
        <div className="flex items-center gap-2 text-green-400 py-4 border-t border-slate-700 mt-4">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold">Challenge Completed!</span>
        </div>
      )}
    </div>
  );
};

export default MiniCodingQuestion;