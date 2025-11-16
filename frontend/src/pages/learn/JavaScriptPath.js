import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CheckCircle, ChevronLeft, ChevronRight, Code, Play, Zap, BookOpen, Code2, Terminal, Lightbulb, Target, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Animation variants for framer-motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const modules = [
  {
    id: 'introduction',
    title: '🚀 Introduction to JavaScript',
    icon: <Zap className="w-5 h-5" />,
    content: (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-6"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-3">Welcome to JavaScript! 👋</h2>
          <p className="text-lg opacity-90">
            JavaScript powers the interactive web. Let's learn how to make websites come alive!
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-500" />
            What is JavaScript?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            JavaScript is a <span className="font-semibold text-blue-500">high-level</span>, <span className="font-semibold text-purple-500">interpreted</span> programming language that brings interactivity to websites. 
            It's the magic behind dynamic content, animations, and much more on the modern web.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg my-4 overflow-x-auto border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400">script.js</span>
              <button className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                Run Code
              </button>
            </div>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>
{`// Your first JavaScript program
console.log("Hello, World!");

// Try changing the message below
const message = "I'm learning JavaScript!";
console.log(message);`}
              </code>
            </pre>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 my-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">💡 Did You Know?</h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              JavaScript was created in just 10 days by Brendan Eich in 1995 and has since become one of the most popular programming languages in the world!
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learning Path
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-indigo-600 dark:text-indigo-300">
              <li>• Basic Syntax & Variables</li>
              <li>• Functions & Scope</li>
              <li>• DOM Manipulation</li>
              <li>• Async JavaScript</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-100 dark:border-green-800">
            <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
              <Award className="w-4 h-4" />
              By the end of this module
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-green-600 dark:text-green-300">
              <li>• Understand JavaScript's role in web development</li>
              <li>• Write your first JavaScript program</li>
              <li>• Use the browser console</li>
            </ul>
          </div>
        </div>
      </motion.div>
    ),
    completed: false,
    exercises: [
      {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["variable x = 5", "var x = 5", "x = 5", "let x = 5"],
        answer: 3,
        explanation: "While 'var' can be used, 'let' is the modern way to declare variables in JavaScript as it has block scope.",
        codeExample: "// Using let (recommended)\nlet count = 10;\n\n// Using var (older approach, avoid in new code)\nvar total = 100;"
      },
      {
        question: "How do you write a single-line comment in JavaScript?",
        options: ["<!-- Comment -->", "// Comment", "# Comment", "/* Comment */"],
        answer: 1,
        explanation: "Single-line comments in JavaScript start with //. Multi-line comments use /* */.",
        codeExample: "// This is a single-line comment\nlet name = 'John';  // This is also a comment"
      }
    ]
  },
  {
    id: 'syntax',
    title: 'JavaScript Syntax & Basics',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Basic Syntax</h2>
        <p className="mb-4">
          JavaScript syntax is the set of rules for writing JavaScript programs.
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Variables & Constants</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// Variables
let name = 'John';
let age = 25;

// Constants
const PI = 3.14;
const API_KEY = 'abc123';`}
              </code>
            </pre>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Functions</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// Function Declaration
function greet(name) {
  return 'Hello, ' + name;
}

// Arrow Function
const add = (a, b) => a + b;

// Immediately Invoked Function Expression (IIFE)
(function() {
  console.log('IIFE executed!');
})();`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    ),
    completed: false,
    exercises: [
      {
        question: "What will be the output of: console.log(typeof null);",
        options: ["null", "object", "undefined", "string"],
        answer: 1,
        explanation: "In JavaScript, typeof null returns 'object' which is a known bug in the language."
      }
    ]
  },
  {
    id: 'es6',
    title: 'Modern JavaScript (ES6+)',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">ES6+ Features</h2>
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Destructuring</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// Object Destructuring
const user = { name: 'John', age: 30 };
const { name, age } = user;

// Array Destructuring
const numbers = [1, 2, 3];
const [first, second] = numbers;`}
              </code>
            </pre>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Spread & Rest</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Rest Parameter
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    ),
    completed: false,
    exercises: [
      {
        question: "What will be the output of: const [a, ,b] = [1, 2, 3]; console.log(a, b);",
        options: ["1 2", "1 3", "2 3", "Error"],
        answer: 1,
        explanation: "The comma skips the second element, so a=1 and b=3."
      }
    ]
  },
  {
    id: 'dom',
    title: 'DOM Manipulation',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Working with the DOM</h2>
        <p className="mb-4">
          The Document Object Model (DOM) is a programming interface for HTML and XML documents.
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Selecting Elements</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// Single element
const el = document.getElementById('myId');
const el2 = document.querySelector('.myClass');

// Multiple elements
const elements = document.getElementsByClassName('item');
const elements2 = document.querySelectorAll('div.highlight');`}
              </code>
            </pre>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Event Listeners</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// Add event listener
