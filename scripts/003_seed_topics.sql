-- Insert sample coding and DSA topics
INSERT INTO public.topics (name, description, category, difficulty_level) VALUES
-- Coding topics
('Variables and Data Types', 'Understanding different data types and variable declarations', 'coding', 1),
('Control Structures', 'If statements, loops, and conditional logic', 'coding', 2),
('Functions and Methods', 'Creating and using functions, parameters, and return values', 'coding', 2),
('Object-Oriented Programming', 'Classes, objects, inheritance, and polymorphism', 'coding', 3),
('Error Handling', 'Try-catch blocks, exceptions, and debugging techniques', 'coding', 3),
('File I/O Operations', 'Reading from and writing to files', 'coding', 3),
('Database Connectivity', 'Connecting to databases and executing queries', 'coding', 4),
('API Development', 'Creating and consuming REST APIs', 'coding', 4),
('Testing and Debugging', 'Unit testing, integration testing, and debugging strategies', 'coding', 4),
('Design Patterns', 'Common software design patterns and their applications', 'coding', 5),

-- DSA topics
('Arrays and Strings', 'Basic array operations and string manipulations', 'dsa', 1),
('Linked Lists', 'Singly, doubly, and circular linked lists', 'dsa', 2),
('Stacks and Queues', 'LIFO and FIFO data structures and their applications', 'dsa', 2),
('Trees and Binary Trees', 'Tree traversals, binary search trees, and tree operations', 'dsa', 3),
('Hash Tables', 'Hash functions, collision resolution, and hash map implementations', 'dsa', 3),
('Graphs', 'Graph representations, traversals (BFS/DFS), and graph algorithms', 'dsa', 4),
('Sorting Algorithms', 'Bubble sort, merge sort, quick sort, and their complexities', 'dsa', 3),
('Searching Algorithms', 'Linear search, binary search, and search optimizations', 'dsa', 2),
('Dynamic Programming', 'Memoization, tabulation, and solving optimization problems', 'dsa', 5),
('Greedy Algorithms', 'Greedy approach and its applications in problem solving', 'dsa', 4)
ON CONFLICT DO NOTHING;
