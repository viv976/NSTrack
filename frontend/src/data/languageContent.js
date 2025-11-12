// Comprehensive language learning content organized for easy understanding

export const languageRoadmaps = {
  python: {
    title: 'Python Complete Learning Path',
    description: 'Master Python from basics to advanced concepts with practical examples',
    sections: [
      {
        id: 'intro',
        phase: 'Phase 1: Foundations',
        title: '1. Introduction to Python',
        duration: '1-2 days',
        difficulty: 'Beginner',
        topics: [
          {
            name: 'What is Python?',
            content: `Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, it emphasizes code readability with significant use of whitespace.

**Why Learn Python?**
• Easy to learn and read (beginner-friendly syntax)
• Versatile (web, data science, AI, automation, scripting)
• Huge ecosystem of libraries and frameworks
• High demand in job market
• Strong community support

**Where is Python Used?**
• Web Development: Django, Flask, FastAPI
• Data Science & Analytics: Pandas, NumPy, Matplotlib
• Machine Learning & AI: TensorFlow, PyTorch, scikit-learn
• Automation & Scripting: File management, web scraping
• Desktop Applications: Tkinter, PyQt`,
            example: `# Python's simplicity - Hello World
print("Hello, World!")

# No semicolons, no curly braces, just clean code!`
          },
          {
            name: 'Setting Up Python',
            content: `**Installation Steps:**

1. **Download Python**
   • Visit python.org
   • Download latest version (Python 3.11+)
   • Windows: Run installer, check "Add Python to PATH"
   • Mac: Use Homebrew or official installer
   • Linux: Usually pre-installed

2. **Verify Installation**
   Open terminal/command prompt and type:`,
            example: `python --version
# Should show: Python 3.11.x

python
# Opens interactive Python shell
>>> print("Python is ready!")
>>> exit()`
          },
          {
            name: 'Your First Program',
            content: `Let's write a simple Python program that greets you by name.

**Step 1:** Create a file called \`hello.py\`
**Step 2:** Write the code
**Step 3:** Run it!`,
            example: `# hello.py - My first Python program

# Get user's name
name = input("What's your name? ")

# Greet the user
print("Hello, " + name + "! Welcome to Python programming.")
print("Nice to meet you, " + name + "!")

# Run in terminal: python hello.py`
          }
        ]
      },
      {
        id: 'syntax',
        phase: 'Phase 1: Foundations',
        title: '2. Basic Syntax & Variables',
        duration: '2-3 days',
        difficulty: 'Beginner',
        topics: [
          {
            name: 'Python Syntax Rules',
            content: `Python syntax is clean and readable. Here are the key rules:

**1. Indentation is Mandatory**
   • Use 4 spaces (not tabs) for indentation
   • Indentation defines code blocks
   
**2. Comments**
   • Single line: Use #
   • Multi-line: Use ''' or """
   
**3. Case Sensitive**
   • \`Name\` and \`name\` are different variables`,
            example: `# This is a single-line comment

"""
This is a multi-line comment.
You can write multiple lines here.
Useful for documentation.
"""

# Indentation example
if True:
    print("This is indented")  # 4 spaces
    print("Same level")        # 4 spaces
print("Back to no indent")     # 0 spaces

# Case sensitivity
name = "Alice"
Name = "Bob"
print(name)  # Outputs: Alice
print(Name)  # Outputs: Bob`
          },
          {
            name: 'Variables & Data Types',
            content: `Variables store data. Python automatically determines the type.

**Basic Data Types:**
• **int**: Whole numbers (1, 42, -10)
• **float**: Decimal numbers (3.14, -0.5)
• **str**: Text ("Hello", 'Python')
• **bool**: True or False

**Variable Naming Rules:**
• Start with letter or underscore
• Can contain letters, numbers, underscore
• Case sensitive
• Avoid Python keywords`,
            example: `# Creating variables (no declaration needed!)
age = 25                    # int
height = 5.9                # float
name = "Alice"              # str
is_student = True           # bool

# Python is dynamically typed
x = 10          # x is int
x = "Hello"     # now x is str (perfectly fine!)

# Multiple assignment
a, b, c = 1, 2, 3
x = y = z = 0

# Type checking
print(type(age))       # <class 'int'>
print(type(height))    # <class 'float'>

# Type conversion
age_str = str(age)     # Convert to string
num = int("42")        # Convert to int
pi = float("3.14")     # Convert to float`
          }
        ]
      },
      {
        id: 'operators',
        phase: 'Phase 1: Foundations',
        title: '3. Operators',
        duration: '1-2 days',
        difficulty: 'Beginner',
        topics: [
          {
            name: 'Arithmetic Operators',
            content: `Perform mathematical operations.`,
            example: `# Basic arithmetic
a = 10
b = 3

print(a + b)   # Addition: 13
print(a - b)   # Subtraction: 7
print(a * b)   # Multiplication: 30
print(a / b)   # Division: 3.333...
print(a // b)  # Floor division: 3
print(a % b)   # Modulus (remainder): 1
print(a ** b)  # Exponentiation: 1000

# Practical example
total_price = 99.99
tax_rate = 0.08
final_price = total_price + (total_price * tax_rate)
print("Final price: $" + str(final_price))`
          },
          {
            name: 'Comparison & Logical Operators',
            content: `Compare values and create logical expressions.`,
            example: `# Comparison operators (return True/False)
x = 10
y = 5

print(x > y)   # Greater than: True
print(x < y)   # Less than: False
print(x >= 10) # Greater or equal: True
print(x <= 5)  # Less or equal: False
print(x == 10) # Equal to: True
print(x != y)  # Not equal: True

# Logical operators
age = 20
has_license = True

can_drive = age >= 18 and has_license  # True
is_minor = age < 18 or not has_license # False

# Practical example
temperature = 25
is_sunny = True

go_beach = temperature > 20 and is_sunny
print("Go to beach?", go_beach)`
          }
        ]
      },
      {
        id: 'control-flow',
        phase: 'Phase 2: Core Concepts',
        title: '4. Control Flow (if/else, loops)',
        duration: '3-4 days',
        difficulty: 'Beginner',
        topics: [
          {
            name: 'If-Elif-Else Statements',
            content: `Make decisions in your code based on conditions.`,
            example: `# Simple if statement
age = 18
if age >= 18:
    print("You can vote!")

# If-else
temperature = 30
if temperature > 25:
    print("It's hot! 🌞")
else:
    print("It's cool! ❄️")

# If-elif-else (multiple conditions)
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print("Your grade:", grade)

# Nested if
username = "alice"
password = "secret123"

if username == "alice":
    if password == "secret123":
        print("Login successful!")
    else:
        print("Wrong password")
else:
    print("User not found")`
          },
          {
            name: 'For Loops',
            content: `Repeat code a specific number of times.`,
            example: `# Loop through range
for i in range(5):
    print(i)  # Prints: 0, 1, 2, 3, 4

# Loop through list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print("I like", fruit)

# Loop with index
colors = ["red", "green", "blue"]
for index, color in enumerate(colors):
    print(index, ":", color)

# Range with start, stop, step
for num in range(2, 11, 2):
    print(num)  # Prints: 2, 4, 6, 8, 10

# Nested loops (multiplication table)
for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(i, "x", j, "=", result)
    print("---")`
          },
          {
            name: 'While Loops',
            content: `Repeat code while a condition is true.`,
            example: `# Basic while loop
count = 0
while count < 5:
    print("Count:", count)
    count += 1

# User input validation
password = ""
while password != "secret":
    password = input("Enter password: ")
    if password != "secret":
        print("Wrong password! Try again.")
print("Access granted!")

# Break and continue
number = 0
while True:
    number += 1
    
    if number == 3:
        continue  # Skip 3
    
    if number > 5:
        break  # Stop at 5
    
    print(number)  # Prints: 1, 2, 4, 5`
          }
        ]
      },
      {
        id: 'functions',
        phase: 'Phase 2: Core Concepts',
        title: '5. Functions',
        duration: '3-4 days',
        difficulty: 'Intermediate',
        topics: [
          {
            name: 'Defining and Calling Functions',
            content: `Functions are reusable blocks of code that perform specific tasks.`,
            example: `# Basic function
def greet():
    print("Hello, World!")

greet()  # Call the function

# Function with parameters
def greet_person(name):
    print("Hello, " + name + "!")

greet_person("Alice")
greet_person("Bob")

# Function with return value
def add(a, b):
    result = a + b
    return result

sum_result = add(5, 3)
print("Sum:", sum_result)  # 8

# Multiple return values
def get_user_info():
    name = "Alice"
    age = 25
    city = "NYC"
    return name, age, city

user_name, user_age, user_city = get_user_info()
print(user_name, user_age, user_city)`
          },
          {
            name: 'Default Parameters & Keyword Arguments',
            content: `Make functions more flexible with default values and named arguments.`,
            example: `# Default parameters
def greet(name, greeting="Hello"):
    print(greeting + ", " + name + "!")

greet("Alice")              # Uses default: Hello, Alice!
greet("Bob", "Hi")          # Custom greeting: Hi, Bob!

# Keyword arguments
def create_profile(name, age, city, country="USA"):
    print(name, age, "from", city, country)

create_profile("Alice", 25, "NYC")
create_profile(city="LA", name="Bob", age=30)

# *args and **kwargs
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))  # 15

def print_info(**info):
    for key, value in info.items():
        print(key + ":", value)

print_info(name="Alice", age=25, city="NYC")`
          }
        ]
      }
    ]
  },
  
  javascript: {
    title: 'JavaScript Complete Learning Path',
    description: 'Master JavaScript from basics to advanced concepts',
    sections: [
      {
        id: 'intro',
        phase: 'Phase 1: Foundations',
        title: '1. Introduction to JavaScript',
        duration: '1-2 days',
        difficulty: 'Beginner',
        topics: [
          {
            name: 'What is JavaScript?',
            content: `JavaScript is a high-level, interpreted programming language that runs in web browsers and on servers (Node.js).

**Why Learn JavaScript?**
• Powers interactive websites
• Full-stack development (frontend + backend)
• Huge job market demand
• Vibrant ecosystem (npm)
• Cross-platform (web, mobile, desktop)

**Where is JavaScript Used?**
• Frontend: React, Vue, Angular
• Backend: Node.js, Express
• Mobile: React Native
• Desktop: Electron`,
            example: `// JavaScript runs everywhere!

// In Browser
console.log("Hello from browser!");
alert("Welcome!");

// Basic calculation
let result = 5 + 10;
console.log(result);  // 15`
          }
        ]
      }
    ]
  }
};

export const practiceProblems = {
  python: {
    fundamentals: [
      {
        title: 'Variable Swap',
        difficulty: 'Easy',
        description: 'Swap two variables without using a third variable.',
        hint: 'Use tuple unpacking: a, b = b, a',
        solution: 'a, b = 10, 20\na, b = b, a\nprint(a, b)  # 20, 10'
      },
      {
        title: 'Temperature Converter',
        difficulty: 'Easy',
        description: 'Convert Celsius to Fahrenheit: F = C * 9/5 + 32',
        hint: 'Get input, apply formula, print result',
        solution: 'celsius = float(input("Celsius: "))\nfahrenheit = celsius * 9/5 + 32\nprint(f"{celsius}°C = {fahrenheit}°F")'
      }
    ]
  }
};
