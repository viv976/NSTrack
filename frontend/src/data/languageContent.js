// Comprehensive language learning content organized for easy consumption

export const languageRoadmaps = {
  python: {
    title: 'Python Complete Learning Path',
    description: 'Master Python from basics to advanced concepts with practical examples',
    sections: [
      {
        id: 'intro',
        phase: 'Phase 1: Foundations',
        title: '1. Introduction & Setup',
        duration: '1-2 days',
        difficulty: 'Beginner',
        topics: [
          {
            name: 'Why Python & Use-cases',
            content: `High-level, readable language used in web, data science, automation and AI. Fast to prototype and has a rich ecosystem.`,
            example: `print("Hello, Python!")`
          },
          {
            name: 'Install & Virtual Envs',
            content: `Install Python 3.11+, use venv or pipenv/poetry for reproducible environments.`,
            example: `python -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt`
          }
        ]
      },
      {
        id: 'basics',
        phase: 'Phase 1: Foundations',
        title: '2. Syntax, Types & Control Flow',
        duration: '3-5 days',
        difficulty: 'Beginner',
        topics: [
          { name: 'Variables & Types', content: 'int, float, str, bool, list, tuple, dict, set', example: `a = 10\nname = "Alice"` },
          { name: 'If / Loops / Comprehensions', content: 'Control flow and comprehension patterns', example: `for i in range(5): print(i)` }
        ]
      },
      {
        id: 'functions',
        phase: 'Phase 2: Core',
        title: '3. Functions & Modules',
        duration: '3-4 days',
        difficulty: 'Intermediate',
        topics: [
          { name: 'Defining functions', content: 'parameters, return values, *args/**kwargs', example: `def add(a,b=0): return a+b` },
          { name: 'Modules & Packages', content: 'Organize code into modules, __main__ pattern, packaging basics', example: `from mypkg.utils import helper` }
        ]
      },
      {
        id: 'libs',
        phase: 'Phase 3: Ecosystem',
        title: '4. Standard Library & Popular Packages',
        duration: '4-7 days',
        difficulty: 'Intermediate',
        topics: [
          { name: 'Stdlib highlights', content: 'json, csv, logging, datetime, collections, itertools', example: `import json\njson.dumps({"a":1})` },
          { name: 'Data & HTTP', content: 'requests, pandas, aiohttp', example: `import requests\nrequests.get('https://api.example')` }
        ]
      },
      {
        id: 'oop',
        phase: 'Phase 3: Applied',
        title: '5. OOP, Design & Patterns',
        duration: '4-6 days',
        difficulty: 'Intermediate',
        topics: [
          { name: 'Classes & Inheritance', content: 'Design classes, properties, dunder methods', example: `class User: pass` },
          { name: 'Design Patterns', content: 'Strategy, Factory, Adapter (practical use)', example: `// see pattern examples` }
        ]
      },
      {
        id: 'async',
        phase: 'Phase 4: Advanced',
        title: '6. Async, Web & Services',
        duration: '5-8 days',
        difficulty: 'Advanced',
        topics: [
          { name: 'asyncio & concurrency', content: 'async/await, event loop, when to use threads vs processes', example: `asyncio.run(main())` },
          { name: 'Web frameworks', content: 'Flask, FastAPI, Django basics and building APIs', example: `from fastapi import FastAPI` }
        ]
      },
      {
        id: 'testing',
        phase: 'Phase 4: Quality',
        title: '7. Testing, Packaging & Best Practices',
        duration: '3-6 days',
        difficulty: 'Advanced',
        topics: [
          { name: 'pytest & mocks', content: 'Unit tests, fixtures and mocking', example: `def test_add(): assert add(2,3)==5` },
          { name: 'Packaging', content: 'venv, wheel, poetry, publishing', example: `python -m pip wheel .` }
        ]
      }
    ]
  },

  java: {
    title: 'Java Complete Learning Path',
    description: 'From Java basics to backend development and concurrent systems on the JVM',
    sections: [
      {
        id: 'intro',
        phase: 'Phase 1: Foundations',
        title: '1. Java & JVM Basics',
        duration: '2-3 days',
        difficulty: 'Beginner',
        topics: [
          { name: 'JVM overview', content: 'JVM, JRE, JDK, bytecode', example: `// javac Hello.java\n// java Hello` },
          { name: 'Tooling', content: 'Maven, Gradle, IDEs (IntelliJ/VS Code)', example: `gradle init` }
        ]
      },
      {
        id: 'syntax',
        phase: 'Phase 1: Foundations',
        title: '2. Core Syntax & OOP',
        duration: '4-6 days',
        difficulty: 'Beginner',
        topics: [
          { name: 'Types & Control Flow', content: 'primitives, arrays, loops, conditionals', example: `int x=5; if(x>0) {}` },
          { name: 'Classes & Interfaces', content: 'classes, interfaces, inheritance, access modifiers', example: `public interface Shape { double area(); }` }
        ]
      },
      {
        id: 'collections',
        phase: 'Phase 2: Libraries',
        title: '3. Collections & Streams',
        duration: '4-6 days',
        difficulty: 'Intermediate',
        topics: [
          { name: 'Collections Framework', content: 'List, Set, Map and common algorithms', example: `Collections.sort(list)` },
          { name: 'Streams & Lambdas', content: 'Functional-style processing with streams', example: `list.stream().filter(...).collect(...)` }
        ]
      },
      {
        id: 'concurrency',
        phase: 'Phase 3: Concurrency',
        title: '4. Concurrency & JVM Internals',
        duration: '5-8 days',
        difficulty: 'Advanced',
        topics: [
          { name: 'Threads & Executors', content: 'ExecutorService, synchronization, locks', example: `ExecutorService es = Executors.newFixedThreadPool(4);` },
          { name: 'JVM tuning', content: 'GC basics, memory model, profiling', example: `-Xmx512m -Xms256m` }
        ]
      },
      {
        id: 'web',
        phase: 'Phase 4: Frameworks',
        title: '5. Spring Boot & Backend',
        duration: '6-12 days',
        difficulty: 'Advanced',
        topics: [
          { name: 'Spring Boot', content: 'Controllers, DI, REST APIs', example: `@RestController class Hello { @GetMapping("/") String hi(){return "hi";} }` }
        ]
      }
    ]
  },

  javascript: {
    title: 'JavaScript Complete Learning Path',
    description: 'Master JavaScript from basics to modern full-stack development',
    sections: [
      {
        id: 'intro',
        phase: 'Phase 1: Foundations',
        title: '1. What is JavaScript',
        duration: '1-2 days',
        difficulty: 'Beginner',
        topics: [
          { name: 'Overview', content: 'Browser language, Node.js, ecosystem (npm)', example: `console.log("Hello")` }
        ]
      },
      {
        id: 'syntax',
        phase: 'Phase 1: Foundations',
        title: '2. Syntax & Types',
        duration: '2-4 days',
        difficulty: 'Beginner',
        topics: [
          { name: 'let/const/var & primitives', content: 'number,string,boolean,null,undefined,symbol', example: `let x=1; const y="a";` },
          { name: 'Operators & equality', content: '=== vs ==, truthy/falsy', example: `x===1` }
        ]
      },
      {
        id: 'dom',
        phase: 'Phase 2: Core',
        title: '3. DOM & Browser APIs',
        duration: '3-5 days',
        difficulty: 'Intermediate',
        topics: [
          { name: 'DOM basics', content: 'querySelector, event handling, forms', example: `document.querySelector('#btn').addEventListener('click', ...)` }
        ]
      },
      {
        id: 'async',
        phase: 'Phase 2: Core',
        title: '4. Async & Networking',
        duration: '3-6 days',
        difficulty: 'Intermediate',
        topics: [
          { name: 'Promises & async/await', content: 'event-loop, fetch, axios', example: `await fetch('/api')` }
        ]
      },
      {
        id: 'tooling',
        phase: 'Phase 3: Tooling',
        title: '5. Tooling & Modern Stack',
        duration: '4-8 days',
        difficulty: 'Intermediate',
        topics: [
          { name: 'Bundlers, npm, TypeScript intro', content: 'Vite, Webpack, Rollup, and TS basics', example: `npm init` }
        ]
      },
      {
        id: 'advanced',
        phase: 'Phase 4: Advanced',
        title: '6. Frameworks & Testing',
        duration: '6-12 days',
        difficulty: 'Advanced',
        topics: [
          { name: 'React/Vue basics', content: 'components, hooks, state management', example: `function Comp(){ return <div/> }` },
          { name: 'Testing & CI', content: 'Jest, React Testing Library, Lighthouse', example: `npm run test` }
        ]
      }
    ]
  },

  cpp: {
    title: 'C++ Mastery Roadmap',
    description: 'From zero to production-ready C++ with focus on problem solving, STL, and modern idioms.',
    sections: [
      {
        id: 'intro',
        phase: 'Phase 1: Foundations',
        title: '1. Getting Started',
        duration: '2 days',
        difficulty: 'Beginner',
        topics: [
          { name: 'Why C++', content: 'Performance, systems, CP', example: `#include <iostream>` }
        ]
      },
      {
        id: 'syntax',
        phase: 'Phase 1: Core',
        title: '2. Types & Memory',
        duration: '3-4 days',
        difficulty: 'Beginner',
        topics: [
          { name: 'Primitives, pointers & refs', content: 'int,double,char, pointers, references', example: `int x=0; int* p=&x;` }
        ]
      },
      {
        id: 'stl',
        phase: 'Phase 2: Libraries',
        title: '3. STL & Algorithms',
        duration: '4-6 days',
        difficulty: 'Intermediate',
        topics: [
          { name: 'vector,map,set and algorithms', content: 'std::vector, std::map, std::sort', example: `std::sort(v.begin(), v.end())` }
        ]
      },
      {
        id: 'modern',
        phase: 'Phase 3: Modern C++',
        title: '4. Templates & Smart Pointers',
        duration: '4-7 days',
        difficulty: 'Advanced',
        topics: [
          { name: 'Templates & unique_ptr', content: 'templates, unique_ptr, shared_ptr', example: `auto p = std::make_unique<MyClass>()` }
        ]
      }
    ]
  }
};