button.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Button clicked!');
});

// Event delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('button.action')) {
    console.log('Action button clicked!');
  }
});`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    ),
    completed: false,
    exercises: [
      {
        question: "What does DOM stand for?",
        options: [
          "Document Object Model",
          "Data Object Model",
          "Document Order Model",
          "Dynamic Object Management"
        ],
        answer: 0,
        explanation: "DOM stands for Document Object Model, which represents the page as nodes and objects."
      }
    ]
  },
  {
    id: 'async',
    title: 'Asynchronous JavaScript',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Async/Await & Promises</h2>
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Promises</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Async operation
    const success = true;
    if (success) {
      resolve('Data fetched');
    } else {
      reject('Error fetching data');
    }
  });
};

// Using Promises
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));`}
              </code>
            </pre>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Async/Await</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// Using async/await
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Parallel requests with Promise.all
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(res => res.json()),
    fetch('/api/posts').then(res => res.json())
  ]);
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    ),
    completed: false,
    exercises: [
      {
        question: "What will be logged first: 'First' or 'Second'?",
        codeSnippet: "console.log('First');\nsetTimeout(() => console.log('Second'), 0);\nconsole.log('Third');",
        options: ["First", "Second", "Third", "None of the above"],
        answer: 0,
        explanation: "Due to the event loop, 'First' and 'Third' will be logged before 'Second', even though the timeout is 0ms."
      }
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">OOP in JavaScript</h2>
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Classes</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code className="whitespace-pre">
{`class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, my name is \${this.name}\`;
  }

  // Static method
  static info() {
    return 'This is a Person class';
  }
}

const john = new Person('John', 30);`}
              </code>
            </pre>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Inheritance</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    return \`\${this.name} is studying\`;
  }

  // Method Overriding
  greet() {
    return \`\${super.greet()} and I'm a student\`;
  }
}

const alice = new Student('Alice', 20, 'A');`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    ),
    completed: false,
    exercises: [
      {
        question: "What is the output of: console.log(typeof Person);",
        codeSnippet: "class Person {}",
        options: ["class", "function", "object", "undefined"],
        answer: 1,
        explanation: "In JavaScript, classes are syntactic sugar over constructor functions, so typeof Person is 'function'."
      }
    ]
  },
  {
    id: 'modules',
    title: 'Modules & Tooling',
    content: (
      <div className="space-y-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <h3 className="font-semibold text-lg mb-2">Exporting</h3>
          <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
            <code>{`// math.js
// Named exports
export const PI = 3.14159;
export function square(x) {
  return x * x;
}

// Default export
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}`}
            </code>
          </pre>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <h3 className="font-semibold text-lg mb-2">Importing</h3>
          <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
            <code>{`// app.js
import { PI, square } from './math.js';
import Calculator from './math.js';

console.log(PI); // 3.14159
console.log(square(4)); // 16

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8`}
            </code>
          </pre>
        </div>
      </div>
    ),
    completed: false,
    exercises: [
      {
        question: "How do you import a default export?",
        options: [
          "import { myFunc } from './module';",
          "import myFunc from './module';",
          "import * as myFunc from './module';",
          "import default myFunc from './module';"
        ],
        answer: 1,
        explanation: "Default exports are imported without curly braces. The correct syntax is 'import myFunc from './module';'"
      }
    ]
  },
  {
    id: 'testing',
    title: 'Testing JavaScript',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Testing with Jest</h2>
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Test Structure</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('sum function', () => {
  it('works with positive numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  it('works with zero', () => {
    expect(sum(0, 5)).toBe(5);
  });
});`}
              </code>
            </pre>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <h3 className="font-semibold text-lg mb-2">Mocks & Spies</h3>
            <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
              <code>{
`// userService.js
class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  
  getUser(id) {
    return this.apiClient.get(`/users/${id}`);
  }
}

