# Entity-Relationship Diagram (ERD)

## AdaptiveLearn Database Schema

\`\`\`
┌────────────────────────────────────────────────────────────────────────────┐
│                         DATABASE ENTITIES                                  │
└────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│         USERS                   │
├─────────────────────────────────┤
│ PK: id (UUID)                   │
│ • email (String)                │
│ • username (String)             │
│ • created_at (Timestamp)        │
│ • updated_at (Timestamp)        │
│ • total_quizzes_taken (Int)     │
│ • overall_accuracy (Float)      │
│ • total_study_hours (Int)       │
└─────────────────────────────────┘
         │
         │ 1:N
         │
         ├──────────────────────┬──────────────────────┬─────────────┐
         │                      │                      │             │
         ▼                      ▼                      ▼             ▼
    ┌─────────────┐     ┌──────────────┐    ┌──────────────┐  ┌──────────────┐
    │  PROGRESS   │     │    QUIZZES   │    │    NOTES     │  │  ANSWERS     │
    ├─────────────┤     ├──────────────┤    ├──────────────┤  ├──────────────┤
    │PK: id(UUID) │     │PK: id(UUID)  │    │PK: id(UUID)  │  │PK: id(UUID)  │
    │FK: user_id  │     │FK: user_id   │    │FK: user_id   │  │FK: quiz_id   │
    │FK: topic_id │     │FK: topic_id  │    │FK: topic_id  │  │FK: question_id
    │• mastery_lv │     │• score       │    │• title       │  │• selected    │
    │• attempts   │     │• time_taken  │    │• content     │  │• is_correct  │
    │• accuracy   │     │• difficulty  │    │• created_at  │  │• explanation │
    │• weak_areas │     │• created_at  │    │• updated_at  │  └──────────────┘
    │• last_prac  │     └──────────────┘    └──────────────┘
    └─────────────┘
         │
         │ N:1
         │
         ▼
    ┌─────────────────────────────┐
    │      TOPICS                 │
    ├─────────────────────────────┤
    │ PK: id (UUID)               │
    │ • name (String)             │
    │ • category (String)         │
    │ • description (Text)        │
    │ • difficulty_level (Int)    │
    │ • prerequisites (JSON)      │
    │ • total_questions (Int)     │
    └─────────────────────────────┘
         │
         │ 1:N
         │
         ├────────────────────┬──────────────────┐
         │                    │                  │
         ▼                    ▼                  ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │  QUESTIONS   │  │WEAK_AREAS    │  │RECOMMENDATIONS
    ├──────────────┤  ├──────────────┤  ├──────────────┤
    │PK: id(UUID)  │  │PK: id(UUID)  │  │PK: id(UUID)  │
    │FK: topic_id  │  │FK: topic_id  │  │FK: topic_id  │
    │• question    │  │• area_name   │  │• title       │
    │• options     │  │• severity    │  │• type        │
    │• correct_ans │  │• user_failed │  │• url         │
    │• explanation │  │• frequency   │  │• relevance   │
    │• difficulty  │  │• notes       │  │• source      │
    │• category    │  └──────────────┘  │• views/stars │
    └──────────────┘                     └──────────────┘
\`\`\`

## Relationship Details

### User → Progress (1:N)
- **One user has many progress records**
- Each progress tracks mastery of one topic
- Multiple attempts tracked per topic

### User → Quizzes (1:N)
- **One user takes many quizzes**
- Each quiz is associated with a topic
- Stores quiz attempts and scores

### User → Notes (1:N)
- **One user creates many notes**
- Notes are topic-specific
- Can have multiple notes per topic

### Topic → Progress (1:N)
- **One topic has many progress records**
- Multiple users track same topic
- Enables comparative analytics

### Topic → Questions (1:N)
- **One topic has many questions**
- Questions pool for quiz generation
- Different difficulty levels

### Quiz → Answers (1:N)
- **One quiz has many answers**
- One answer per question per quiz
- Tracks selected answer and correctness

### Quiz → Questions (N:M) [Implicit]
- **Many questions in one quiz**
- Questions selected from topic pool
- Different quiz instances use different questions

## Data Flow Between Entities

\`\`\`
User Starts Learning
    │
    ▼
Selects Topic
    │
    ▼
System Updates PROGRESS table
    │
    ├─► Calculates mastery_level
    ├─► Updates total_attempts
    ├─► Identifies WEAK_AREAS
    │
    ▼
Quiz Generation
    │
    ├─► Queries QUESTIONS for selected topic
    ├─► Filters by difficulty_level
    ├─► Creates QUIZZES record
    │
    ▼
Quiz Taking
    │
    ├─► For each question answered:
    │   └─► Creates ANSWERS record
    │
    ▼
Quiz Submission
    │
    ├─► Calculates score
    ├─► Updates QUIZZES record
    ├─► Updates PROGRESS (accuracy, attempts)
    ├─► Identifies new WEAK_AREAS
    ├─► Generates NOTES if needed
    │
    ▼
Analytics Generation
    │
    ├─► Queries PROGRESS data
    ├─► Analyzes WEAK_AREAS
    ├─► Generates RECOMMENDATIONS
    │
    ▼
User Views Dashboard
    │
    └─► Displays aggregated data from all tables
\`\`\`

## Database Normalization

- **1NF**: Atomic values, no repeating groups
- **2NF**: All non-key attributes depend on primary key
- **3NF**: No transitive dependencies
- **BCNF**: Each determinant is a candidate key

## Indexing Strategy

\`\`\`
PRIMARY INDEXES:
- users.id
- topics.id
- progress.id
- quizzes.id
- questions.id
- notes.id
- answers.id

FOREIGN KEY INDEXES:
- progress.user_id, topic_id
- quizzes.user_id, topic_id
- questions.topic_id
- answers.quiz_id, question_id
- notes.user_id, topic_id
- recommendations.topic_id

SEARCH INDEXES:
- users.email (authentication)
- topics.category (filtering)
- questions.difficulty_level (quiz generation)
- recommendations.relevance (sorting)
- progress.mastery_level (analytics)