export const practiceProblems = {
  python: {
    phase1: {
      mcq: [
        { id: 'py1-m1', question: 'Which data type is immutable in Python?', options: ['list', 'dict', 'set', 'tuple'], answer: 'tuple', explanation: 'Tuples are immutable; lists, dicts and sets are mutable.', difficulty: 'Easy' },
        { id: 'py1-m2', question: 'What is the output of: print(3 // 2)?', options: ['1', '1.5', '2', 'Error'], answer: '1', explanation: 'Floor division returns the integer quotient.', difficulty: 'Easy' },
        { id: 'py1-m3', question: 'Which statement declares a multi-line string/comment?', options: ['// comment', "'''comment'''", '/* comment */', '# comment'], answer: "'''comment'''", explanation: 'Triple quotes create multi-line strings and are commonly used for docstrings.', difficulty: 'Easy' },
        { id: 'py1-m4', question: 'How do you create a virtual environment?', options: ['python -m venv .venv', 'pip install venv', 'virtualenv create', 'py -create venv'], answer: 'python -m venv .venv', explanation: 'Use the venv module to create a virtual environment.', difficulty: 'Easy' },
        { id: 'py1-m5', question: 'What does len([1,2,3]) return?', options: ['2', '3', '0', 'Error'], answer: '3', explanation: 'len returns the number of items in a collection.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'py1-c1', title: 'Swap Two Variables', description: 'Swap values of a and b without using a temporary variable.', hint: 'Use tuple unpacking', solutionSkeleton: 'a, b = b, a', difficulty: 'Easy' },
        { id: 'py1-c2', title: 'Temperature Converter', description: 'Convert Celsius (input) to Fahrenheit and print the result.', hint: 'F = C*9/5 + 32', solutionSkeleton: 'c = float(input())\nprint((c*9/5)+32)', difficulty: 'Easy' },
        { id: 'py1-c3', title: 'Sum of List', description: 'Read n numbers and print their sum.', hint: 'Use sum() or loop accumulation', solutionSkeleton: 'nums = list(map(int, input().split()))\nprint(sum(nums))', difficulty: 'Easy' }
      ]
    },
    phase2: {
      mcq: [
        { id: 'py2-m1', question: 'How do you define a function in Python?', options: ['function foo():', 'def foo():', 'fn foo() {}', 'create foo()'], answer: 'def foo():', explanation: 'Use def keyword to define functions.', difficulty: 'Easy' },
        { id: 'py2-m2', question: 'What does *args represent?', options: ['A list', 'Variable positional args', 'A dict', 'Keyword-only args'], answer: 'Variable positional args', explanation: '*args collects extra positional arguments as a tuple.', difficulty: 'Medium' },
        { id: 'py2-m3', question: 'Which module is commonly used for HTTP requests?', options: ['http', 'requests', 'urllib3', 'fetch'], answer: 'requests', explanation: 'The requests library is a popular HTTP client.', difficulty: 'Easy' },
        { id: 'py2-m4', question: 'Pick the correct way to open a file for reading', options: ["open('file.txt','r')", "open('file.txt','w')", "file.open('file.txt')", "open('file.txt') as f"], answer: "open('file.txt','r')", explanation: 'Use mode r for reading.', difficulty: 'Easy' },
        { id: 'py2-m5', question: 'What does __name__ == "__main__" check?', options: ['If module is imported', 'If script is run directly', 'If Python version is main', 'If main function exists'], answer: 'If script is run directly', explanation: 'It allows code to run only when the script is executed as main.', difficulty: 'Medium' }
      ],
      coding: [
        { id: 'py2-c1', title: 'Implement map/filter', description: 'Given a list, return a new list with elements doubled using list comprehension.', hint: 'Use [x*2 for x in lst]', solutionSkeleton: 'lst = list(map(int, input().split()))\nres = [x*2 for x in lst]\nprint(res)', difficulty: 'Easy' },
        { id: 'py2-c2', title: 'Count Word Frequency', description: 'Read a text and output word counts.', hint: 'Use dict or collections.Counter', solutionSkeleton: 'from collections import Counter\nwords = input().split()\nprint(Counter(words))', difficulty: 'Medium' },
        { id: 'py2-c3', title: 'Implement a simple module', description: 'Create a module with a helper function and import it in main.', hint: 'Use separate .py files and import', solutionSkeleton: '# helper.py\ndef add(a,b):\n    return a+b\n# main.py\nfrom helper import add\nprint(add(1,2))', difficulty: 'Medium' }
      ]
    },
    phase3: {
      mcq: [
        { id: 'py3-m1', question: 'Which of these is async-capable web framework?', options: ['Flask', 'Django (sync)', 'FastAPI', 'Bottle'], answer: 'FastAPI', explanation: 'FastAPI supports async endpoints and ASGI.', difficulty: 'Medium' },
        { id: 'py3-m2', question: 'Which module provides ordered dict behavior?', options: ['dict', 'OrderedDict', 'collections', 'itertools'], answer: 'OrderedDict', explanation: 'OrderedDict in collections preserves insertion order (historically).', difficulty: 'Medium' },
        { id: 'py3-m3', question: 'Pick the correct use of context manager', options: ["with open('f') as f:", "open('f')", "file('f')", "using open('f')"], answer: "with open('f') as f:", explanation: 'Context managers ensure proper resource cleanup.', difficulty: 'Easy' },
        { id: 'py3-m4', question: 'Which tool is used for packaging projects?', options: ['pip', 'poetry', 'pytest', 'flake8'], answer: 'poetry', explanation: 'Poetry is used for packaging and dependency management.', difficulty: 'Medium' },
        { id: 'py3-m5', question: 'What is the purpose of __init__.py?', options: ['Run on startup', 'Mark directory as package', 'Module loader', 'Unused'], answer: 'Mark directory as package', explanation: '__init__.py makes a folder a Python package.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'py3-c1', title: 'Build a simple REST endpoint', description: 'Create a FastAPI endpoint that returns a JSON greeting.', hint: 'Use FastAPI and @app.get', solutionSkeleton: 'from fastapi import FastAPI\napp = FastAPI()\n@app.get("/")\ndef read_root():\n    return {"message": "Hello"}', difficulty: 'Medium' },
        { id: 'py3-c2', title: 'Async workers', description: 'Write an async function that fetches two URLs concurrently.', hint: 'Use asyncio.gather', solutionSkeleton: 'import asyncio\nasync def fetch(url):\n    pass\nasync def main():\n    await asyncio.gather(fetch(url1), fetch(url2))', difficulty: 'Hard' },
        { id: 'py3-c3', title: 'Data parsing', description: 'Parse a CSV and output JSON aggregation.', hint: 'Use csv and json modules', solutionSkeleton: 'import csv, json\n# read csv and aggregate then json.dumps(result)', difficulty: 'Medium' }
      ]
    },
    phase4: {
      mcq: [
        { id: 'py4-m1', question: 'Which testing library is commonly used?', options: ['unittest', 'pytest', 'nose', 'doctest'], answer: 'pytest', explanation: 'pytest is popular for its fixtures and simplicity.', difficulty: 'Medium' },
        { id: 'py4-m2', question: 'Which of these helps with type hints?', options: ['mypy', 'pylint', 'black', 'flake8'], answer: 'mypy', explanation: 'mypy performs static type checking.', difficulty: 'Medium' },
        { id: 'py4-m3', question: 'Which format is binary package distribution?', options: ['wheel', 'egg', 'tar', 'zip'], answer: 'wheel', explanation: 'Wheel (.whl) is the modern binary package format.', difficulty: 'Easy' },
        { id: 'py4-m4', question: 'What is GIL?', options: ['Global Interpreter Lock', 'Garbage Interface Layer', 'Global IO Limit', 'General Language Interface'], answer: 'Global Interpreter Lock', explanation: 'GIL prevents multiple native threads executing Python bytecode at once.', difficulty: 'Hard' },
        { id: 'py4-m5', question: 'Which command builds a wheel?', options: ['python -m pip wheel .', 'python build', 'pip install .', 'setup.py build'], answer: 'python -m pip wheel .', explanation: 'Use pip wheel to build a wheel file.', difficulty: 'Medium' }
      ],
      coding: [
        { id: 'py4-c1', title: 'Write pytest tests', description: 'Create pytest tests for a simple calculator module.', hint: 'Use assert and fixtures', solutionSkeleton: 'def test_add():\n    assert add(1,2)==3', difficulty: 'Medium' },
        { id: 'py4-c2', title: 'Package a tiny project', description: 'Create setup and build a wheel for a simple module.', hint: 'Use pyproject.toml or setup.cfg', solutionSkeleton: '# create pyproject.toml and run python -m pip wheel .', difficulty: 'Hard' },
        { id: 'py4-c3', title: 'Optimize a hotspot', description: 'Profile a function and optimize using caching or vectorized ops.', hint: 'Use cProfile or functools.lru_cache', solutionSkeleton: '# use cProfile to find slow spots and apply caching', difficulty: 'Hard' }
      ]
    }
  },

  java: {
    phase1: {
      mcq: [
        { id: 'jv1-m1', question: 'Which JVM flag sets max heap size?', options: ['-Xmx', '-Xms', '-jar', '-cp'], answer: '-Xmx', explanation: 'Use -Xmx to set the maximum heap memory.', difficulty: 'Easy' },
        { id: 'jv1-m2', question: 'Which build tool is conventionally used for Java?', options: ['npm', 'Maven', 'pip', 'cargo'], answer: 'Maven', explanation: 'Maven is a common Java build tool.', difficulty: 'Easy' },
        { id: 'jv1-m3', question: 'Which keyword declares a class?', options: ['class', 'struct', 'def', 'module'], answer: 'class', explanation: 'Java uses class to declare classes.', difficulty: 'Easy' },
        { id: 'jv1-m4', question: 'Main method signature in Java is:', options: ['public static void main(String[] args)', 'void main()', 'public main()', 'static main(String args[])'], answer: 'public static void main(String[] args)', explanation: 'Standard Java entry point signature.', difficulty: 'Easy' },
        { id: 'jv1-m5', question: 'Which type holds decimal numbers?', options: ['int', 'double', 'char', 'boolean'], answer: 'double', explanation: 'double is a floating point type.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'jv1-c1', title: 'Hello World', description: 'Print Hello World using a main method.', hint: 'Create class and main', solutionSkeleton: 'public class Hello { public static void main(String[] args){ System.out.println("Hello"); } }', difficulty: 'Easy' },
        { id: 'jv1-c2', title: 'Sum Array', description: 'Sum elements of an integer array.', hint: 'Use a loop', solutionSkeleton: 'int sum=0; for(int x: arr) sum+=x; System.out.println(sum);', difficulty: 'Easy' },
        { id: 'jv1-c3', title: 'Reverse String', description: 'Reverse a string without using StringBuilder.reverse()', hint: 'Use loop', solutionSkeleton: 'for(int i=s.length()-1;i>=0;i--) ans+=s.charAt(i);', difficulty: 'Medium' }
      ]
    },
    phase2: {
      mcq: [
        { id: 'jv2-m1', question: 'Which interface supports lambda expressions?', options: ['Runnable', 'Serializable', 'Closeable', 'Comparator'], answer: 'Comparator', explanation: 'Comparator is a functional interface commonly used with lambdas.', difficulty: 'Medium' },
        { id: 'jv2-m2', question: 'Which collection preserves insertion order?', options: ['HashSet', 'ArrayList', 'LinkedHashMap', 'TreeSet'], answer: 'LinkedHashMap', explanation: 'LinkedHashMap preserves insertion order.', difficulty: 'Medium' },
        { id: 'jv2-m3', question: 'What does JVM garbage collector manage?', options: ['Memory', 'Threads', 'CPU', 'Disk'], answer: 'Memory', explanation: 'GC reclaims unused heap memory.', difficulty: 'Easy' },
        { id: 'jv2-m4', question: 'Streams API belongs to which package?', options: ['java.util.stream', 'java.streams', 'java.io', 'java.util'], answer: 'java.util.stream', explanation: 'Streams are in java.util.stream package.', difficulty: 'Medium' },
        { id: 'jv2-m5', question: 'Which keyword is used for inheritance?', options: ['implements', 'extends', 'inherits', 'uses'], answer: 'extends', explanation: 'Use extends for class inheritance.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'jv2-c1', title: 'Use Streams', description: 'Filter even numbers and collect to list using Streams.', hint: 'Use stream().filter()', solutionSkeleton: 'List<Integer> res = list.stream().filter(x->x%2==0).collect(Collectors.toList());', difficulty: 'Medium' },
        { id: 'jv2-c2', title: 'Implement Comparable', description: 'Make a class comparable by a field.', hint: 'Implement Comparable<T>', solutionSkeleton: 'public int compareTo(MyClass o){ return Integer.compare(this.id, o.id); }', difficulty: 'Medium' },
        { id: 'jv2-c3', title: 'Simple DAO', description: 'Create a DAO that stores objects in memory with CRUD APIs.', hint: 'Use a Map as storage', solutionSkeleton: 'Map<Integer, Obj> store = new HashMap<>();', difficulty: 'Hard' }
      ]
    },
    phase3: {
      mcq: [
        { id: 'jv3-m1', question: 'Which class provides thread pool executors?', options: ['ThreadPool', 'Executors', 'PoolExecutor', 'WorkerPool'], answer: 'Executors', explanation: 'Executors factory methods produce ExecutorService instances.', difficulty: 'Medium' },
        { id: 'jv3-m2', question: 'volatile keyword ensures?', options: ['Atomicity', 'Visibility', 'Ordering', 'None'], answer: 'Visibility', explanation: 'volatile guarantees visibility of changes across threads.', difficulty: 'Hard' },
        { id: 'jv3-m3', question: 'JVM option -Xmx512m sets what?', options: ['Max heap', 'Min heap', 'Stack size', 'GC type'], answer: 'Max heap', explanation: 'Sets the maximum heap memory.', difficulty: 'Easy' },
        { id: 'jv3-m4', question: 'Which profiler is commonly used?', options: ['jvisualvm', 'gprof', 'valgrind', 'perf'], answer: 'jvisualvm', explanation: 'jvisualvm provides JVM profiling.', difficulty: 'Medium' },
        { id: 'jv3-m5', question: 'What does synchronized keyword do?', options: ['Ensures single-thread execution per object', 'Creates thread', 'Schedules threads', 'None'], answer: 'Ensures single-thread execution per object', explanation: 'synchronized enforces mutual exclusion.', difficulty: 'Medium' }
      ],
      coding: [
        { id: 'jv3-c1', title: 'Thread Pool Example', description: 'Submit tasks to an ExecutorService and await termination.', hint: 'Use Executors.newFixedThreadPool', solutionSkeleton: 'ExecutorService es = Executors.newFixedThreadPool(4); es.submit(() -> {}); es.shutdown(); es.awaitTermination(1, TimeUnit.MINUTES);', difficulty: 'Hard' },
        { id: 'jv3-c2', title: 'Detect Memory Leak', description: 'Write a sample that repeatedly allocates objects and uses a weak reference to avoid leaks.', hint: 'Use WeakReference', solutionSkeleton: 'List<WeakReference<MyObj>> refs = new ArrayList<>();', difficulty: 'Hard' },
        { id: 'jv3-c3', title: 'Microservice API', description: 'Create a simple Spring Boot REST controller with one endpoint.', hint: 'Use @RestController', solutionSkeleton: '@RestController\npublic class Api { @GetMapping("/hello") public String hello(){return "hi";} }', difficulty: 'Hard' }
      ]
    },
    phase4: {
      mcq: [
        { id: 'jv4-m1', question: 'Which annotation marks a REST controller in Spring?', options: ['@Controller', '@RestController', '@Service', '@Repository'], answer: '@RestController', explanation: 'RestController combines Controller and ResponseBody.', difficulty: 'Easy' },
        { id: 'jv4-m2', question: 'What is dependency injection?', options: ['Service lookup', 'Providing dependencies externally', 'Singleton creation', 'Thread management'], answer: 'Providing dependencies externally', explanation: 'DI supplies component dependencies from outside.', difficulty: 'Medium' },
        { id: 'jv4-m3', question: 'Which profile is used for production settings?', options: ['dev', 'test', 'prod', 'local'], answer: 'prod', explanation: 'Use prod profile for production configuration.', difficulty: 'Easy' },
        { id: 'jv4-m4', question: 'Which tool helps with integration testing?', options: ['Mockito', 'Postman', 'Spring Test', 'Selenium'], answer: 'Spring Test', explanation: 'Spring Test provides integration testing utilities.', difficulty: 'Medium' },
        { id: 'jv4-m5', question: 'What does @Autowired do?', options: ['Injects dependency', 'Creates thread', 'Defines bean', 'Starts server'], answer: 'Injects dependency', explanation: 'Autowired injects bean dependencies.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'jv4-c1', title: 'Spring Boot CRUD', description: 'Create a minimal Spring Boot app with CRUD endpoints for an in-memory entity.', hint: 'Use @RestController and Map storage', solutionSkeleton: 'Map<Integer,Entity> store = new HashMap<>();', difficulty: 'Hard' },
        { id: 'jv4-c2', title: 'Build Jar', description: 'Package a Spring Boot app into an executable jar.', hint: 'Use Maven/Gradle build tasks', solutionSkeleton: 'mvn clean package', difficulty: 'Medium' },
        { id: 'jv4-c3', title: 'Write integration test', description: 'Write a Spring Boot test that starts the context and calls an endpoint.', hint: 'Use @SpringBootTest', solutionSkeleton: '@SpringBootTest\nclass AppTests { }', difficulty: 'Hard' }
      ]
    }
  },

  javascript: {
    phase1: {
      mcq: [
        { id: 'js1-m1', question: 'Which is block-scoped?', options: ['var', 'let', 'function', 'const (option)'], answer: 'let', explanation: 'let is block-scoped; var is function-scoped.', difficulty: 'Easy' },
        { id: 'js1-m2', question: 'What does === check?', options: ['Value only', 'Type only', 'Value and type', 'Reference only'], answer: 'Value and type', explanation: '=== checks both value and type equality.', difficulty: 'Easy' },
        { id: 'js1-m3', question: 'Which method adds an element to end of array?', options: ['push', 'pop', 'shift', 'unshift'], answer: 'push', explanation: 'push appends to end.', difficulty: 'Easy' },
        { id: 'js1-m4', question: 'How to log to console?', options: ['console.log()', 'print()', 'echo()', 'log()'], answer: 'console.log()', explanation: 'console.log prints to browser console or Node stdout.', difficulty: 'Easy' },
        { id: 'js1-m5', question: 'Which keyword creates a constant?', options: ['const', 'let', 'var', 'final'], answer: 'const', explanation: 'const creates a read-only reference to a value.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'js1-c1', title: 'DOM Text Change', description: 'Change innerText of an element by id.', hint: 'Use document.getElementById', solutionSkeleton: 'document.getElementById("id").innerText = "Hello";', difficulty: 'Easy' },
        { id: 'js1-c2', title: 'Array Sum', description: 'Sum array of numbers and return total.', hint: 'Use reduce', solutionSkeleton: 'const sum = arr.reduce((s,x)=>s+x,0);', difficulty: 'Easy' },
        { id: 'js1-c3', title: 'Fetch API', description: 'Fetch JSON from /api and log the result.', hint: 'Use fetch and then/await', solutionSkeleton: 'fetch("/api").then(r=>r.json()).then(data=>console.log(data));', difficulty: 'Medium' }
      ]
    },
    phase2: {
      mcq: [
        { id: 'js2-m1', question: 'What does event delegation refer to?', options: ['Handling events on parent', 'Removing events', 'Stopping propagation', 'None'], answer: 'Handling events on parent', explanation: 'Attach handler on parent to manage child events.', difficulty: 'Medium' },
        { id: 'js2-m2', question: 'Promise.resolve returns?', options: ['A rejected promise', 'A resolved promise', 'Synchronous value', 'Undefined'], answer: 'A resolved promise', explanation: 'It returns a promise resolved with the given value.', difficulty: 'Medium' },
        { id: 'js2-m3', question: 'Which is a modern bundler?', options: ['Vite', 'Gulp', 'Grunt', 'Bower'], answer: 'Vite', explanation: 'Vite is a modern fast bundler/dev server.', difficulty: 'Easy' },
        { id: 'js2-m4', question: 'Which operator spreads array elements?', options: ['...', '::', '->', '**'], answer: '...', explanation: 'Spread operator is three dots.', difficulty: 'Easy' },
        { id: 'js2-m5', question: 'Which method creates a shallow copy of an array?', options: ['slice', 'splice', 'push', 'pop'], answer: 'slice', explanation: 'slice without args returns a shallow copy.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'js2-c1', title: 'Debounce Function', description: 'Implement debounce that delays calls until after wait time.', hint: 'Use setTimeout', solutionSkeleton: 'function debounce(fn, wait){ let t; return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn(...args), wait); } }', difficulty: 'Medium' },
        { id: 'js2-c2', title: 'Fetch with Retry', description: 'Fetch a URL with n retries on failure.', hint: 'Recursive or loop with try/catch', solutionSkeleton: 'async function fetchWithRetry(url, n){ while(n--){ try{ return await fetch(url) }catch(e){} } }', difficulty: 'Hard' },
        { id: 'js2-c3', title: 'Simple SPA router', description: 'Implement basic hash-based router that maps location.hash to handlers.', hint: 'Use window.onhashchange', solutionSkeleton: 'window.onhashchange = ()=>{ const route = location.hash.slice(1); handlers[route]() }', difficulty: 'Hard' }
      ]
    },
    phase3: {
      mcq: [
        { id: 'js3-m1', question: 'Which API enables browser storage across sessions?', options: ['localStorage', 'sessionStorage', 'cookies', 'All of the above'], answer: 'localStorage', explanation: 'localStorage persists across sessions.', difficulty: 'Easy' },
        { id: 'js3-m2', question: 'Which command installs a package in npm?', options: ['npm install pkg', 'npm add pkg', 'npm get pkg', 'npm put pkg'], answer: 'npm install pkg', explanation: 'npm install adds packages.', difficulty: 'Easy' },
        { id: 'js3-m3', question: 'What is JSX?', options: ['A template language', 'JavaScript XML', 'Binary format', 'Compiler'], answer: 'JavaScript XML', explanation: 'JSX is a syntax extension used by React.', difficulty: 'Easy' },
        { id: 'js3-m4', question: 'Which hook runs after render?', options: ['useEffect', 'useMemo', 'useRef', 'useState'], answer: 'useEffect', explanation: 'useEffect runs after render and commits.', difficulty: 'Medium' },
        { id: 'js3-m5', question: 'Which tool formats code?', options: ['Prettier', 'eslint', 'jest', 'rollup'], answer: 'Prettier', explanation: 'Prettier is a code formatter.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'js3-c1', title: 'React Counter', description: 'Create a React component with a counter using useState.', hint: 'Use useState hook', solutionSkeleton: 'function Counter(){ const [c,setC]=useState(0); return <button onClick={()=>setC(c+1)}>{c}</button> }', difficulty: 'Medium' },
        { id: 'js3-c2', title: 'Throttle Function', description: 'Implement throttle that ensures a function runs at most once per interval.', hint: 'Use timestamps', solutionSkeleton: 'function throttle(fn, wait){ let last=0; return (...args)=>{ const now = Date.now(); if(now-last>wait){ last = now; fn(...args); } } }', difficulty: 'Medium' },
        { id: 'js3-c3', title: 'Server-side fetch', description: 'Use node-fetch to get data and print JSON.', hint: 'Use await fetch', solutionSkeleton: 'const res = await fetch(url); const data = await res.json(); console.log(data);', difficulty: 'Medium' }
      ]
    },
    phase4: {
      mcq: [
        { id: 'js4-m1', question: 'Which testing library is used for React components?', options: ['React Testing Library', 'Mocha', 'Chai', 'Cucumber'], answer: 'React Testing Library', explanation: 'RTL is focused on testing React components.', difficulty: 'Medium' },
        { id: 'js4-m2', question: 'What does TypeScript add?', options: ['Static types', 'Runtime types', 'A new VM', 'Faster runtime'], answer: 'Static types', explanation: 'TypeScript provides compile-time type checking.', difficulty: 'Medium' },
        { id: 'js4-m3', question: 'What is tree-shaking?', options: ['Removing unused code', 'Bundling strategy', 'Minification', 'Testing technique'], answer: 'Removing unused code', explanation: 'Tree-shaking eliminates unused exports during bundling.', difficulty: 'Medium' },
        { id: 'js4-m4', question: 'Which command runs tests with Jest?', options: ['npm test', 'npm start', 'npm build', 'npm lint'], answer: 'npm test', explanation: 'npm test runs the test script, commonly Jest.', difficulty: 'Easy' },
        { id: 'js4-m5', question: 'Which feature improves performance in React?', options: ['useMemo', 'useState', 'useEffect', 'useRef'], answer: 'useMemo', explanation: 'useMemo memoizes expensive calculations.', difficulty: 'Medium' }
      ],
      coding: [
        { id: 'js4-c1', title: 'Write Jest test', description: 'Write a simple Jest test for an add(a,b) function.', hint: 'Use expect(add(1,2)).toBe(3)', solutionSkeleton: 'test("adds", ()=>{ expect(add(1,2)).toBe(3) })', difficulty: 'Medium' },
        { id: 'js4-c2', title: 'TypeScript types', description: 'Add type annotations to a small function.', hint: 'Use :number return types', solutionSkeleton: 'function add(a: number, b: number): number { return a + b }', difficulty: 'Medium' },
        { id: 'js4-c3', title: 'Optimize bundle', description: 'Demonstrate dynamic import to lazy-load a module.', hint: 'Use import()', solutionSkeleton: 'button.onclick = async ()=>{ const mod = await import("./heavy"); mod.run(); }', difficulty: 'Hard' }
      ]
    }
  },

  cpp: {
    phase1: {
      mcq: [
        { id: 'cpp1-m1', question: 'Which header is needed for cout?', options: ['<iostream>', '<stdio.h>', '<string>', '<vector>'], answer: '<iostream>', explanation: 'cout is in iostream.', difficulty: 'Easy' },
        { id: 'cpp1-m2', question: 'Which container provides random access?', options: ['vector', 'list', 'set', 'map'], answer: 'vector', explanation: 'vector supports random access.', difficulty: 'Easy' },
        { id: 'cpp1-m3', question: 'How do you define a pointer?', options: ['int* p;', 'int p;', 'int &p;', 'ptr<int> p;'], answer: 'int* p;', explanation: 'Use * to declare pointers.', difficulty: 'Easy' },
        { id: 'cpp1-m4', question: 'Which is a C++11 feature?', options: ['auto keyword', 'goto', 'register', 'scanf'], answer: 'auto keyword', explanation: 'auto type deduction introduced in C++11.', difficulty: 'Medium' },
        { id: 'cpp1-m5', question: 'Which operator is used for scope resolution?', options: ['::', '->', '.', ':'], answer: '::', explanation: ':: is the scope resolution operator.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'cpp1-c1', title: 'Hello World', description: 'Print Hello World using iostream.', hint: 'Use std::cout', solutionSkeleton: '#include <iostream>\nint main(){ std::cout<<"Hello"; return 0; }', difficulty: 'Easy' },
        { id: 'cpp1-c2', title: 'Sum Vector', description: 'Sum integers in a vector and print total.', hint: 'Use loop or std::accumulate', solutionSkeleton: 'int sum=0; for(auto x: v) sum+=x; std::cout<<sum;', difficulty: 'Easy' },
        { id: 'cpp1-c3', title: 'Pointer Basics', description: 'Swap two integers using pointers.', hint: 'Pass addresses to a function', solutionSkeleton: 'void swap(int* a, int* b){ int t=*a; *a=*b; *b=t; }', difficulty: 'Medium' }
      ]
    },
    phase2: {
      mcq: [
        { id: 'cpp2-m1', question: 'Which smart pointer owns sole ownership?', options: ['shared_ptr', 'unique_ptr', 'weak_ptr', 'auto_ptr'], answer: 'unique_ptr', explanation: 'unique_ptr has exclusive ownership semantics.', difficulty: 'Medium' },
        { id: 'cpp2-m2', question: 'What does RAII stand for?', options: ['Resource Acquisition Is Initialization', 'Random Access Is Infinite', 'Resource Allocation Is Immediate', 'None'], answer: 'Resource Acquisition Is Initialization', explanation: 'RAII ties resource lifetime to object lifetime.', difficulty: 'Medium' },
        { id: 'cpp2-m3', question: 'Which algorithm sorts a vector in-place?', options: ['std::sort', 'std::copy', 'std::find', 'std::map'], answer: 'std::sort', explanation: 'std::sort sorts ranges in-place.', difficulty: 'Easy' },
        { id: 'cpp2-m4', question: 'Which header provides std::thread?', options: ['<thread>', '<pthread.h>', '<future>', '<mutex>'], answer: '<thread>', explanation: 'Thread support is in <thread>.', difficulty: 'Medium' },
        { id: 'cpp2-m5', question: 'Which is true about templates?', options: ['Compile-time polymorphism', 'Runtime polymorphism', 'Not Templated', 'None'], answer: 'Compile-time polymorphism', explanation: 'Templates create code at compile time.', difficulty: 'Medium' }
      ],
      coding: [
        { id: 'cpp2-c1', title: 'Use unique_ptr', description: 'Create and use a unique_ptr to manage a heap object.', hint: 'Use std::make_unique', solutionSkeleton: 'auto p = std::make_unique<MyClass>();', difficulty: 'Medium' },
        { id: 'cpp2-c2', title: 'STL Algorithms', description: 'Use std::remove_if and erase to remove odd numbers from a vector.', hint: 'Use v.erase(remove_if...), v.end()', solutionSkeleton: 'v.erase(std::remove_if(v.begin(), v.end(), [](int x){ return x%2; }), v.end());', difficulty: 'Medium' },
        { id: 'cpp2-c3', title: 'Thread example', description: 'Spawn a thread that prints numbers.', hint: 'Use std::thread', solutionSkeleton: 'std::thread t([](){ for(int i=0;i<5;i++) std::cout<<i; }); t.join();', difficulty: 'Hard' }
      ]
    },
    phase3: {
      mcq: [
        { id: 'cpp3-m1', question: 'Which C++ standard introduced std::optional?', options: ['C++11', 'C++14', 'C++17', 'C++20'], answer: 'C++17', explanation: 'std::optional arrived in C++17.', difficulty: 'Medium' },
        { id: 'cpp3-m2', question: 'Which container is ordered by key?', options: ['std::map', 'std::unordered_map', 'std::vector', 'std::set'], answer: 'std::map', explanation: 'std::map keeps elements ordered by key.', difficulty: 'Medium' },
        { id: 'cpp3-m3', question: 'Which smart pointer avoids ownership cycles?', options: ['shared_ptr', 'weak_ptr', 'unique_ptr', 'auto_ptr'], answer: 'weak_ptr', explanation: 'weak_ptr prevents reference cycles with shared_ptr.', difficulty: 'Medium' },
        { id: 'cpp3-m4', question: 'What is move semantics used for?', options: ['Avoid copies', 'Add copies', 'Threading', 'Memory alloc'], answer: 'Avoid copies', explanation: 'Move semantics transfer resources efficiently.', difficulty: 'Medium' },
        { id: 'cpp3-m5', question: 'What does constexpr indicate?', options: ['Compile-time evaluable', 'Runtime only', 'Deprecated', 'None'], answer: 'Compile-time evaluable', explanation: 'constexpr enables compile-time evaluation.', difficulty: 'Medium' }
      ],
      coding: [
        { id: 'cpp3-c1', title: 'Template function', description: 'Write a template function that returns max of two values.', hint: 'Use template<typename T>', solutionSkeleton: 'template<typename T> T max(T a, T b){ return a>b?a:b; }', difficulty: 'Medium' },
        { id: 'cpp3-c2', title: 'Move semantics demo', description: 'Show transfer of a buffer using std::move.', hint: 'Use std::move', solutionSkeleton: 'std::vector<int> a = {1,2,3}; auto b = std::move(a);', difficulty: 'Hard' },
        { id: 'cpp3-c3', title: 'Smart pointer graph', description: 'Model nodes referencing each other using weak_ptr to avoid leaks.', hint: 'Use shared_ptr and weak_ptr', solutionSkeleton: 'struct Node{ shared_ptr<Node> next; weak_ptr<Node> prev; };', difficulty: 'Hard' }
      ]
    },
    phase4: {
      mcq: [
        { id: 'cpp4-m1', question: 'Which tool helps with memory profiling on Linux?', options: ['valgrind', 'gprof', 'jmap', 'dotnet-trace'], answer: 'valgrind', explanation: 'Valgrind can detect memory leaks.', difficulty: 'Hard' },
        { id: 'cpp4-m2', question: 'Which C++20 feature enables coroutine support?', options: ['coroutines', 'modules', 'ranges', 'concepts'], answer: 'coroutines', explanation: 'C++20 introduced coroutine support.', difficulty: 'Hard' },
        { id: 'cpp4-m3', question: 'Which keyword declares concept?', options: ['concept', 'requires', 'template', 'typename'], answer: 'concept', explanation: 'Use concept to declare constraints in C++20.', difficulty: 'Hard' },
        { id: 'cpp4-m4', question: 'Which optimization level usually enables inlining?', options: ['-O0', '-O1', '-O2', '-O3'], answer: '-O2', explanation: 'Higher optimization levels like -O2 may inline functions.', difficulty: 'Medium' },
        { id: 'cpp4-m5', question: 'Which build system is widely used for C++?', options: ['CMake', 'Maven', 'Gradle', 'npm'], answer: 'CMake', explanation: 'CMake is commonly used to configure C++ builds.', difficulty: 'Easy' }
      ],
      coding: [
        { id: 'cpp4-c1', title: 'Profile and optimize', description: 'Profile a program and optimize the slow hotspot.', hint: 'Use gprof/valgrind and refactor algorithm', solutionSkeleton: '# profile then replace O(n^2) with O(n log n) algorithm', difficulty: 'Hard' },
        { id: 'cpp4-c2', title: 'Use coroutines (conceptual)', description: 'Create an example using C++ coroutines or explain how to structure code for async', hint: 'Use co_await/co_yield', solutionSkeleton: '// conceptual: use co_await to suspend/resume', difficulty: 'Hard' },
        { id: 'cpp4-c3', title: 'Packaging native lib', description: 'Build and package a native library with CMake and install rules.', hint: 'Write CMakeLists and run cmake/make', solutionSkeleton: 'cmake . && make && make install', difficulty: 'Hard' }
      ]
    }
  }
};
