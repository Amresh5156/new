export const mockTopics = [
  { id: "1", name: "Arrays", category: "Data Structures", difficulty_level: 1 },
  { id: "2", name: "Linked Lists", category: "Data Structures", difficulty_level: 2 },
  { id: "3", name: "Binary Trees", category: "Data Structures", difficulty_level: 3 },
  { id: "4", name: "Sorting Algorithms", category: "Algorithms", difficulty_level: 2 },
  { id: "5", name: "Searching Algorithms", category: "Algorithms", difficulty_level: 1 },
  { id: "6", name: "Dynamic Programming", category: "Algorithms", difficulty_level: 3 },
  { id: "7", name: "Hash Tables", category: "Data Structures", difficulty_level: 2 },
  { id: "8", name: "Graphs", category: "Data Structures", difficulty_level: 3 },
]

export const mockProgress = [
  {
    id: "1",
    topics: { id: "1", name: "Arrays", category: "Data Structures", difficulty_level: 1 },
    mastery_level: 0.85,
    total_attempts: 5,
    correct_attempts: 4,
    last_practiced: new Date(Date.now() - 1000 * 60 * 60 * 2),
    weak_areas: ["Two Pointers", "Sliding Window"],
  },
  {
    id: "2",
    topics: { id: "2", name: "Linked Lists", category: "Data Structures", difficulty_level: 2 },
    mastery_level: 0.6,
    total_attempts: 3,
    correct_attempts: 2,
    last_practiced: new Date(Date.now() - 1000 * 60 * 60 * 24),
    weak_areas: ["Cycle Detection", "Reverse Operations"],
  },
  {
    id: "3",
    topics: { id: "3", name: "Binary Trees", category: "Data Structures", difficulty_level: 3 },
    mastery_level: 0.45,
    total_attempts: 2,
    correct_attempts: 1,
    last_practiced: new Date(Date.now() - 1000 * 60 * 60 * 48),
    weak_areas: ["Tree Traversal", "Balancing"],
  },
  {
    id: "4",
    topics: { id: "4", name: "Sorting Algorithms", category: "Algorithms", difficulty_level: 2 },
    mastery_level: 0.7,
    total_attempts: 4,
    correct_attempts: 3,
    last_practiced: new Date(Date.now() - 1000 * 60 * 60 * 72),
    weak_areas: ["Quick Sort", "Merge Sort"],
  },
  {
    id: "5",
    topics: { id: "5", name: "Searching Algorithms", category: "Algorithms", difficulty_level: 1 },
    mastery_level: 0.9,
    total_attempts: 3,
    correct_attempts: 3,
    last_practiced: new Date(Date.now() - 1000 * 60 * 60 * 120),
    weak_areas: [],
  },
  {
    id: "6",
    topics: { id: "6", name: "Dynamic Programming", category: "Algorithms", difficulty_level: 3 },
    mastery_level: 0.3,
    total_attempts: 1,
    correct_attempts: 0,
    last_practiced: new Date(Date.now() - 1000 * 60 * 60 * 168),
    weak_areas: ["DP Fundamentals", "State Transitions", "Memoization"],
  },
]

export const mockQuestions = [
  {
    id: "q1",
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct_answer: "O(1)",
    explanation: "Array access by index is constant time because arrays store elements in contiguous memory locations.",
  },
  {
    id: "q2",
    question: "Which sorting algorithm has O(n log n) time complexity in the best, average, and worst cases?",
    options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
    correct_answer: "Merge Sort",
    explanation:
      "Merge Sort guarantees O(n log n) time complexity in all cases due to its divide-and-conquer approach.",
  },
  {
    id: "q3",
    question: "In a binary search tree, what is the average time complexity of search operation?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct_answer: "O(log n)",
    explanation: "In a balanced binary search tree, the search operation has O(log n) time complexity on average.",
  },
  {
    id: "q4",
    question: "What data structure uses LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correct_answer: "Stack",
    explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
  },
  {
    id: "q5",
    question: "Which of the following is NOT a valid time complexity?",
    options: ["O(1)", "O(log n)", "O(√n)", "O(n√n)"],
    correct_answer: "O(√n)",
    explanation: "While O(√n) exists in theory, it's not commonly used. O(n√n) is less common but valid.",
  },
]

export const mockRecommendations = [
  {
    id: "rec1",
    type: "youtube",
    title: "Binary Search Tree Basics - Full Tutorial",
    url: "https://www.youtube.com/watch?v=example1",
    channel: "Code with Harry",
    views: "2.5M",
    duration: "45:30",
    relevance: 95,
  },
  {
    id: "rec2",
    type: "github",
    title: "dsa-algorithms",
    url: "https://github.com/example/dsa-algorithms",
    author: "CodeMaster",
    stars: 3500,
    description: "Comprehensive DSA implementations in Python and C++",
    relevance: 88,
  },
  {
    id: "rec3",
    type: "youtube",
    title: "Dynamic Programming Masterclass",
    url: "https://www.youtube.com/watch?v=example2",
    channel: "Abdul Bari",
    views: "1.8M",
    duration: "3:45:00",
    relevance: 92,
  },
  {
    id: "rec4",
    type: "github",
    title: "leetcode-solutions",
    url: "https://github.com/example/leetcode",
    author: "CodingNinja",
    stars: 8200,
    description: "Complete solutions to LeetCode problems with explanations",
    relevance: 85,
  },
]

export const mockRecentActivity = [
  {
    id: "1",
    score: 90,
    completed_at: new Date(Date.now() - 1000 * 60 * 60 * 2),
    quizzes: {
      id: "q1",
      title: "Arrays Quiz - Easy",
      topics: {
        category: "Data Structures",
      },
    },
  },
  {
    id: "2",
    score: 70,
    completed_at: new Date(Date.now() - 1000 * 60 * 60 * 24),
    quizzes: {
      id: "q2",
      title: "Linked Lists Quiz - Medium",
      topics: {
        category: "Data Structures",
      },
    },
  },
  {
    id: "3",
    score: 80,
    completed_at: new Date(Date.now() - 1000 * 60 * 60 * 48),
    quizzes: {
      id: "q3",
      title: "Sorting Algorithms Quiz - Medium",
      topics: {
        category: "Algorithms",
      },
    },
  },
]
