# Data Flow Diagram (DFD)

## Context Diagram (Level 0)

\`\`\`
                    ┌─────────────────┐
                    │     Student     │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
          ┌─────────▼─────────┐       │
          │ Learning Requests │       │
          │ Quiz Submissions  │       │
          │ Progress Updates  │       │
          │ Notes Creation    │       │
          └─────────┬─────────┘       │
                    │                 │
                    │                 │ Dashboard Data
                    │                 │ Recommendations
                    │                 │ Analytics
                    │                 │
                    ▼                 ▼
          ┌─────────────────────────────────┐
          │  AdaptiveLearn System           │
          │  (AI Tutoring Engine)           │
          └─────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
   ┌────────┐  ┌────────┐  ┌────────┐
   │YouTube │  │GitHub  │  │Database│
   │  API   │  │  API   │  │        │
   └────────┘  └────────┘  └────────┘
   (Tutorials)  (Repos)    (Mock/DB)
\`\`\`

## Level 1 - Main Processes

\`\`\`
                        ┌──────────────┐
                        │   Student    │
                        │   Browser    │
                        └──────┬───────┘
                               │
            ┌──────────────────┼──────────────────┐
            │                  │                  │
            ▼                  ▼                  ▼
      ┌──────────┐        ┌──────────┐      ┌──────────┐
      │ Requests │        │Dashboard │      │Get Data  │
      │          │        │View      │      │Request   │
      └────┬─────┘        └────┬─────┘      └────┬─────┘
           │                   │                  │
           │                   ▼                  │
           │         ┌─────────────────┐         │
           │         │  P1: Dashboard  │         │
           │         │   Aggregation   │◄────────┘
           │         └────────┬────────┘
           │                  │
           │                  ▼
           │         ┌─────────────────────┐
           │         │ Fetch User Progress │
           │         │ Calculate Stats     │
           │         └────────┬────────────┘
           │                  │
           │                  ▼
           │         ┌─────────────────────┐
           ├────────►│  P2: Quiz Engine    │
           │         │ Generate Questions  │
           │         │ Track Attempts      │
           │         └────────┬────────────┘
           │                  │
           │                  ▼
           │         ┌─────────────────────┐
           │         │ Store Quiz Results  │
           │         │ Update Progress     │
           │         └────────┬────────────┘
           │                  │
           │                  ▼
           │         ┌─────────────────────┐
           ├────────►│ P3: ML Analysis     │
           │         │ Identify Weak Areas │
           │         │ Calculate Mastery   │
           │         └────────┬────────────┘
           │                  │
           │                  ▼
           │         ┌─────────────────────┐
           ├────────►│ P4: Recommendations │
           │         │ Query External APIs │
           │         │ Score Relevance     │
           │         │ Rank Results        │
           │         └────────┬────────────┘
           │                  │
           │                  ▼
           │         ┌─────────────────────┐
           ├────────►│ P5: Notes Manager   │
           │         │ Create/Update Notes │
           │         │ Organize by Topic   │
           │         └────────┬────────────┘
           │                  │
           │                  ▼
           │         ┌─────────────────────┐
           │         │  Data Store Layer   │
           │         └────────┬────────────┘
           │                  │
           │    ┌─────────────┼─────────────┐
           │    │             │             │
           ▼    ▼             ▼             ▼
        Response  Topics   Progress  Questions
        Data      Data      Data       Data
           │
           ▼
        Display on
        Dashboard
\`\`\`

## Level 2 - Detailed Process Flows

### P1: Dashboard Aggregation

\`\`\`
                    Student Request
                          │
                          ▼
                ┌─────────────────────┐
                │  Get User ID        │
                │  (from current)     │
                └──────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    ┌────────┐        ┌────────┐        ┌────────┐
    │ Get    │        │ Get    │        │ Get    │
    │Progress│        │Recent  │        │Topics  │
    │Data    │        │Activity│        │Status  │
    └────┬───┘        └────┬───┘        └────┬───┘
         │                 │                 │
         ▼                 ▼                 ▼
    ┌──────────────────────────────────────┐
    │  Calculate Metrics:                  │
    │  • Overall Accuracy                  │
    │  • Average Mastery Level            │
    │  • Total Hours Studied              │
    │  • Topics Attempted                 │
    └────────────┬─────────────────────────┘
                 │
                 ▼
         ┌─────────────────┐
         │ Format Response │
         │ (JSON)          │
         └────────┬────────┘
                  │
                  ▼
        Send to Client
        (Browser Cache)
\`\`\`

### P2: Quiz Generation Engine

\`\`\`
        User Selects Topic
              │
              ▼
    ┌─────────────────────────┐
    │ Validate User Progress  │
    │ on Selected Topic       │
    └──────────┬──────────────┘
               │
               ▼
    ┌─────────────────────────────┐
    │ Get User Weak Areas         │
    │ (from ML Analysis)          │
    └──────────┬──────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │ Query Questions Database:       │
    │ WHERE topic_id = selected AND   │
    │   difficulty IN (easy, medium)  │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────┐
    │ Question Selection:         │
    │ - 40% Easy (confidence)     │
    │ - 40% Medium (challenge)    │
    │ - 20% Hard (stretch)        │
    └──────────┬──────────────────┘
               │
               ▼
    ┌─────────────────────────────┐
    │ Create Quiz Record:         │
    │ • Quiz ID (UUID)            │
    │ • Selected Questions        │
    │ • Start Time                │
    │ • User ID Reference         │
    └──────────┬──────────────────┘
               │
               ▼
        Return to Client
        with Quiz Data
\`\`\`

### P3: ML Analysis

\`\`\`
        Analysis Triggered
              │
              ▼
    ┌──────────────────────────┐
    │ Query All Attempts:      │
    │ SELECT * FROM quizzes    │
    │ WHERE user_id = current  │
    └──────────┬───────────────┘
               │
               ├─► Group by Topic
               │
               ├─► Calculate Metrics
               │   • Accuracy per topic
               │   • Trend analysis
               │   • Time patterns
               │
               ▼
    ┌──────────────────────────┐
    │ Weak Area Identification │
    │ IF accuracy < 60%        │
    │   THEN add_to_weak       │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Severity Classification: │
    │ • Fundamental Gap        │
    │ • Specific Concept       │
    │ • Performance Variance   │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Generate Insights:       │
    │ • Priority List          │
    │ • Recommendations        │
    │ • Learning Path          │
    └──────────┬───────────────┘
               │
               ▼
        Store & Display
        Results
\`\`\`

### P4: Recommendation Engine

\`\`\`
    Get Weak Areas
          │
          ▼
    ┌──────────────────┐
    │ For Each Weak    │
    │ Area:            │
    └────────┬─────────┘
             │
        ┌────┴────┐
        │          │
        ▼          ▼
    YouTube   GitHub
     Search    Search
        │          │
        ├────┬─────┤
        │    │     │
        ▼    ▼     ▼
    ┌────────────────────────┐
    │ Filter Results:        │
    │ • Relevance Score      │
    │ • Difficulty Level     │
    │ • Popularity Metrics   │
    │ • Quality Rating       │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Calculate Relevance:   │
    │ score = (40% match) +  │
    │         (30% quality)+ │
    │         (20% popular)+ │
    │         (10% recency)  │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Rank & Filter:         │
    │ Keep score >= 60%      │
    │ Sort descending        │
    │ Limit top 10           │
    └────────┬───────────────┘
             │
             ▼
    Display Recommendations
    to User
\`\`\`

## Data Store Overview

\`\`\`
┌─────────────────────────────────┐
│     Data Stores                 │
├─────────────────────────────────┤
│                                 │
│ DS1: Topics Database            │
│ • ID, Name, Category            │
│ • Difficulty, Prerequisites     │
│                                 │
│ DS2: Progress Records           │
│ • User-Topic Mapping            │
│ • Mastery Levels, Attempts      │
│ • Weak Areas, Last Practiced    │
│                                 │
│ DS3: Questions Pool             │
│ • Question Text, Options        │
│ • Correct Answer, Explanation   │
│ • Topic Reference, Difficulty   │
│                                 │
│ DS4: Quiz Attempts              │
│ • Quiz ID, User ID              │
│ • Questions Used, Answers       │
│ • Score, Time Taken             │
│ • Completion Status             │
│                                 │
│ DS5: Notes                      │
│ • User-generated content        │
│ • Topic References              │
│ • Creation/Edit Timestamps      │
│                                 │
│ DS6: Recommendations Cache      │
│ • Resource URLs                 │
│ • Relevance Scores              │
│ • Expiry Timestamps             │
│                                 │
└─────────────────────────────────┘
\`\`\`

## Data Flow: User Takes Quiz

\`\`\`
┌─────────────┐
│  Student    │
└──────┬──────┘
       │
       │ "Take Quiz: Arrays"
       │
       ▼
┌────────────────────────────┐
│ P2: Quiz Generation        │
│ • Select Questions         │
│ • Create Quiz Record       │
└────────┬───────────────────┘
         │
         │ Quiz Data
         │
         ▼
    ┌─────────────────┐
    │ Display Quiz    │
    │ Interface       │
    └────────┬────────┘
             │
             │ User Answers Questions
             │
             ▼
    ┌──────────────────────┐
    │ Collect Responses    │
    │ Store Answers        │
    │ Track Time           │
    └────────┬─────────────┘
             │
             │ "Submit Quiz"
             │
             ▼
    ┌──────────────────────┐
    │ P2: Calculate Score  │
    │ • Compare Answers    │
    │ • Determine Correct  │
    │ • Calculate %        │
    └────────┬─────────────┘
             │
             │ Results
             │
             ▼
    ┌──────────────────────┐
    │ Display Results      │
    │ Show Explanation     │
    └────────┬─────────────┘
             │
             │ Update Request
             │
             ▼
    ┌──────────────────────┐
    │ P3: Update Progress  │
    │ • Increment Attempts │
    │ • Store Score        │
    │ • Calc Mastery       │
    │ • Identify Weak      │
    └────────┬─────────────┘
             │
             │ Trigger Analysis
             │
             ▼
    ┌──────────────────────┐
    │ P3: ML Analysis      │
    │ • Recalc Weak Areas  │
    │ • Update Stats       │
    └────────┬─────────────┘
             │
             │ New Insights
             │
             ▼
    ┌──────────────────────┐
    │ P4: Update Recomm.   │
    │ • Fetch New Content  │
    │ • Score Relevance    │
    │ • Cache Results      │
    └────────┬─────────────┘
             │
             │ Dashboard Updated
             │
             ▼
    ┌────────────────────┐
    │ Show Recommendations
    │ on Dashboard       │
    └────────────────────┘
