import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Loader2, Sparkles, CheckCircle, Lightbulb, Target, Clock, Code, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RoadmapPage = () => {
  // Define generateAIPoweredRoadmap as a static method to ensure it's accessible
  const navigate = useNavigate();
  const [step, setStep] = useState('questions');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goals: '',
    time_availability: '5-10 hours',
    current_level: 'beginner'
  });
  const [roadmap, setRoadmap] = useState(null);
  const [problemFilters, setProblemFilters] = useState({
    category: 'all',
    platform: 'all',
    technology: 'all',
    searchQuery: ''
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      time_availability: '5-10 hours',
      current_level: 'beginner'
    }));
  }, []);

  // Enhanced technology detection with fuzzy matching and context awareness
  const detectTechnologies = (text) => {
    const techMap = {
      // Frontend frameworks
      'react': { 
        aliases: ['react', 'reactjs', 'react.js', 'react-js', 'reactjs.org'],
        category: 'frontend',
        related: ['jsx', 'next.js', 'gatsby', 'remix', 'hooks', 'context', 'redux']
      },
      'vue': {
        aliases: ['vue', 'vuejs', 'vue.js', 'vuejs.org'],
        category: 'frontend',
        related: ['vuex', 'pinia', 'nuxt.js', 'composition api']
      },
      'angular': {
        aliases: ['angular', 'angularjs', 'angular.js'],
        category: 'frontend',
        related: ['rxjs', 'ngrx', 'ionic', 'angular material']
      },
      'svelte': {
        aliases: ['svelte', 'sveltejs', 'svelte.js'],
        category: 'frontend',
        related: ['sveltekit', 'svelte-native']
      },
      // Backend technologies
      'node': {
        aliases: ['node', 'nodejs', 'node.js'],
        category: 'backend',
        related: ['express', 'koa', 'nest', 'fastify']
      },
      'express': {
        aliases: ['express', 'expressjs', 'express.js'],
        category: 'backend',
        related: ['middleware', 'routing', 'rest api']
      },
      // Add more technologies as needed...
    };

    const detected = [];
    const words = text.toLowerCase().split(/\s+/);
    
    for (const [tech, { aliases, category, related }] of Object.entries(techMap)) {
      // Check for direct matches
      const isMatch = aliases.some(alias => 
        words.some(word => 
          word.includes(alias) || 
          alias.includes(word)
        )
      );
      
      // Check for related terms
      const relatedMatches = related.filter(relatedTerm => 
        words.some(word => word.includes(relatedTerm))
      );

      if (isMatch || relatedMatches.length > 0) {
        detected.push({
          name: tech,
          category,
          confidence: isMatch ? 'high' : 'medium',
          related: relatedMatches
        });
      }
    }

    return detected;
  };

  // Static method to generate roadmap
  RoadmapPage.generateAIPoweredRoadmap = (goals, time, level) => {
    // Normalize and analyze user input
    const goalsLower = goals.toLowerCase();
    const isBeginner = level === 'beginner';
    const isIntermediate = level === 'intermediate';
    const isAdvanced = level === 'advanced';
    
    // Initialize path with core fundamentals based on level
    let path = [];
    
    // Detect technologies from user input
    const detectedTech = detectTechnologies(goals);
    
    // Extract key problem areas from the user's description with enhanced matching
    const problemKeywords = [
      { 
        key: 'responsive', 
        aliases: ['responsive', 'mobile', 'tablet', 'desktop', 'screen size'],
        topics: ['Responsive Design', 'Media Queries', 'Flexbox', 'CSS Grid', 'Viewport Units']
      },
      { 
        key: 'layout', 
        aliases: ['layout', 'positioning', 'alignment', 'spacing', 'grid', 'flex'],
        topics: ['CSS Layout', 'Flexbox', 'CSS Grid', 'Positioning', 'CSS Box Model']
      },
      { 
        key: 'javascript', 
        aliases: ['javascript', 'js', 'ecmascript', 'es6', 'esnext'],
        topics: ['JavaScript Fundamentals', 'DOM Manipulation', 'ES6+ Features', 'Async/Await', 'Promises']
      },
      { 
        key: 'api',
        aliases: ['api', 'rest', 'graphql', 'fetch', 'axios'],
        topics: ['REST APIs', 'GraphQL', 'Fetch API', 'Axios', 'Error Handling']
      },
      { 
        key: 'performance',
        aliases: ['performance', 'speed', 'optimization', 'fast', 'slow'],
        topics: ['Performance Optimization', 'Lazy Loading', 'Code Splitting', 'Caching']
      }
    ];
    
    // Enhanced problem detection
    const detectedProblems = [];
    problemKeywords.forEach(({aliases, topics}) => {
      const isMentioned = aliases.some(alias => goalsLower.includes(alias));
      if (isMentioned) {
        detectedProblems.push(...topics);
      }
    });

    // Generate path based on detected technologies and problems
    if (detectedTech.length > 0) {
      path.push('Based on your goals, I recommend focusing on these technologies:');
      
      detectedTech.forEach(({name, category, confidence, related}) => {
        const techName = name.charAt(0).toUpperCase() + name.slice(1);
        path.push(`• ${techName} (${category}${related.length > 0 ? `, related to: ${related.join(', ')}` : ''})`);
      });
      path.push(''); // Empty line for better readability
    }

    // Add detected problems to the path
    if (detectedProblems.length > 0) {
      path.push('Key areas to focus on:');
      detectedProblems.forEach(problem => {
        path.push(`• ${problem}`);
      });
      path.push(''); // Empty line for better readability
    }

    // Find relevant topics based on user's problem description
    const relevantTopics = [];
    problemKeywords.forEach(({key, topics}) => {
      if (goalsLower.includes(key)) {
        relevantTopics.push(...topics);
      }
    });

    // If no specific problems mentioned, use level-based defaults
    if (relevantTopics.length === 0) {
      if (isBeginner) {
        path.push('Master HTML5 & CSS3 fundamentals (semantic HTML, box model, selectors)');
        path.push('Learn JavaScript basics (variables, functions, loops, conditionals)');
      } else {
        path.push('Review and strengthen core web technologies (HTML5, CSS3, JavaScript)');
      }
    } else {
      // Add relevant topics based on the user's problem description
      path.push('Focus on addressing your specific challenges:');
      relevantTopics.forEach(topic => {
        path.push(`• ${topic}`);
      });
    }
    
    // Detect specific technologies and frameworks mentioned in the problem
    const techStack = {
      frontend: {
        react: goalsLower.includes('react') || goalsLower.includes('reactjs') || goalsLower.includes('react.js'),
        vue: goalsLower.includes('vue') || goalsLower.includes('vue.js') || goalsLower.includes('vuejs'),
        angular: goalsLower.includes('angular') || goalsLower.includes('angularjs'),
        svelte: goalsLower.includes('svelte'),
        typescript: goalsLower.includes('typescript') || goalsLower.includes('ts ') || goalsLower.includes('type script'),
        jquery: goalsLower.includes('jquery') || goalsLower.includes('jquery ui'),
        bootstrap: goalsLower.includes('bootstrap') || goalsLower.includes('css framework'),
        tailwind: goalsLower.includes('tailwind') || goalsLower.includes('tailwindcss')
      },
      backend: {
        node: goalsLower.includes('node') || goalsLower.includes('nodejs') || goalsLower.includes('node.js'),
        express: goalsLower.includes('express') || goalsLower.includes('expressjs') || goalsLower.includes('express.js'),
        nextjs: goalsLower.includes('next') || goalsLower.includes('nextjs') || goalsLower.includes('next.js'),
        python: goalsLower.includes('python') || goalsLower.includes('django') || goalsLower.includes('flask'),
        java: (goalsLower.includes('java') && !goalsLower.includes('javascript')) || goalsLower.includes('spring'),
        php: goalsLower.includes('php') || goalsLower.includes('laravel') || goalsLower.includes('wordpress'),
        ruby: goalsLower.includes('ruby') || goalsLower.includes('rails') || goalsLower.includes('ruby on rails'),
        dotnet: goalsLower.includes('.net') || goalsLower.includes('c#') || goalsLower.includes('asp.net')
      },
      database: {
        mongodb: goalsLower.includes('mongodb') || goalsLower.includes('mongo') || goalsLower.includes('mongoose'),
        postgresql: goalsLower.includes('postgres') || goalsLower.includes('postgresql') || goalsLower.includes('postgre sql') || goalsLower.includes('postgresql'),
        mysql: goalsLower.includes('mysql') || goalsLower.includes('my sql') || goalsLower.includes('mariadb'),
        sqlite: goalsLower.includes('sqlite') || goalsLower.includes('sqlite3'),
        sql: goalsLower.includes('sql') && !goalsLower.includes('nosql') && !goalsLower.includes('postgresql') && !goalsLower.includes('mysql') && !goalsLower.includes('sqlite'),
        firebase: goalsLower.includes('firebase') || goalsLower.includes('firestore')
      },
      devops: {
        docker: goalsLower.includes('docker') || goalsLower.includes('container'),
        aws: goalsLower.includes('aws') || goalsLower.includes('amazon web services'),
        azure: goalsLower.includes('azure') || goalsLower.includes('microsoft azure'),
        gcp: goalsLower.includes('gcp') || goalsLower.includes('google cloud'),
        heroku: goalsLower.includes('heroku'),
        netlify: goalsLower.includes('netlify'),
        vercel: goalsLower.includes('vercel') || goalsLower.includes('zeit')
      },
      testing: {
        jest: goalsLower.includes('jest'),
        cypress: goalsLower.includes('cypress'),
        testing: goalsLower.includes('test') || goalsLower.includes('testing'),
        tdd: goalsLower.includes('tdd') || goalsLower.includes('test driven')
      }
    };
    
    // Add frontend technologies to path based on the user's problem context
    const frontendTechs = [];
    
    if (techStack.frontend.react) {
      frontendTechs.push('React.js');
      if (isBeginner) {
        path.push('Learn React fundamentals (components, JSX, props, state)');
        path.push('Understand React hooks (useState, useEffect, useContext)');
      } else {
        path.push('Master React patterns (HOCs, render props, custom hooks)');
        path.push('Advanced state management (Context API, Redux, or Recoil)');
      }
      
      if (techStack.frontend.typescript) {
        path.push('Integrate TypeScript with React for type safety');
        path.push('TypeScript best practices for React components and hooks');
      }
    }
    
    if (techStack.frontend.vue) {
      frontendTechs.push('Vue.js');
      path.push('Learn Vue.js fundamentals (components, directives, computed properties)');
      path.push('State management with Vuex or Pinia');
    }
    
    if (techStack.frontend.angular) {
      frontendTechs.push('Angular');
      path.push('Master Angular components, services, and dependency injection');
      path.push('Learn RxJS for reactive programming in Angular');
    }
    
    if (techStack.frontend.svelte) {
      frontendTechs.push('Svelte');
      path.push('Learn Svelte components and reactivity');
      path.push('State management with Svelte stores');
    }
    
    // Add general frontend topics if specific framework not mentioned
    if (frontendTechs.length === 0 && (goalsLower.includes('frontend') || goalsLower.includes('ui') || goalsLower.includes('design'))) {
      path.push('Deep dive into modern JavaScript (ES6+ features, async/await, closures)');
      path.push('Master CSS Grid and Flexbox for modern layouts');
      path.push('Learn responsive design principles and mobile-first development');
    }
    
    // Add backend technologies to path based on the user's problem context
    const backendTechs = [];
    
    if (techStack.backend.node || techStack.backend.express) {
      backendTechs.push('Node.js');
      if (techStack.backend.express) backendTechs.push('Express.js');
      
      if (isBeginner) {
        path.push('Learn Node.js fundamentals (modules, event loop, file system)');
        path.push('Build RESTful APIs with Express.js');
      } else {
        path.push('Advanced Node.js patterns (streams, worker threads, clustering)');
        path.push('Design scalable and maintainable Express.js applications');
      }
      
      if (isIntermediate || isAdvanced) {
        path.push('Implement authentication & authorization (JWT, OAuth, sessions)');
        path.push('API security best practices (rate limiting, CORS, sanitization)');
        path.push('Error handling and logging strategies');
      }
    }
    
    if (techStack.backend.python) {
      backendTechs.push('Python');
      if (goalsLower.includes('django')) {
        path.push('Master Django framework (models, views, templates)');
        path.push('Build REST APIs with Django REST Framework');
      } else if (goalsLower.includes('flask')) {
        path.push('Learn Flask framework (routes, templates, blueprints)');
        path.push('Build RESTful APIs with Flask-RESTful or FastAPI');
      } else {
        path.push('Master Python for backend development');
        path.push('Build web applications with your preferred Python framework');
      }
    }
    
    if (techStack.backend.java) {
      backendTechs.push('Java');
      if (goalsLower.includes('spring')) {
        path.push('Master Spring Boot framework');
        path.push('Build RESTful APIs with Spring Web');
      } else {
        path.push('Learn Java for backend development');
        path.push('Build web applications with Java EE or Spring');
      }
    }
    
    // Add general backend topics if specific technology not mentioned
    if (backendTechs.length === 0 && (goalsLower.includes('backend') || goalsLower.includes('api') || goalsLower.includes('server'))) {
      path.push('Learn about RESTful API design principles');
      path.push('Understand HTTP methods and status codes');
      path.push('API documentation with OpenAPI/Swagger');
    }
    
    // Add database technologies based on the user's problem context
    const dbTechs = [];
    
    if (techStack.database.mongodb) {
      dbTechs.push('MongoDB');
      path.push('Master MongoDB fundamentals (collections, documents, queries)');
      path.push('Data modeling with MongoDB (relationships, schema design)');
      
      if (techStack.backend.node) {
        path.push('Integrate MongoDB with Node.js using Mongoose ODM');
        path.push('Advanced Mongoose features (middleware, validation, aggregation)');
      }
    }
    
    if (techStack.database.postgresql || techStack.database.mysql || techStack.database.sql) {
      const dbType = techStack.database.postgresql ? 'PostgreSQL' : 
                    techStack.database.mysql ? 'MySQL' : 'SQL';
      dbTechs.push(dbType);
      
      path.push(`Master ${dbType} (tables, relationships, complex queries, transactions)`);
      path.push('Database optimization and indexing strategies');
      
      if (techStack.backend.node) {
        const orm = techStack.database.postgresql ? 'Sequelize/TypeORM' : 
                   techStack.database.mysql ? 'Sequelize/TypeORM' : 'Knex.js/TypeORM';
        path.push(`Connect ${dbType} with Node.js using ${orm}`);
      }
    }
    
    if (techStack.database.firebase) {
      dbTechs.push('Firebase');
      path.push('Learn Firebase Realtime Database and Firestore');
      path.push('Implement authentication and security rules');
    }
    
    // Add general database topics if no specific database mentioned
    if (dbTechs.length === 0 && (goalsLower.includes('database') || goalsLower.includes('data'))) {
      path.push('Learn about different types of databases (SQL vs NoSQL)');
      path.push('Database design principles and normalization');
      path.push('Query optimization and indexing');
    }
    
    // Add advanced topics based on level
    if (isIntermediate || isAdvanced) {
      path.push('Learn about software architecture patterns (MVC, Microservices, etc.)');
      path.push('Understand CI/CD pipelines and DevOps basics');
      
      if (isAdvanced) {
        path.push('Master performance optimization techniques');
        path.push('Learn about containerization with Docker');
        path.push('Explore cloud platforms (AWS, GCP, or Azure)');
      }
    }
    
    // Add project-based learning tailored to the user's problem
    if (path.length > 0) {
      // Extract potential project ideas from the problem description
      const projectIdeas = [];
      const problemWords = goalsLower.split(/\s+/);
      const projectVerbs = ['build', 'create', 'develop', 'make', 'design'];
      
      // Look for project ideas in the problem description
      for (let i = 0; i < problemWords.length - 1; i++) {
        if (projectVerbs.includes(problemWords[i])) {
          // Try to extract the next few words as the project idea
          const idea = goals.split(/\s+/).slice(i, i + 4).join(' ');
          if (idea.length > 10) {  // Ensure it's a meaningful phrase
            projectIdeas.push(idea);
            break;
          }
        }
      }
      
      // If no project ideas were found in the problem description, generate some based on technologies
      if (projectIdeas.length === 0) {
        if (frontendTechs.length > 0) {
          projectIdeas.push(`a ${frontendTechs.join('/')} application`);
        }
        if (backendTechs.length > 0) {
          projectIdeas.push(`a ${backendTechs.join('/')} backend service`);
        }
        if (dbTechs.length > 0) {
          projectIdeas.push(`a database-powered application with ${dbTechs.join('/')}`);
        }
      }
      
      // Add the project to the learning path
      if (projectIdeas.length > 0) {
        path.push('');  // Empty line for better readability
        path.push('Project: ' + projectIdeas[0]);
        path.push('• Break down the project into smaller tasks');
        path.push('• Set up version control with Git');
        path.push('• Implement core features incrementally');
        path.push('• Write tests for critical functionality');
        path.push('• Deploy and share your project');
      } else {
        // Fallback to a generic project idea
        path.push('Build a complete project that solves a real-world problem');
      }
      
      // Add deployment step if relevant to the user's problem
      if (goalsLower.includes('deploy') || goalsLower.includes('host') || goalsLower.includes('production')) {
        path.push('\nDeployment & DevOps:');
        if (techStack.devops.vercel || techStack.devops.netlify) {
          const platform = techStack.devops.vercel ? 'Vercel' : 'Netlify';
          path.push(`• Deploy your application using ${platform}`);
          path.push(`• Set up continuous deployment with GitHub`);
        } else if (techStack.devops.heroku) {
          path.push('Deploy your application on Heroku');
          path.push('Set up environment variables and add-ons');
        } else if (techStack.devops.aws || techStack.devops.azure || techStack.devops.gcp) {
          const cloud = techStack.devops.aws ? 'AWS' : techStack.devops.azure ? 'Azure' : 'Google Cloud';
          path.push(`Deploy your application on ${cloud}`);
          path.push('Set up CI/CD pipelines');
          path.push('Configure monitoring and logging');
        } else {
          path.push('Learn to deploy your application (choose a platform based on your needs)');
          path.push('• Frontend: Vercel, Netlify, GitHub Pages');
          path.push('• Backend: Heroku, Railway, Render, or cloud providers');
        }
      }
    }

    // Determine focus area based on user goals
    // goalsLower is already defined above
    let focusArea = 'web development';
    
    if ((goalsLower.includes('frontend') || goalsLower.includes('front end') || 
         goalsLower.includes('react') || goalsLower.includes('vue') || 
         goalsLower.includes('angular') || goalsLower.includes('ui') || 
         goalsLower.includes('ux') || goalsLower.includes('design')) &&
        !goalsLower.includes('backend') && !goalsLower.includes('node') && !goalsLower.includes('api')) {
      focusArea = 'frontend development';
    } else if ((goalsLower.includes('backend') || goalsLower.includes('back end') || 
                goalsLower.includes('server') || goalsLower.includes('api') || 
                goalsLower.includes('database') || goalsLower.includes('node')) &&
               !goalsLower.includes('frontend') && !goalsLower.includes('react') && 
               !goalsLower.includes('vue') && !goalsLower.includes('angular')) {
      focusArea = 'backend development';
    } else if (path.length > 0) {
      // If we've identified specific topics, use those to determine focus
      const frontendKeywords = ['html', 'css', 'javascript', 'react', 'vue', 'angular', 'ui', 'ux', 'design'];
      const backendKeywords = ['node', 'express', 'api', 'server', 'database', 'mongodb', 'postgres', 'sql'];
      
      const frontendCount = frontendKeywords.filter(kw => goalsLower.includes(kw)).length;
      const backendCount = backendKeywords.filter(kw => goalsLower.includes(kw)).length;
      
      if (frontendCount > backendCount) {
        focusArea = 'frontend-focused development';
      } else if (backendCount > frontendCount) {
        focusArea = 'backend-focused development';
      } else {
        focusArea = 'web development';
      }
    }

    // Adjust path based on experience level
    let adjustedPath = [...path]; // Start with our custom path
    
    if (level === 'beginner') {
      // Keep all topics but add some beginner-friendly explanations
      adjustedPath = adjustedPath.map(topic => 
        topic.startsWith('Master') ? topic : `Learn ${topic.toLowerCase()}`
      );
    } else if (level === 'intermediate') {
      // Skip very basic topics for intermediates
      adjustedPath = adjustedPath.filter(topic => 
        !topic.toLowerCase().includes('fundamentals') &&
        !topic.toLowerCase().includes('learn html')
      );
    } else {
      // Advanced users get more challenging topics
      adjustedPath = adjustedPath.filter(topic => 
        !topic.toLowerCase().includes('fundamentals') &&
        !topic.toLowerCase().includes('learn ')
      );
      
      if (adjustedPath.length < 5) {
        // Add advanced topics if we don't have enough
        if (focusArea.includes('frontend')) {
          adjustedPath.push('Advanced performance optimization techniques');
          adjustedPath.push('Web accessibility (a11y) best practices');
          adjustedPath.push('Progressive Web App (PWA) development');
        } else if (focusArea.includes('backend')) {
          adjustedPath.push('System design and architecture patterns');
          adjustedPath.push('High availability and scaling strategies');
          adjustedPath.push('Advanced database optimization');
        }
      }
    }

    // Add personalized topics based on goals
    if (goalsLower.includes('job') || goalsLower.includes('career')) {
      adjustedPath.push('Build a professional portfolio website');
      adjustedPath.push('Create an impressive GitHub profile');
      adjustedPath.push('Prepare for technical interviews (DSA, system design)');
      adjustedPath.push('Learn how to write a tech resume and cover letter');
    }

    if (goalsLower.includes('freelance') || goalsLower.includes('freelancing')) {
      adjustedPath.push('Learn how to find and manage clients');
      adjustedPath.push('Understand project scoping and pricing');
      adjustedPath.push('Learn about contracts and legal considerations');
      adjustedPath.push('Build a portfolio of client projects');
    }

    const timeMap = {
      '5-10 hours': 8,
      '10-15 hours': 12,
      '15-20 hours': 16,
      '20+ hours': 20
    };

    const weeks = timeMap[time] || 12;
    const stepsPerWeek = Math.max(1, Math.ceil(adjustedPath.length / weeks));
    
    const weeklyRoadmap = [];
    for (let i = 0; i < adjustedPath.length; i += stepsPerWeek) {
      weeklyRoadmap.push({
        week: Math.floor(i / stepsPerWeek) + 1,
        steps: adjustedPath.slice(i, i + stepsPerWeek)
      });
    }

    // Helper function to get practice problems based on filters
    const getPracticeProblems = (focusArea, level, filters) => {
      const allProblems = [
        // Frontend Problems
        {
          id: 1,
          title: 'Build a Todo App',
          description: 'Create a responsive todo application with React',
          difficulty: 'Medium',
          category: 'projects',
          platform: 'Frontend Mentor',
          technology: 'React',
          link: 'https://reactjs.org/tutorial/tutorial.html',
          video: 'https://youtube.com/embed/w7ejDZ8SWv8',
          resources: [
            'React Documentation: https://reactjs.org/docs/getting-started.html',
            'React Hooks Guide: https://reactjs.org/docs/hooks-intro.html'
          ]
        },
        {
          id: 2,
          title: 'Responsive Layout',
          description: 'Create a responsive layout using CSS Grid and Flexbox',
          difficulty: 'Easy',
          category: 'layout',
          platform: 'Frontend Mentor',
          technology: 'CSS',
          link: 'https://www.frontendmentor.io/challenges',
          video: 'https://youtube.com/embed/0xMQfnTU6oo',
          resources: [
            'CSS Grid Guide: https://css-tricks.com/snippets/css/complete-guide-grid/',
            'Flexbox Froggy: https://flexboxfroggy.com/'
          ]
        },
        
        // Backend Problems
        {
          id: 3,
          title: 'REST API with Node.js',
          description: 'Build a RESTful API with Node.js and Express',
          difficulty: 'Medium',
          category: 'backend',
          platform: 'FreeCodeCamp',
          technology: 'Node.js',
          link: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
          video: 'https://youtube.com/embed/pKd0Rpw7O48',
          resources: [
            'Express.js Documentation: https://expressjs.com/',
            'REST API Best Practices: https://www.freecodecamp.org/news/rest-api-best-practices/'
          ]
        },
        
        // Algorithm Problems
        {
          id: 4,
          title: 'Two Sum',
          description: 'Find two numbers that add up to a target sum',
          difficulty: 'Easy',
          category: 'algorithms',
          platform: 'LeetCode',
          technology: 'JavaScript',
          link: 'https://leetcode.com/problems/two-sum/',
          video: 'https://youtube.com/embed/KLlXCFG5TnA',
          resources: [
            'Big O Notation: https://www.freecodecamp.org/news/big-o-notation-explained/',
            'JavaScript Array Methods: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array'
          ]
        },
        
        // System Design
        {
          id: 5,
          title: 'Design Twitter',
          description: 'Design a simplified version of Twitter',
          difficulty: 'Hard',
          category: 'system design',
          platform: 'Grokking',
          technology: 'System Design',
          link: 'https://www.educative.io/courses/grokking-the-system-design-interview',
          video: 'https://youtube.com/embed/xZ7F_v1Wufk',
          resources: [
            'System Design Primer: https://github.com/donnemartin/system-design-primer',
            'Scalability Basics: https://www.lecloud.net/tagged/scal/'
          ]
        },
        
        // Debugging
        {
          id: 6,
          title: 'Debug Memory Leak',
          description: 'Identify and fix a memory leak in a Node.js application',
          difficulty: 'Hard',
          category: 'debugging',
          platform: 'Node.js Docs',
          technology: 'Node.js',
          link: 'https://nodejs.org/en/docs/guides/diagnostics/memory/using-memory-cpupprof/',
          video: 'https://youtube.com/embed/0oAxLayoOWQ',
          resources: [
            'Node.js Debugging Guide: https://nodejs.org/en/docs/guides/debugging-getting-started/',
            'Chrome DevTools: https://developers.google.com/web/tools/chrome-devtools/'
          ]
        }
      ];
      
      // Filter problems based on focus area and level
      let filteredProblems = allProblems.filter(problem => {
        // Filter by focus area
        const focusMatch = 
          focusArea.includes('frontend') && problem.technology.match(/(React|CSS|JavaScript)/) ||
          focusArea.includes('backend') && problem.technology.match(/(Node\.js|Database|API)/) ||
          focusArea === 'web development';
        
        // Filter by level
        const levelMatch = 
          (level === 'beginner' && problem.difficulty === 'Easy') ||
          (level === 'intermediate' && ['Easy', 'Medium'].includes(problem.difficulty)) ||
          (level === 'advanced');
        
        // Apply filters
        const categoryMatch = filters.category === 'all' || problem.category === filters.category;
        const platformMatch = filters.platform === 'all' || problem.platform === filters.platform;
        const techMatch = filters.technology === 'all' || problem.technology === filters.technology;
        const searchMatch = problem.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                           problem.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
        
        return focusMatch && levelMatch && categoryMatch && platformMatch && techMatch && searchMatch;
      });
      
      return filteredProblems;
    };

    return {
      title: 'Your Personalized Web Development Roadmap',
      description: `A ${weeks}-week learning path to ${goals || 'master web development'}`,
      weeks: weeklyRoadmap,
      totalWeeks: weeks,
      focusAreas: focusArea === 'frontend' ? 'Frontend Development' :
                 focusArea === 'backend' ? 'Backend Development' :
                 'Full-Stack Development',
      focusArea: focusArea,
      personalizedTips: getPersonalizedTips(goals, level),
      practiceProblems: getPracticeProblems(focusArea, level)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    if (!formData.goals.trim()) {
      toast.error('Please enter your learning goals');
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate the roadmap directly using the existing function
      const generatedRoadmap = RoadmapPage.generateAIPoweredRoadmap(
        formData.goals,
        formData.time_availability,
        formData.current_level
      );
      
      setRoadmap(generatedRoadmap);
      setStep('roadmap');
      
      // Scroll to the roadmap section
      setTimeout(() => {
        document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
      toast.success('Roadmap generated successfully!');
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast.error('Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderWeek = (weekData) => {
    return (
      <div key={weekData.week} className="mb-8">
        <h3 className="text-xl font-semibold text-cyan-400 mb-3">Week {weekData.week}</h3>
        <div className="space-y-2 pl-4 border-l-2 border-cyan-500/20">
          {weekData.steps.map((step, idx) => (
            <div key={idx} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getPersonalizedTips = (goals, level) => {
    const tips = [];
    const goalsLower = goals.toLowerCase();
    
    if (level === 'beginner') {
      tips.push('Start with small projects to build confidence');
      tips.push('Focus on understanding core concepts before frameworks');
      tips.push('Practice coding daily, even if it\'s just for 30 minutes');
    } else if (level === 'intermediate') {
      tips.push('Start building more complex projects to challenge yourself');
      tips.push('Contribute to open source projects to gain experience');
      tips.push('Learn about design patterns and system design');
    } else {
      tips.push('Focus on mastering advanced concepts and optimizations');
      tips.push('Mentor others to reinforce your knowledge');
      tips.push('Stay updated with the latest industry trends and tools');
    }

    if (goalsLower.includes('job') || goalsLower.includes('career')) {
      tips.push('Network with professionals in your desired field');
      tips.push('Attend tech meetups and conferences');
      tips.push('Prepare for technical interviews with mock interviews');
    }

    if (goalsLower.includes('freelance') || goalsLower.includes('freelancing')) {
      tips.push('Create a professional portfolio website');
      tips.push('Set up a professional invoicing system');
      tips.push('Learn about contracts and legal requirements for freelancers');
    }

    return tips;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {step === 'questions' ? 'Create Your Learning Roadmap' : roadmap?.title || 'Your Learning Path'}
          </h1>
          {step === 'roadmap' && roadmap?.description && (
            <p className="text-gray-600 dark:text-gray-300">{roadmap.description}</p>
          )}
        </div>

        {step === 'questions' && (
          <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="goals" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  What are your learning goals? *
                </Label>
                <Textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                  rows={3}
                  placeholder="E.g., Build a portfolio website, Get a job at a tech company, Master algorithms..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="time_availability" className="text-slate-200 text-sm font-medium">
                  How much time can you dedicate per week? *
                </Label>
                <Select
                  value={formData.time_availability}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, time_availability: value }))}
                  required
                >
                  <SelectTrigger className="mt-2 bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select time commitment" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
                    <SelectItem value="5-10 hours">5-10 hours/week</SelectItem>
                    <SelectItem value="10-15 hours">10-15 hours/week</SelectItem>
                    <SelectItem value="15-20 hours">15-20 hours/week</SelectItem>
                    <SelectItem value="20+ hours">20+ hours/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="current_level" className="text-slate-200 text-sm font-medium">
                  Current skill level in this track? *
                </Label>
                <Select
                  value={formData.current_level}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, current_level: value }))}
                  required
                >
                  <SelectTrigger className="mt-2 bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
                    <SelectItem value="beginner">Beginner (0-6 months experience)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (6-12 months experience)</SelectItem>
                    <SelectItem value="advanced">Advanced (1+ years experience)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating Roadmap...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate My Roadmap
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === 'roadmap' && roadmap && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700/50">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-cyan-500 mb-2">{roadmap.title}</h1>
                <p className="text-gray-600 dark:text-gray-300">{roadmap.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Focus Area: {roadmap.focusAreas} • {roadmap.totalWeeks} weeks
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white/5 p-6 rounded-xl border border-gray-200/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">Focus Area</h3>
                  </div>
                  <p className="text-gray-300">
                    {roadmap.focusAreas}
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-gray-200/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">Duration</h3>
                  </div>
                  <p className="text-gray-300">
                    {roadmap.totalWeeks} weeks at {formData.time_availability}/week
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-gray-200/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">Level</h3>
                  </div>
                  <p className="text-gray-300 capitalize">
                    {formData.current_level}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Personalized Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {roadmap.personalizedTips?.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 bg-white/5 p-4 rounded-lg">
                      <span className="text-cyan-400">•</span>
                      <p className="text-gray-300">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">Your Learning Path</h3>
                {roadmap.weeks.map(renderWeek)}
              </div>

              {/* Enhanced Practice Problems Section */}
              <div className="mt-12 bg-white/5 border border-gray-200/10 rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2 mb-4 md:mb-0">
                    <Code className="w-6 h-6" />
                    Practice Problems
                  </h3>
                  
                  {/* Search Bar */}
                  <div className="w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search problems..."
                      className="w-full bg-white/5 border border-gray-200/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={problemFilters.searchQuery}
                      onChange={(e) => setProblemFilters({...problemFilters, searchQuery: e.target.value})}
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select 
                      className="w-full bg-white/5 border border-gray-200/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={problemFilters.category}
                      onChange={(e) => setProblemFilters({...problemFilters, category: e.target.value})}
                    >
                      <option value="all">All Categories</option>
                      <option value="algorithms">Algorithms</option>
                      <option value="system design">System Design</option>
                      <option value="debugging">Debugging</option>
                      <option value="projects">Projects</option>
                      <option value="layout">Layout & Design</option>
                      <option value="backend">Backend</option>
                    </select>
                  </div>
                  
                  {/* Platform Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Platform</label>
                    <select 
                      className="w-full bg-white/5 border border-gray-200/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={problemFilters.platform}
                      onChange={(e) => setProblemFilters({...problemFilters, platform: e.target.value})}
                    >
                      <option value="all">All Platforms</option>
                      <option value="LeetCode">LeetCode</option>
                      <option value="HackerRank">HackerRank</option>
                      <option value="CodeWars">CodeWars</option>
                      <option value="Frontend Mentor">Frontend Mentor</option>
                      <option value="FreeCodeCamp">FreeCodeCamp</option>
                      <option value="Node.js Docs">Node.js Docs</option>
                      <option value="Grokking">Grokking</option>
                    </select>
                  </div>
                  
                  {/* Technology Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Technology</label>
                    <select 
                      className="w-full bg-white/5 border border-gray-200/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={problemFilters.technology}
                      onChange={(e) => setProblemFilters({...problemFilters, technology: e.target.value})}
                    >
                      <option value="all">All Technologies</option>
                      <option value="React">React</option>
                      <option value="Node.js">Node.js</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="CSS">CSS</option>
                      <option value="System Design">System Design</option>
                    </select>
                  </div>
                </div>

                {/* Problems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getPracticeProblems(roadmap.focusArea, formData.current_level, problemFilters).map((problem) => (
                    <div key={problem.id} className="bg-white/5 rounded-xl border border-gray-200/10 hover:border-cyan-500/50 transition-all overflow-hidden">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-white text-lg">{problem.title}</h4>
                            <span className="inline-block text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 mt-1">
                              {problem.platform}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-red-500/10 text-red-400'
                          }`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4">{problem.description}</p>
                        
                        {/* Video Preview */}
                        {problem.video && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <iframe 
                              width="100%" 
                              height="200" 
                              src={problem.video}
                              title={problem.title}
                              frameBorder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                              className="rounded-lg"
                            ></iframe>
                          </div>
                        )}
                        
                        {/* Resources */}
                        <div className="mb-4">
                          <p className="text-xs text-gray-400 mb-2">Resources:</p>
                          <ul className="space-y-1">
                            {problem.resources.map((resource, idx) => (
                              <li key={idx} className="text-xs text-cyan-400 hover:underline">
                                <a href={resource.split(': ')[1]} target="_blank" rel="noopener noreferrer">
                                  {resource.split(': ')[0]}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300">
                            {problem.technology}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300">
                            {problem.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/30 px-5 py-3 border-t border-gray-200/10 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                          onClick={() => window.open(problem.link, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Solve on {problem.platform}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* No Results Message */}
                {getPracticeProblems(roadmap.focusArea, formData.current_level, problemFilters).length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-400">No problems match your current filters. Try adjusting your search criteria.</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-4 text-cyan-400 hover:bg-cyan-500/10"
                      onClick={() => setProblemFilters({
                        category: 'all',
                        platform: 'all',
                        technology: 'all',
                        searchQuery: ''
                      })}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setStep('questions')}
                  variant="outline"
                  className="border-cyan-500 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-900/50"
                >
                  Modify My Plan
                </Button>
                <Button
                  onClick={() => window.print()}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Print or Save as PDF
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;