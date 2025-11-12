// Practice questions for each section

export const practiceQuestions = {
  python: {
    intro: {
      mcqs: [
        {
          question: 'What type of programming language is Python?',
          options: [
            'Compiled, low-level',
            'Interpreted, high-level',
            'Assembly language',
            'Machine language'
          ],
          correctAnswer: 1,
          explanation: 'Python is an interpreted, high-level programming language known for its simplicity and readability.'
        },
        {
          question: 'Which of the following is NOT a common use case for Python?',
          options: [
            'Web Development',
            'Data Science',
            'Device Drivers',
            'Machine Learning'
          ],
          correctAnswer: 2,
          explanation: 'While Python can be used for many things, device drivers are typically written in lower-level languages like C for performance reasons.'
        },
        {
          question: 'What is the correct file extension for Python files?',
          options: ['.pt', '.py', '.python', '.pyt'],
          correctAnswer: 1,
          explanation: 'Python files use the .py extension.'
        }
      ],
      coding: [
        {
          question: 'Write a program that prints "Hello, Python!" to the console.',
          hint: 'Use the print() function',
          solution: 'print("Hello, Python!")',
          language: 'python'
        },
        {
          question: 'Create a program that asks for your age and prints it back.',
          hint: 'Use input() to get user input',
          solution: 'age = input("Enter your age: ")\nprint("Your age is:", age)',
          language: 'python'
        }
      ]
    },
    syntax: {
      mcqs: [
        {
          question: 'How many spaces should you use for indentation in Python?',
          options: ['2 spaces', '4 spaces', '8 spaces', 'Any number'],
          correctAnswer: 1,
          explanation: 'Python convention (PEP 8) recommends 4 spaces for indentation.'
        },
        {
          question: 'Which symbol is used for single-line comments in Python?',
          options: ['//', '/* */', '#', '--'],
          correctAnswer: 2,
          explanation: 'Python uses # for single-line comments.'
        },
        {
          question: 'Is Python case-sensitive?',
          options: [
            'Yes, Name and name are different',
            'No, Name and name are the same',
            'Only for variables',
            'Only for functions'
          ],
          correctAnswer: 0,
          explanation: 'Python is case-sensitive, meaning Name and name are treated as different identifiers.'
        }
      ],
      coding: [
        {
          question: 'Create three variables: name (string), age (int), and height (float). Print them all.',
          hint: 'Variables don\'t need type declarations in Python',
          solution: 'name = "Alice"\nage = 25\nheight = 5.6\nprint(name, age, height)',
          language: 'python'
        },
        {
          question: 'Create a variable x with value 10, then reassign it to "Hello". Print both values.',
          hint: 'Python is dynamically typed - variables can change types',
          solution: 'x = 10\nprint(x)\nx = "Hello"\nprint(x)',
          language: 'python'
        }
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
          language: 'python'
        },
        {
          question: 'Check if a number is even using the modulus operator. Test with number 8.',
          hint: 'A number is even if number % 2 == 0',
          solution: 'number = 8\nis_even = number % 2 == 0\nprint("Is even:", is_even)',
          language: 'python'
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
          language: 'python'
        },
        {
          question: 'Print numbers from 1 to 10 using a for loop.',
          hint: 'Use range(1, 11)',
          solution: 'for i in range(1, 11):\n    print(i)',
          language: 'python'
        },
        {
          question: 'Print all even numbers from 0 to 10 using a for loop.',
          hint: 'Use range with a step of 2, or use if to check even',
          solution: 'for i in range(0, 11, 2):\n    print(i)',
          language: 'python'
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
          language: 'python'
        },
        {
          question: 'Create a function that checks if a number is even and returns True/False.',
          hint: 'Use the modulus operator %',
          solution: 'def is_even(num):\n    return num % 2 == 0\n\nprint(is_even(8))\nprint(is_even(7))',
          language: 'python'
        },
        {
          question: 'Create a function with a default parameter that greets a person.',
          hint: 'def greet(name="Guest")',
          solution: 'def greet(name="Guest"):\n    print("Hello, " + name)\n\ngreet()\ngreet("Alice")',
          language: 'python'
        }
      ]
    }
  }
};
