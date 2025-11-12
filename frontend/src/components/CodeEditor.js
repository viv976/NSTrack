import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from './ui/button';
import { Play, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const CodeEditor = ({ language, problem, onSubmit }) => {
  const [code, setCode] = useState(getStarterCode(language));
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  function getStarterCode(lang) {
    const starters = {
      python: '# Write your solution here\ndef solution():\n    pass\n\n# Test your code\nsolution()',
      javascript: '// Write your solution here\nfunction solution() {\n    // Your code\n}\n\n// Test your code\nsolution();',
      java: 'public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}'
    };
    return starters[lang] || starters.python;
  }

  const getLanguageMode = (lang) => {
    const modes = {
      python: 'python',
      javascript: 'javascript',
      java: 'java',
      cpp: 'cpp'
    };
    return modes[lang] || 'python';
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput('✓ Code executed successfully!\n\nNote: This is a simulation. In a real environment, your code would be executed on a secure server.');
      setIsRunning(false);
      toast.success('Code executed!');
    }, 1500);
  };

  const handleReset = () => {
    setCode(getStarterCode(language));
    setOutput('');
    toast.info('Code reset to starter template');
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(code);
      toast.success('Solution submitted!');
    }
  };

  return (
    <div className="space-y-4" data-testid="code-editor">
      <div className="glass-effect rounded-xl overflow-hidden border border-cyan-500/20">
        <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-slate-300 text-sm font-medium">
              {language.toUpperCase()} Editor
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="text-slate-300 hover:text-cyan-400"
              data-testid="reset-code-btn"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="run-code-btn"
            >
              <Play className="w-4 h-4 mr-1" />
              {isRunning ? 'Running...' : 'Run'}
            </Button>
          </div>
        </div>
        
        <Editor
          height="400px"
          language={getLanguageMode(language)}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on'
          }}
        />
      </div>

      {output && (
        <div className="glass-effect rounded-xl p-4 border border-slate-700" data-testid="code-output">
          <div className="flex items-center gap-2 mb-2">
            {output.includes('✓') ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            )}
            <span className="text-slate-200 font-semibold">Output:</span>
          </div>
          <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">{output}</pre>
        </div>
      )}

      {onSubmit && (
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            data-testid="submit-solution-btn"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Submit Solution
          </Button>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;