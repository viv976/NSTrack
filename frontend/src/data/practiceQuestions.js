// Practice questions for each section

export const practiceQuestions = {
  python: {
    intro: {
      mcqs: [
        { question: 'What type of programming language is Python?', options: ['Compiled, low-level', 'Interpreted, high-level', 'Assembly language', 'Machine language'], correctAnswer: 1, explanation: 'Python is an interpreted, high-level programming language.' },
        { question: 'Which of the following is NOT a common use case for Python?', options: ['Web Development', 'Data Science', 'Device Drivers', 'Machine Learning'], correctAnswer: 2, explanation: 'Device drivers are typically written in lower-level languages.' },
        { question: 'What is the correct file extension for Python files?', options: ['.pt', '.py', '.python', '.pyt'], correctAnswer: 1, explanation: 'Python files use the .py extension.' },
        { question: 'Which data structure preserves insertion order since Python 3.7?', options: ['set', 'list', 'dict', 'tuple'], correctAnswer: 2, explanation: 'dict preserves insertion order as of CPython 3.7.' },
        { question: 'Which operator is used for floor division?', options: ['/', '//', '%', '**'], correctAnswer: 1, explanation: 'Floor division uses // and returns the integer quotient.' }
      ],
      coding: [
        { question: 'Write a program that prints "Hello, Python!" to the console.', hint: 'Use the print() function', solution: 'print("Hello, Python!")', language: 'python', expectedOutput: 'Hello, Python!' },
        { question: 'Create a program that asks for your age and prints it back.', hint: 'Use input() to get user input', solution: 'age = input("Enter your age: ")\nprint("Your age is:", age)', language: 'python', expectedOutput: 'Your age is: 25', testCases: [{ input: '25', output: 'Your age is: 25', explanation: 'Should echo the provided age.' }] },
        { question: 'Read numbers separated by space and print their sum.', hint: 'Use map and sum', solution: 'nums = list(map(int, input().split()))\nprint(sum(nums))', language: 'python', expectedOutput: '6', testCases: [{ input: '1 2 3', output: '6' }] }
      ]
    },
    syntax: {
      mcqs: [
        { question: 'How many spaces should you use for indentation in Python?', options: ['2 spaces', '4 spaces', '8 spaces', 'Any number'], correctAnswer: 1, explanation: 'PEP8 recommends 4 spaces.' },
        { question: 'Which symbol is used for single-line comments in Python?', options: ['//', '/* */', '#', '--'], correctAnswer: 2, explanation: 'Python uses # for single-line comments.' },
        { question: 'Is Python case-sensitive?', options: ['Yes, Name and name are different', 'No, Name and name are the same', 'Only for variables', 'Only for functions'], correctAnswer: 0, explanation: 'Python is case-sensitive.' },
        { question: 'Which of these is a mutable type?', options: ['tuple', 'str', 'list', 'int'], correctAnswer: 2, explanation: 'Lists are mutable.' },
        { question: 'What does the // operator do?', options: ['True division', 'Floor division', 'Modulo', 'Exponentiation'], correctAnswer: 1, explanation: 'Floor division returns the integer quotient.' }
      ],
      coding: [
        { question: 'Create three variables: name (string), age (int), and height (float). Print them all.', hint: 'Variables don\'t need type declarations in Python', solution: 'name = "Alice"\nage = 25\nheight = 5.6\nprint(name, age, height)', language: 'python', expectedOutput: 'Alice 25 5.6' },
        { question: 'Create a variable x with value 10, then reassign it to "Hello". Print both values.', hint: 'Python is dynamically typed', solution: 'x = 10\nprint(x)\nx = "Hello"\nprint(x)', language: 'python', expectedOutput: '10\nHello' },
        { question: 'Demonstrate a list comprehension that doubles values in [1,2,3]', hint: 'Use [x*2 for x in lst]', solution: 'lst = [1,2,3]\nprint([x*2 for x in lst])', language: 'python', expectedOutput: '[2, 4, 6]' }
      ]
    },
    operators: {
      mcqs: [
        {
          question: 'What is the result of 10 // 3 in Python?',
          options: ['3.33', '3', '3.0', '4'],
          correctAnswer: 1,
          explanation: '// is floor division, which returns the integer part of the division: 10 // 3 = 3.'
        },
        {
          question: 'What does the % operator do?',
          options: [
            'Percentage calculation',
            'Modulus (remainder)',
            'Division',
            'Multiplication'
          ],
          correctAnswer: 1,
          explanation: 'The % operator returns the remainder of division. For example, 10 % 3 = 1.'
        },
        {
          question: 'What is the result of: True and False?',
          options: ['True', 'False', '1', '0'],
          correctAnswer: 1,
          explanation: 'The "and" operator returns True only if both operands are True.'
        }
      ],
      coding: [
        {
          question: 'Calculate the area of a rectangle with width 5 and height 10.',
          hint: 'Area = width * height',
          solution: 'width = 5\nheight = 10\narea = width * height\nprint("Area:", area)',
          language: 'python',
          expectedOutput: 'Area: 50'
        },
        {
          question: 'Check if a number is even using the modulus operator. Test with number 8.',
          hint: 'A number is even if number % 2 == 0',
          solution: 'number = 8\nis_even = number % 2 == 0\nprint("Is even:", is_even)',
          language: 'python',
          expectedOutput: 'Is even: True'
        }
      ]
    },
    'control-flow': {
      mcqs: [
        {
          question: 'What keyword is used for the "else if" condition in Python?',
          options: ['elseif', 'elif', 'else if', 'elsif'],
          correctAnswer: 1,
          explanation: 'Python uses "elif" for else-if conditions.'
        },
        {
          question: 'What does the range(5) function generate?',
          options: [
            'Numbers 1 to 5',
            'Numbers 0 to 5',
            'Numbers 0 to 4',
            'Numbers 1 to 4'
          ],
          correctAnswer: 2,
          explanation: 'range(5) generates numbers from 0 to 4 (5 is excluded).'
        },
        {
          question: 'Which statement immediately exits a loop?',
          options: ['continue', 'break', 'exit', 'stop'],
          correctAnswer: 1,
          explanation: 'The "break" statement exits the loop immediately.'
        }
      ],
      coding: [
        {
          question: 'Write a program that checks if a number is positive, negative, or zero.',
          hint: 'Use if-elif-else',
          solution: 'num = 5\nif num > 0:\n    print("Positive")\nelif num < 0:\n    print("Negative")\nelse:\n    print("Zero")',
          language: 'python',
          expectedOutput: 'Positive'
        },
        {
          question: 'Print numbers from 1 to 10 using a for loop.',
          hint: 'Use range(1, 11)',
          solution: 'for i in range(1, 11):\n    print(i)',
          language: 'python',
          expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
        },
        {
          question: 'Print all even numbers from 0 to 10 using a for loop.',
          hint: 'Use range with a step of 2, or use if to check even',
          solution: 'for i in range(0, 11, 2):\n    print(i)',
          language: 'python',
          expectedOutput: '0\n2\n4\n6\n8\n10'
        }
      ]
    },
    functions: {
      mcqs: [
        {
          question: 'What keyword is used to define a function in Python?',
          options: ['function', 'def', 'func', 'define'],
          correctAnswer: 1,
          explanation: 'Python uses the "def" keyword to define functions.'
        },
        {
          question: 'What does a function return if no return statement is specified?',
          options: ['0', 'null', 'None', 'undefined'],
          correctAnswer: 2,
          explanation: 'Python functions return None by default if no return statement is specified.'
        },
        {
          question: 'Can a Python function return multiple values?',
          options: [
            'No, never',
            'Yes, using tuples',
            'Yes, using lists',
            'Only with special syntax'
          ],
          correctAnswer: 1,
          explanation: 'Python functions can return multiple values as a tuple: return a, b, c'
        }
      ],
      coding: [
        {
          question: 'Create a function that takes two numbers and returns their sum.',
          hint: 'Use def to define the function and return the result',
          solution: 'def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result)',
          language: 'python',
          expectedOutput: '8'
        },
        {
          question: 'Create a function that checks if a number is even and returns True/False.',
          hint: 'Use the modulus operator %',
          solution: 'def is_even(num):\n    return num % 2 == 0\n\nprint(is_even(8))\nprint(is_even(7))',
          language: 'python',
          expectedOutput: 'True\nFalse'
        },
        {
          question: 'Create a function with a default parameter that greets a person.',
          hint: 'def greet(name="Guest")',
          solution: 'def greet(name="Guest"):\n    print("Hello, " + name)\n\ngreet()\ngreet("Alice")',
          language: 'python',
          expectedOutput: 'Hello, Guest\nHello, Alice'
        }
      ]
    }
  },
  cpp: {
    intro: {
      mcqs: [
        {
          question: 'Which header is required for std::cout?',
          options: ['<stdio.h>', '<iostream>', '<cstdlib>', '<vector>'],
          correctAnswer: 1,
          explanation: '<iostream> defines std::cout, std::cin, and std::endl.'
        },
        {
          question: 'What is the file extension for C++ source files?',
          options: ['.c', '.cpp', '.class', '.ccs'],
          correctAnswer: 1,
          explanation: 'Most C++ files use the .cpp extension (or .cc/.cxx).'
        }
      ],
      coding: [
        {
          question: 'Print "Hello, C++" using std::cout.',
          hint: '#include <iostream> and use std::cout',
          solution: '#include <iostream>\nint main(){\n    std::cout << "Hello, C++";\n    return 0;\n}',
          language: 'cpp',
          expectedOutput: 'Hello, C++'
        },
        {
          question: 'Ask the user for their name and greet them.',
          hint: 'Use std::string and std::getline',
          solution: '#include <iostream>\n#include <string>\nint main(){\n    std::string name;\n    std::getline(std::cin, name);\n    std::cout << "Hi " << name;\n    return 0;\n}',
          language: 'cpp',
          expectedOutput: 'Hi Nova',
          testCases: [
            { input: 'Nova', output: 'Hi Nova' }
          ]
        }
      ]
    },
    syntax: {
      mcqs: [
        {
          question: 'Which keyword creates a reference?',
          options: ['*', '&', 'ref', 'ptr'],
          correctAnswer: 1,
          explanation: 'References are declared with &, e.g., int &ref = value;'
        },
        {
          question: 'What does ++i do?',
          options: ['Increments i after use', 'Increments i before use', 'Decrements i', 'Returns i squared'],
          correctAnswer: 1,
          explanation: 'Prefix ++ increments first, then returns the new value.'
        }
      ],
      coding: [
        {
          question: 'Create a function max_of_two that returns the larger integer.',
          hint: 'Use the ternary operator or std::max',
          solution: 'int max_of_two(int a, int b){\n    return (a > b) ? a : b;\n}',
          language: 'cpp'
        },
        {
          question: 'Read n numbers into a vector and print their sum.',
          hint: 'Use std::vector<int> and a loop',
          solution: '#include <bits/stdc++.h>\nint main(){\n    int n; std::cin >> n;\n    std::vector<int> nums(n);\n    for(int &x : nums) std::cin >> x;\n    int sum = 0; for(int x : nums) sum += x;\n    std::cout << sum;\n    return 0;\n}',
          language: 'cpp'
        }
      ]
    },
    oop: {
      mcqs: [
        {
          question: 'What is RAII in C++?',
          options: [
            'Runtime AI Interface',
            'Resource Acquisition Is Initialization',
            'Random Access Instruction Index',
            'Reserved Address Initialization'
          ],
          correctAnswer: 1,
          explanation: 'RAII ties resource lifetime to object lifetime via constructors/destructors.'
        },
        {
          question: 'Which STL container maintains sorted key/value pairs?',
          options: ['std::vector', 'std::map', 'std::stack', 'std::queue'],
          correctAnswer: 1,
          explanation: 'std::map is an ordered associative container implemented as a balanced tree.'
        }
      ],
      coding: [
        {
          question: 'Define a Player class with name and score plus addScore method.',
          hint: 'Store the state as private, expose public methods.',
          solution: 'class Player {\nprivate:\n    std::string name;\n    int score;\npublic:\n    Player(std::string n, int s): name(std::move(n)), score(s) {}\n    void addScore(int delta){ score += delta; }\n    int getScore() const { return score; }\n};',
          language: 'cpp'
        },
        {
          question: 'Using std::vector, read integers and output the maximum.',
          hint: 'Use std::max_element',
          solution: '#include <bits/stdc++.h>\nint main(){\n    int n; std::cin >> n;\n    std::vector<int> a(n);\n    for(int &x : a) std::cin >> x;\n    std::cout << *std::max_element(a.begin(), a.end());\n    return 0;\n}',
          language: 'cpp'
        }
      ]
    }
  }
  ,
  html_css: {
    'html-css-phase-1': {
      mcqs: [
        { id: 'html1-m1', question: 'Which tag represents the main content of an HTML document?', options: ['<main>', '<section>', '<article>', '<body>'], correctAnswer: 0, explanation: 'The <main> element represents the dominant content.' },
        { id: 'html1-m2', question: 'Which attribute is required for images to be accessible?', options: ['title', 'role', 'alt', 'srcset'], correctAnswer: 2, explanation: 'alt provides alternative text for assistive tech.' },
        { id: 'html1-m3', question: 'What does DOCTYPE declaration do?', options: ['Links stylesheet', 'Sets document mode', 'Defines meta charset', 'Includes script'], correctAnswer: 1, explanation: 'DOCTYPE tells the browser which HTML spec to use (standards mode).'},
        { id: 'html1-m4', question: 'Which tag creates an unordered list?', options: ['<ol>', '<ul>', '<li>', '<list>'], correctAnswer: 1, explanation: '<ul> creates unordered lists, <ol> is ordered.' },
        { id: 'html1-m5', question: 'Which input type is used for submitting a form?', options: ['text', 'button', 'submit', 'form'], correctAnswer: 2, explanation: 'type="submit" triggers form submission.' }
      ],
      coding: [
        { id: 'html1-c1', title: 'Create a basic HTML page', question: 'Create a minimal valid HTML document including a header, main with one paragraph, and footer.', starter: '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>My Page</title>\n  </head>\n  <body>\n    <!-- your content -->\n  </body>\n</html>', tests: ['contains <header>', 'contains <main>', 'contains <footer>'] },
        { id: 'html1-c2', title: 'Accessible image', question: 'Add an image tag with an appropriate alt attribute describing the image.', starter: '<img src="/images/sample.jpg" alt="">', tests: ['alt is not empty'] },
        { id: 'html1-c3', title: 'Form basics', question: 'Create a form with a text input (name) and a submit button.', starter: '<form action="#">\n  <!-- inputs -->\n</form>', tests: ['contains <input', 'contains type="submit"'] }
      ]
    },
    'html-css-phase-2': {
      mcqs: [
        { id: 'html2-m1', question: 'Which CSS property controls layout in a flex container?', options: ['display', 'flex-direction', 'position', 'float'], correctAnswer: 1, explanation: 'flex-direction sets main axis for flex items.' },
        { id: 'html2-m2', question: 'Which display value creates a grid container?', options: ['display: flex', 'display: block', 'display: grid', 'display: inline-grid'], correctAnswer: 2, explanation: 'display: grid initializes a grid layout.' },
        { id: 'html2-m3', question: 'Which unit is relative to the root font-size?', options: ['em', 'rem', 'px', '%'], correctAnswer: 1, explanation: 'rem is relative to the root (<html>) font-size.' },
        { id: 'html2-m4', question: 'How do you make an element responsive to screen size?', options: ['@media rules', 'position: fixed', 'float:left', 'display:inline'], correctAnswer: 0, explanation: 'Media queries apply styles based on viewport constraints.' },
        { id: 'html2-m5', question: 'Which CSS property controls spacing between items in a flex container?', options: ['gap', 'margin', 'padding', 'space-between'], correctAnswer: 0, explanation: 'gap sets spacing between items in flex and grid.' }
      ],
      coding: [
        { id: 'html2-c1', title: 'Center with Flexbox', question: 'Create a container that centers its child both vertically and horizontally using Flexbox.', starter: '<div class="container">\n  <div class="child">Hello</div>\n</div>', tests: ['container has display:flex', 'justify-content:center or align-items:center present'] },
        { id: 'html2-c2', title: 'Two-column Grid', question: 'Create a two-column responsive grid that stacks to one column on small screens.', starter: '<div class="grid">\n  <div>1</div>\n  <div>2</div>\n</div>', tests: ['display:grid', 'grid-template-columns at least 2 columns', '@media present for breakpoint'] },
        { id: 'html2-c3', title: 'Responsive image', question: 'Use srcset or CSS to ensure an image adapts to different screen sizes.', starter: '<img src="/img.jpg" alt="">', tests: ['contains srcset or responsive styles'] }
      ]
    },
    'html-css-phase-3': {
      mcqs: [
        { id: 'html3-m1', question: 'Which feature allows you to define reusable CSS values?', options: ['mixins', 'variables', 'components', 'functions'], correctAnswer: 1, explanation: 'CSS custom properties are variables.' },
        { id: 'html3-m2', question: 'Which pseudo-class is used for keyboard focus?', options: [':hover', ':active', ':focus', ':visited'], correctAnswer: 2, explanation: ':focus indicates keyboard focus.' },
        { id: 'html3-m3', question: 'Which property triggers GPU acceleration for smoother animations?', options: ['transform', 'top', 'left', 'width'], correctAnswer: 0, explanation: 'Using transform/opacity is more performant.' },
        { id: 'html3-m4', question: 'What does ARIA stand for?', options: ['Accessible Rich Internet Applications', 'All Regions In Apps', 'Accessible React Interface App', 'None'], correctAnswer: 0, explanation: 'ARIA provides accessibility semantics.' },
        { id: 'html3-m5', question: 'Which method helps avoid layout shift?', options: ['Specifying image dimensions', 'Using inline styles', 'Removing CSS', 'Using z-index'], correctAnswer: 0, explanation: 'Reserving space prevents Cumulative Layout Shift.' }
      ],
      coding: [
        { id: 'html3-c1', title: 'Theme variables', question: 'Create CSS variables for primary and background colors and apply them to body and a .btn class.', starter: ':root { --primary: #06b6d4; }\nbody { background: var(--background); }', tests: ['--primary defined', 'var(--primary) used'] },
        { id: 'html3-c2', title: 'Accessible focus', question: 'Add visible focus styles to links and buttons.', starter: 'a { }\nbutton { }', tests: [':focus selector present', 'outline or box-shadow used'] },
        { id: 'html3-c3', title: 'Smooth transition', question: 'Add a hover transition to a .card element for transform and box-shadow.', starter: '.card { }', tests: ['transition property includes transform or box-shadow'] }
      ]
    },
    'html-css-phase-4': {
      mcqs: [
        { id: 'html4-m1', question: 'Which tool is a CSS preprocessor?', options: ['PostCSS', 'Sass', 'Autoprefixer', 'Babel'], correctAnswer: 1, explanation: 'Sass is a CSS preprocessor.' },
        { id: 'html4-m2', question: 'What is critical CSS?', options: ['CSS for above-the-fold content', 'All CSS loaded', 'Minified CSS', 'Unused CSS'], correctAnswer: 0, explanation: 'Critical CSS renders initial view quickly.' },
        { id: 'html4-m3', question: 'Which helps responsive images?', options: ['srcset', 'lazyload', 'picture element', 'All of the above'], correctAnswer: 3, explanation: 'All assist responsive image delivery.' },
        { id: 'html4-m4', question: 'Which practice reduces CSS bundle size?', options: ['Tree shaking', 'Eliminating unused CSS', 'Inlining all CSS', 'Using large libraries'], correctAnswer: 1, explanation: 'Remove unused rules to reduce size.' },
        { id: 'html4-m5', question: 'Which attribute helps with image lazy loading?', options: ['loading', 'defer', 'async', 'lazy'], correctAnswer: 0, explanation: 'loading="lazy" defers offscreen images.' }
      ],
      coding: [
        { id: 'html4-c1', title: 'Sass nesting', question: 'Write a small Sass snippet that nests a .nav and .nav-item with hover.', starter: '$nav-color: #333; .nav { }', tests: ['use of nesting or variables'] },
        { id: 'html4-c2', title: 'Optimize images', question: 'Add markup or attributes to make images responsive and lazy-loaded.', starter: '<img src="/hero.jpg" alt="">', tests: ['loading="lazy" or srcset present'] },
        { id: 'html4-c3', title: 'Build a small project', question: 'Create a small responsive card component using Grid or Flexbox.', starter: '<div class="card">\n</div>', tests: ['.card styles include display:flex or display:grid', 'responsive rules exist'] }
      ]
    }
  }
};