// userService.test.js
describe('UserService', () => {
  it('calls the API with correct URL', async () => {
    const mockApiClient = {
      get: jest.fn().mockResolvedValue({ id: 1, name: 'John' })
    };
    
    const userService = new UserService(mockApiClient);
    await userService.getUser(1);
    
    expect(mockApiClient.get).toHaveBeenCalledWith('/users/1');
  });
});`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    ),
    completed: false,
    exercises: [
      {
        question: "What does the following test check?",
        codeSnippet: "test('user is created', () => {\n  const user = { id: 1, name: 'John' };\n  expect(user).toHaveProperty('name');\n  expect(user.name).toBe('John');\n});",
        options: [
          "If user is an object",
          "If user has a name property with value 'John'",
          "If user has an id property",
          "If user is defined"
        ],
        answer: 1,
        explanation: "The test checks if the user object has a 'name' property with the value 'John'."
      }
    ]
  },
  {
    id: 'project',
    title: 'Build a Complete App',
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Task Manager App</h2>
        <p className="mb-4">
          Let's build a complete task manager application using modern JavaScript.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <h3 className="font-semibold text-lg mb-2">Features to Implement:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Add new tasks with title and description</li>
            <li>Mark tasks as complete/incomplete</li>
            <li>Filter tasks by status (all/active/completed)</li>
            <li>Delete tasks</li>
            <li>Persist data using localStorage</li>
          </ul>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <h3 className="font-semibold text-lg mb-2">Project Structure:</h3>
          <pre className="text-gray-800 dark:text-green-400 font-mono text-sm">
            <code>{
`/task-manager
  /src
    /js
      app.js        # Main application logic
      task.js       # Task class
      storage.js    # localStorage wrapper
    /css
      styles.css    # Styling
    index.html      # HTML structure`}
            </code>
          </pre>
        </div>
        
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
          <h3 className="font-semibold text-lg mb-2 text-blue-300">Challenge:</h3>
          <p className="mb-3">
            Try implementing this project on your own! Start with the basic structure and add features one by one.
          </p>
          <p className="text-sm text-blue-200">
            Tip: Break down the problem into smaller, manageable pieces and test each part as you go.
          </p>
        </div>
      </div>
    ),
    completed: false,
    exercises: [
      {
        question: "What's the first step you would take to start this project?",
        options: [
          "Write all the HTML first",
          "Plan the data structure and state management",
          "Start with CSS styling",
          "Implement the most complex feature first"
        ],
        answer: 1,
        explanation: "It's best to start by planning your data structure and state management before writing any code. This helps create a solid foundation for your application."
      }
    ]
  }
];

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const JavaScriptPath = () => {
  const navigate = useNavigate();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState({});
  const [showExercise, setShowExercise] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const codeRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [codeOutput, setCodeOutput] = useState('');

  const currentModule = modules[currentModuleIndex];

  // Calculate progress
  useEffect(() => {
    const completedCount = Object.values(completedModules).filter(Boolean).length;
    const totalModules = modules.length;
    setProgress(Math.round((completedCount / totalModules) * 100));
  }, [completedModules]);

  // Run code in a safe way
  const runCode = (code) => {
    try {
      // Create a safe context for evaluation
      const originalConsoleLog = console.log;
      let output = '';
      
      // Override console.log to capture output
      console.log = (...args) => {
        output += args.join(' ') + '\n';
      };
      
      // Execute the code
      new Function(code)();
      
      // Restore original console.log
      console.log = originalConsoleLog;
      
      return output || 'Code executed successfully!';
    } catch (error) {
      return `Error: ${error.message}`;
    }
  };
  
  // Handle running example code
  const handleRunCode = (code) => {
    const result = runCode(code);
    setCodeOutput(result);
  };

  const nextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const prevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const toggleComplete = () => {
    setCompletedModules(prev => ({
      ...prev,
      [currentModule.id]: !prev[currentModule.id]
    }));
  };

  // Get module icon based on module id
  const getModuleIcon = (moduleId) => {
    const icons = {
      'introduction': <BookOpen className="w-4 h-4" />,
      'syntax': <Code2 className="w-4 h-4" />,
      'functions': <Zap className="w-4 h-4" />,
      'objects': <Code2 className="w-4 h-4" />,
      'es6': <Zap className="w-4 h-4 text-yellow-500" />,
      'async': <Zap className="w-4 h-4 text-blue-500" />,
      'dom': <Terminal className="w-4 h-4" />,
      'modules': <Code2 className="w-4 h-4 text-purple-500" />,
      'testing': <Target className="w-4 h-4" />,
      'project': <Award className="w-4 h-4" />
    };
    return icons[moduleId] || <Code2 className="w-4 h-4" />;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -256 }}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 shadow-2xl z-50 md:relative md:translate-x-0"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Code2 className="w-6 h-6 mr-2 text-yellow-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
              JavaScript Journey
            </span>
          </h2>
          <p className="text-sm text-blue-100 mt-1">Master modern JavaScript</p>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-blue-100">Progress</span>
              <span className="text-xs font-medium text-yellow-300">{progress}%</span>
            </div>
            <div className="w-full bg-blue-700/50 rounded-full h-2">
              <motion.div 
                className="bg-yellow-400 h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
        
        <div className="p-2 overflow-y-auto h-[calc(100vh-180px)]">
          <nav className="space-y-1 px-2">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                <button
                  onClick={() => {
                    setCurrentModuleIndex(index);
                    setIsSidebarOpen(false);
                  }}
                  onMouseEnter={() => setIsHovered(module.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentModuleIndex === index
                      ? 'bg-white/10 text-white shadow-lg transform -translate-x-1'
                      : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="mr-3">
                    {getModuleIcon(module.id)}
                  </span>
                  <span className="truncate">{module.title}</span>
                  {completedModules[module.id] ? (
                    <CheckCircle className="ml-auto w-4 h-4 text-green-400" />
                  ) : (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white/20"></div>
                  )}
                  
                  {isHovered === module.id && (
                    <motion.span 
                      className="absolute left-0 top-0 w-1 h-full bg-yellow-400 rounded-r"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Top Navigation */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 mr-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {currentModuleIndex + 1}
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  {currentModule.title}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Module {currentModuleIndex + 1} of {modules.length}
                </span>
              </div>
              
              <button
                onClick={toggleComplete}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  completedModules[currentModule.id]
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:shadow-lg transform hover:-translate-y-0.5'
                    : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:shadow-md border border-gray-200 dark:border-gray-600 transform hover:-translate-y-0.5'
                }`}
              >
                {completedModules[currentModule.id] ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Completed
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />
                    Mark Complete
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="px-4 pb-3">
            <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2">
              <motion.div 
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentModuleIndex + 1) / modules.length) * 100}%` }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentModuleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              >
                {/* Module Content */}
                <div className="p-6 md:p-8">
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="prose dark:prose-invert max-w-none"
                  >
                    {React.cloneElement(currentModule.content, { handleRunCode })}
                  </motion.div>
                </div>
                
                {/* Code Output Panel */}
                {codeOutput && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="bg-gray-900/95 text-green-400 p-4 font-mono text-sm overflow-x-auto border-t border-gray-800"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-3 text-gray-400 text-xs font-mono">Output</span>
                      </div>
                      <button 
                        onClick={() => setCodeOutput('')}
                        className="text-gray-500 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-sm">{codeOutput}</pre>
                  </motion.div>
                )}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ x: -2 }}
                    onClick={prevModule}
                    disabled={currentModuleIndex === 0}
                    className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      currentModuleIndex === 0
                        ? 'bg-gray-100 text-gray-400 dark:bg-gray-800/50 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-white text-gray-700 dark:bg-gray-700/50 dark:text-gray-200 hover:shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/70'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1.5" />
                    Previous
                  </motion.button>
                  
                  <div className="flex items-center space-x-3">
                    {currentModule.exercises && currentModule.exercises.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowExercise(true)}
                        className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                      >
                        <Zap className="w-4 h-4 mr-1.5" />
                        Practice Exercise
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ x: 2 }}
                      onClick={nextModule}
                      disabled={currentModuleIndex === modules.length - 1}
                      className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        currentModuleIndex === modules.length - 1
                          ? 'bg-gray-100 text-gray-400 dark:bg-gray-800/50 dark:text-gray-600 cursor-not-allowed'
                          : 'bg-white text-gray-700 dark:bg-gray-700/50 dark:text-gray-200 hover:shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/70'
                      }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1.5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
              {/* Navigation Buttons */}
              <div className="flex justify-between w-full mt-8">
                <Button 
                  onClick={prevModule}
                  disabled={currentModuleIndex === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-4">
                  <Button 
                    variant={completedModules[currentModule.id] ? "default" : "outline"}
                    onClick={toggleComplete}
                    className="flex items-center gap-2"
                  >
                    {completedModules[currentModule.id] ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Completed
                  </>
                ) : (
                  "Mark as Complete"
                )}
              </Button>
              
              <Button 
                onClick={nextModule}
                disabled={currentModuleIndex === modules.length - 1}
                className="flex items-center gap-2"
              >
                {currentModuleIndex === modules.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptPath;
