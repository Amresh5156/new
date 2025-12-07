# System Architecture Diagram

## AdaptiveLearn - AI Tutor System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER (Frontend)                             │
│                                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Landing     │  │  Dashboard   │  │    Quiz      │  │ Analytics &  │   │
│  │   Page       │  │   Page       │  │   Page       │  │ Progress     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Recomm.      │  │   Notes      │  │   Content    │  │  Navigation  │   │
│  │   Page       │  │   Page       │  │   Library    │  │  Components  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                               │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           │ HTTP/REST
                           │
┌──────────────────────────┴──────────────────────────────────────────────────┐
│                     API LAYER (Route Handlers)                               │
│                                                                               │
│  ┌─────────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │  Quiz API Routes    │  │ Analytics API    │  │ Recommend. API   │      │
│  │ - Generate Quiz     │  │ - Weak Areas     │  │ - Generate       │      │
│  │ - Submit Answers    │  │ - Refresh Stats  │  │ - Filter by Type │      │
│  │ - Calculate Score   │  │ - ML Analysis    │  │ - Save/Mark View │      │
│  └─────────────────────┘  └──────────────────┘  └──────────────────┘      │
│                                                                               │
│  ┌─────────────────────┐  ┌──────────────────┐                            │
│  │   Notes API         │  │  Content API     │                            │
│  │ - Create Note       │  │ - Get Topics     │                            │
│  │ - Update Note       │  │ - Topic Progress │                            │
│  │ - Delete Note       │  │ - Study Plan     │                            │
│  └─────────────────────┘  └──────────────────┘                            │
│                                                                               │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           │ Data Processing
                           │
┌──────────────────────────┴──────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER (Services)                           │
│                                                                               │
│  ┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │ Quiz Generator       │  │ ML Analysis      │  │ Recomm. Engine   │     │
│  │ - Question Selection │  │ - Weak Area ID   │  │ - Content Match  │     │
│  │ - Difficulty Adjust  │  │ - Performance    │  │ - Relevance Cal  │     │
│  │ - Topic Mapping      │  │   Analysis       │  │ - Ranking        │     │
│  └──────────────────────┘  └──────────────────┘  └──────────────────┘     │
│                                                                               │
│  ┌──────────────────────┐  ┌──────────────────┐                           │
│  │ Progress Tracker     │  │ Note Generator   │                           │
│  │ - Mastery Calc       │  │ - Topic Notes    │                           │
│  │ - Attempt Counter    │  │ - Weak Area Notes│                           │
│  │ - Performance Stats  │  │ - Summary Gen    │                           │
│  └──────────────────────┘  └──────────────────┘                           │
│                                                                               │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           │ Data Access
                           │
┌──────────────────────────┴──────────────────────────────────────────────────┐
│                      DATA LAYER (Mock Database)                              │
│                                                                               │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Topics Data   │  │ Progress DB  │  │ Questions DB │  │ Quizzes DB   │  │
│  │ - Name        │  │ - Mastery Lv │  │ - Questions  │  │ - Quiz ID    │  │
│  │ - Category    │  │ - Attempts   │  │ - Options    │  │ - Questions  │  │
│  │ - Difficulty  │  │ - Weak Areas │  │ - Answers    │  │ - Scores     │  │
│  └───────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                                               │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│  │  Notes Data   │  │ Recomm. DB   │  │  Activity DB │                   │
│  │ - Content     │  │ - YouTube    │  │ - Quiz Score │                   │
│  │ - Topic Ref   │  │ - GitHub     │  │ - Completion │                   │
│  │ - Created At  │  │ - Relevance  │  │ - Timestamp  │                   │
│  └───────────────┘  └──────────────┘  └──────────────┘                   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
\`\`\`

## Component Interaction Flow

\`\`\`
User Landing Page
    │
    ├─► Click "Start Learning"
    │
    ▼
Dashboard (Main Hub)
    │
    ├─► View Progress Overview
    │   └─► Displays mastery levels, total attempts, accuracy
    │
    ├─► View Topic Progress
    │   └─► Shows individual topic mastery and weak areas
    │
    ├─► Recent Activity
    │   └─► Shows completed quizzes and scores
    │
    └─► Quick Action Buttons
        ├─► Take New Quiz
        │   └─► Quiz Selection Page
        │       ├─► Choose Topic & Difficulty
        │       └─► Generate Personalized Quiz
        │           └─► Quiz Taking Interface
        │               ├─► Answer Questions
        │               └─► Submit Quiz
        │                   └─► Quiz Results Page
        │
        ├─► View Analytics
        │   ├─► ML Analysis of weak areas
        │   ├─► Performance trends
        │   └─► Personalized recommendations
        │
        ├─► Recommendations
        │   ├─► YouTube Tutorials
        │   └─► GitHub Repositories
        │
        ├─► Study Notes
        │   ├─► Create Notes
        │   └─► View Notes by Topic
        │
        └─► Content Library
            ├─► Browse Topics
            └─► Study Planner
\`\`\`

## Technology Stack

\`\`\`
┌─────────────────────────────────────────────────┐
│            Frontend Technologies                │
├─────────────────────────────────────────────────┤
│ • Next.js 16 (React Framework)                  │
│ • TypeScript (Type Safety)                      │
│ • Tailwind CSS (Styling)                        │
│ • shadcn/ui (Component Library)                 │
│ • Recharts (Data Visualization)                 │
│ • Lucide Icons (Icon Library)                   │
│ • SWR (Data Fetching & Caching)                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│            Backend Technologies                 │
├─────────────────────────────────────────────────┤
│ • Next.js API Routes (Route Handlers)           │
│ • TypeScript                                    │
│ • Mock Data Layer (Development)                 │
│ • AI SDK (Future: For ML analysis)              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│            Infrastructure                      │
├─────────────────────────────────────────────────┤
│ • Vercel (Hosting & Deployment)                 │
│ • Supabase (Database - Future)                  │
│ • External APIs:                                │
│   - YouTube API (Video Recommendations)         │
│   - GitHub API (Repo Recommendations)           │
└─────────────────────────────────────────────────┘
\`\`\`

## Deployment Architecture

\`\`\`
┌──────────────────────────────────────────────────────┐
│                  Vercel Platform                     │
│                                                      │
│  ┌────────────────────────────────────────────┐     │
│  │       Next.js Production Build             │     │
│  │  - Static Pages & Dynamic Routes           │     │
│  │  - API Routes (Serverless Functions)       │     │
│  │  - Middleware (Request Processing)         │     │
│  └────────────────────────────────────────────┘     │
│                        │                             │
│                        ▼                             │
│  ┌────────────────────────────────────────────┐     │
│  │       Content Delivery Network (CDN)       │     │
│  │  - Global Distribution                     │     │
│  │  - Caching Layer                           │     │
│  │  - Performance Optimization                │     │
│  └────────────────────────────────────────────┘     │
│                                                      │
└──────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
    ┌─────────┐   ┌──────────┐  ┌────────────┐
    │  Users  │   │ External │  │  Database  │
    │ Browser │   │   APIs   │  │ (Supabase) │
    └─────────┘   └──────────┘  └────────────┘
