# Use Case Diagram & Descriptions

## Level 1: High-Level Use Case Diagram

\`\`\`
┌────────────────────────────────────────────────────────────────┐
│                    AdaptiveLearn System                        │
│                                                                │
│  ┌──────────┐                                                 │
│  │ Student  │                                                 │
│  └────┬─────┘                                                 │
│       │                                                        │
│       │ performs                                               │
│       │                                                        │
│       │      ┌─────────────────────────────────────┐         │
│       │      │  ┌──────────────────────────────┐   │         │
│       └─────►│  │  View Learning Dashboard     │   │         │
│              │  └──────────────────────────────┘   │         │
│              │                                      │         │
│              │  ┌──────────────────────────────┐   │         │
│              │  │  Take Personalized Quiz      │   │         │
│              │  └──────────────────────────────┘   │         │
│              │                                      │         │
│              │  ┌──────────────────────────────┐   │         │
│              │  │  View Performance Analytics  │   │         │
│              │  └──────────────────────────────┘   │         │
│              │                                      │         │
│              │  ┌──────────────────────────────┐   │         │
│              │  │  Get Smart Recommendations   │   │         │
│              │  └──────────────────────────────┘   │         │
│              │                                      │         │
│              │  ┌──────────────────────────────┐   │         │
│              │  │  Create & Manage Notes       │   │         │
│              │  └──────────────────────────────┘   │         │
│              │                                      │         │
│              │  ┌──────────────────────────────┐   │         │
│              │  │  Browse Content Library      │   │         │
│              │  └──────────────────────────────┘   │         │
│              │                                      │         │
│              │  ┌──────────────────────────────┐   │         │
│              │  │  Review Learning History     │   │         │
│              │  └──────────────────────────────┘   │         │
│              │                                      │         │
│              └─────────────────────────────────────┘         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
\`\`\`

## Detailed Use Cases

### Use Case 1: View Learning Dashboard

\`\`\`
┌────────────────────────────────────────────┐
│          VIEW LEARNING DASHBOARD           │
├────────────────────────────────────────────┤
│                                            │
│ Actors: Student                            │
│                                            │
│ Preconditions:                             │
│ • Student has accessed the app             │
│ • At least one quiz attempt exists         │
│                                            │
│ Main Flow:                                 │
│ 1. Student navigates to dashboard          │
│ 2. System fetches progress data            │
│ 3. System calculates mastery levels       │
│ 4. System compiles recent activity         │
│ 5. Display dashboard with:                │
│    - Overall accuracy percentage          │
│    - Topic-wise mastery bars              │
│    - Recent quiz scores                   │
│    - Learning streaks                     │
│    - Quick action buttons                 │
│                                            │
│ Alternate Flows:                           │
│ • If no data: Show placeholder             │
│ • If data stale: Refresh from DB          │
│                                            │
│ Postconditions:                            │
│ • Dashboard displayed successfully         │
│ • User can select next action              │
│                                            │
└────────────────────────────────────────────┘
\`\`\`

### Use Case 2: Take Personalized Quiz

\`\`\`
┌────────────────────────────────────────────┐
│      TAKE PERSONALIZED QUIZ                │
├────────────────────────────────────────────┤
│                                            │
│ Actors: Student                            │
│                                            │
│ Preconditions:                             │
│ • Student on quiz selection page           │
│ • Topics available                         │
│                                            │
│ Main Flow:                                 │
│ 1. Student selects topic                   │
│ 2. Student sets difficulty level           │
│ 3. System analyzes user weak areas         │
│ 4. System generates quiz:                  │
│    - Select 10 questions                  │
│    - Distribution: 40% easy, 40% med,     │
│                    20% hard               │
│    - Randomize options                    │
│ 5. Display first question                  │
│ 6. Student answers each question           │
│    - System records response               │
│    - Display next question button          │
│ 7. After all questions:                    │
│    - Student clicks "Submit"               │
│ 8. System calculates:                      │
│    - Score: (correct / total) × 100       │
│    - Time taken                            │
│    - Accuracy per subtopic                 │
│ 9. Display results with:                   │
│    - Score and accuracy                    │
│    - Question-wise review                  │
│    - Correct answers + explanations        │
│                                            │
│ Alternate Flows:                           │
│ • Student skips question: Mark for review │
│ • Student times out: Auto-submit quiz     │
│ • Student exits: Ask for confirmation     │
│                                            │
│ Postconditions:                            │
│ • Quiz results saved                       │
│ • Progress updated                         │
│ • Recommendations regenerated              │
│                                            │
└────────────────────────────────────────────┘
\`\`\`

### Use Case 3: View Performance Analytics

\`\`\`
┌────────────────────────────────────────────┐
│    VIEW PERFORMANCE ANALYTICS              │
├────────────────────────────────────────────┤
│                                            │
│ Actors: Student                            │
│                                            │
│ Preconditions:                             │
│ • Student completed at least 1 quiz       │
│                                            │
│ Main Flow:                                 │
│ 1. Student navigates to Analytics page    │
│ 2. System retrieves all quiz attempts     │
│ 3. System performs ML analysis:           │
│    - Calculate mastery per topic          │
│    - Identify weak areas                  │
│    - Analyze performance trends           │
│    - Detect patterns                      │
│ 4. Display analytics dashboard:           │
│    - Performance graphs/charts            │
│    - Weak areas ranked by severity        │
│    - Learning velocity                    │
│    - Topic-wise accuracy breakdown        │
│    - Progress timeline                    │
│ 5. System generates insights:             │
│    - Strengths identified                 │
│    - Areas needing focus                  │
│    - Recommended learning path            │
│                                            │
│ Postconditions:                            │
│ • Analytics displayed                      │
│ • Student understands progress             │
│ • Weak areas identified                    │
│                                            │
└────────────────────────────────────────────┘
\`\`\`

### Use Case 4: Get Smart Recommendations

\`\`\`
┌────────────────────────────────────────────┐
│     GET SMART RECOMMENDATIONS              │
├────────────────────────────────────────────┤
│                                            │
│ Actors: Student, YouTube API, GitHub API  │
│                                            │
│ Preconditions:                             │
│ • Student has weak areas identified       │
│ • External APIs accessible                │
│                                            │
│ Main Flow:                                 │
│ 1. System gets top 3 weak areas           │
│ 2. For each weak area:                    │
│    - Query YouTube API                    │
│      * Search for tutorials                │
│      * Filter by relevance                │
│      * Get view count & ratings           │
│    - Query GitHub API                     │
│      * Search for code examples           │
│      * Filter by stars & recency          │
│ 3. Score each resource:                   │
│    - Topic match: 40%                     │
│    - Quality: 30%                         │
│    - Popularity: 20%                      │
│    - Recency: 10%                         │
│ 4. Filter & rank:                         │
│    - Keep score >= 0.6                    │
│    - Sort by relevance score              │
│    - Limit to top 10 per area             │
│ 5. Display recommendations:               │
│    - Grouped by weak area                 │
│    - Sorted by relevance                  │
│    - Include metadata:                    │
│      * Title, URL                         │
│      * Duration/Stars                     │
│      * Relevance Score                    │
│                                            │
│ Alternate Flows:                           │
│ • API timeout: Show cached results        │
│ • No results: Show generic recommendations
│ • User saves recommendation: Store in DB  │
│                                            │
│ Postconditions:                            │
│ • Recommendations displayed               │
│ • Student has resources to learn          │
│                                            │
└────────────────────────────────────────────┘
\`\`\`

### Use Case 5: Create & Manage Notes

\`\`\`
┌────────────────────────────────────────────┐
│      CREATE & MANAGE NOTES                 │
├────────────────────────────────────────────┤
│                                            │
│ Actors: Student                            │
│                                            │
│ Preconditions:                             │
│ • Student on notes page                   │
│                                            │
│ Main Flow - Create Note:                   │
│ 1. Student clicks "Create Note"            │
│ 2. System opens note creation dialog       │
│ 3. Student enters:                        │
│    - Note title                            │
│    - Topic selection                       │
│    - Note content                          │
│ 4. Student saves note                      │
│ 5. System stores note with:                │
│    - Unique ID                             │
│    - Timestamp                             │
│    - Topic reference                       │
│ 6. Display note in list                    │
│                                            │
│ Main Flow - Manage Notes:                  │
│ 1. Student views notes list                │
│ 2. Can perform:                            │
│    - Edit note content                     │
│    - Change topic/title                    │
│    - Delete note                           │
│    - Tag with keywords                     │
│    - Search notes                          │
│    - Filter by topic                       │
│ 3. System updates/deletes as requested    │
│                                            │
│ Postconditions:                            │
│ • Notes stored and retrievable             │
│ • Linked to topics for reference           │
│                                            │
└────────────────────────────────────────────┘
\`\`\`

### Use Case 6: Browse Content Library

\`\`\`
┌────────────────────────────────────────────┐
│    BROWSE CONTENT LIBRARY                  │
├────────────────────────────────────────────┤
│                                            │
│ Actors: Student                            │
│                                            │
│ Preconditions:                             │
│ • Student on content page                 │
│                                            │
│ Main Flow:                                 │
│ 1. System displays all topics              │
│ 2. Student can:                            │
│    - View topics by category               │
│    - Filter by difficulty level            │
│    - Search for specific topic             │
│ 3. Student selects topic to view:          │
│    - Topic description                     │
│    - Difficulty level                      │
│    - Prerequisites                         │
│    - Student's mastery level               │
│    - Number of questions available         │
│ 4. Student can:                            │
│    - View related notes                    │
│    - See learning resources                │
│    - Start quiz on topic                   │
│    - View performance on topic             │
│ 5. System shows study planner:             │
│    - Recommended learning sequence         │
│    - Prerequisite topics                   │
│    - Related advanced topics               │
│                                            │
│ Postconditions:                            │
│ • Student sees available content           │
│ • Can plan learning journey                │
│                                            │
└────────────────────────────────────────────┘
\`\`\`

## System Use Case Relationships

\`\`\`
┌──────────────────────────────────────────────────────────┐
│           USE CASE RELATIONSHIPS                         │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  View Dashboard  ◄──┐                                   │
│                     │ triggers                          │
│                     ▼                                   │
│  Take Quiz ────────► View Analytics                    │
│       │                    │                           │
│       │ generates           │                           │
│       │ Quiz Score          │ uses                      │
│       └────────────────────►├────► Get Recommendations │
│                             │                           │
│                             └────► Create Notes        │
│                                                          │
│  Browse Content ──────────────────► Create Notes       │
│       │                                                 │
│       └──────────────────────────► Take Quiz           │
│                                                          │
│  All activities ──────────────────► Update Progress   │
│                                                          │
└──────────────────────────────────────────────────────────┘
\`\`\`

## Interaction Sequences

### Sequence 1: Complete Learning Cycle

\`\`\`
Student   Dashboard   Quiz      Analytics  Recommend.   Notes
   │          │        │            │           │         │
   │─ Open ──►│        │            │           │         │
   │          │        │            │           │         │
   │◄─ Display Progress─│            │           │         │
   │          │        │            │           │         │
   │─ Take Quiz─────────┼────────────┼────────────┼────────┤
   │          │        │ Generate   │           │         │
   │          │    ◄───┼─ Questions─┤           │         │
   │          │        │            │           │         │
   │─ Answer ─────────►│            │           │         │
   │   Questions│      │            │           │         │
   │          │        │            │           │         │
   │─ Submit ─────────►│            │           │         │
   │          │        │ Calculate  │           │         │
   │          │        │ Score      │           │         │
   │          │    ◄───┤ Update DB  │           │         │
   │◄─ Results─────────┤            │           │         │
   │          │        │            │           │         │
   │─ View Analytics ──┼────────────►│           │         │
   │          │        │            │ ML        │         │
   │          │        │            │ Analysis  │         │
   │◄─ Insights──────────────────────┤           │         │
   │          │        │            │           │         │
   │─ View Recommendations────────────┼──────────►│         │
   │◄─ Resources────────────────────────────────┤         │
   │          │        │            │           │         │
   │─ Create Notes────────────────────────────────────────►│
   │◄─ Confirmation────────────────────────────────────────┤
   │          │        │            │           │         │
   │─ View Dashboard ──►│            │           │         │
   │◄─ Updated Stats───┤            │           │         │
   │          │        │            │           │         │
\`\`\`

### Sequence 2: Weak Area Detection & Recommendation

\`\`\`
Student   Quiz API   Analysis   Recommend. API
   │         │          │            │
   │─ Answers ────────►│             │
   │ Quiz    │         │             │
   │         │─ Score ─┤             │
   │         │◄─────┤  │             │
   │         │  ◄───┼──┼─ Update DB ─┤
   │         │      │  │             │
   │         │      │  │ Detect      │
   │         │      │  │ Weak Areas  │
   │         │      │  │             │
   │         │      │◄─┼─ Query API ─┤
   │         │      │  │             │
   │◄─ Show ─┼──────┼──┴─ Return    ─┤
   │ Recommendations  Recommendations │
   │         │          │            │
\`\`\`

## Actor Responsibilities

### Student

\`\`\`
Primary Responsibilities:
├─ Initiate learning sessions
├─ Select topics and difficulty levels
├─ Attempt quizzes and answer questions
├─ Review performance and analytics
├─ Save and organize notes
├─ Browse available content
└─ Interact with recommendations

Expected Actions:
├─ Regular quiz practice (3-5 times/week)
├─ Review weak areas
├─ Follow recommendations
├─ Create personal notes
└─ Progress through learning path
\`\`\`

### System (AI Tutor)

\`\`\`
Core Responsibilities:
├─ Generate personalized quizzes
├─ Calculate performance metrics
├─ Identify weak areas using ML
├─ Analyze learning patterns
├─ Recommend resources
├─ Store and retrieve data
├─ Update progress tracking
└─ Maintain learning profiles

Automated Actions:
├─ Adjust difficulty based on performance
├─ Prioritize weak areas
├─ Score content recommendations
├─ Track learning streaks
├─ Calculate mastery levels
└─ Generate insights and suggestions
