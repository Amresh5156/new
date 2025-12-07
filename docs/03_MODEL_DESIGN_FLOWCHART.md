# Model Design - Process Flow Charts

## 1. Student Learning Flow

\`\`\`
┌──────────────────┐
│  Student Logs In │
│ (No auth needed) │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│  View Dashboard      │
│ - Overall Progress   │
│ - Topic Mastery      │
│ - Recent Activity    │
└────────┬─────────────┘
         │
         ▼
    ┌────────────────────────────────────┐
    │   Choose Learning Activity         │
    │                                    │
    │   ┌─────────────────────────────┐  │
    │   │  1. Take New Quiz           │  │
    │   │  2. View Weak Areas         │  │
    │   │  3. Get Recommendations     │  │
    │   │  4. Study Notes             │  │
    │   │  5. Review Content          │  │
    │   └─────────────────────────────┘  │
    └────┬───────────────────────────────┘
         │
         ├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
         │              │              │              │              │              │
         ▼              ▼              ▼              ▼              ▼              ▼
    ┌─────────┐   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐
    │ Quiz    │   │Analytics │  │Recomm.   │  │Notes     │  │Content   │  │Dashboard  │
    │Flow     │   │Flow      │  │Flow      │  │Flow      │  │Flow      │  │Back       │
    └─────────┘   └──────────┘  └──────────┘  └──────────┘  └──────────┘  └───────────┘
         │              │              │              │              │              │
         └──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
                                      │
                                      ▼
                          ┌──────────────────────┐
                          │  Continue Learning?  │
                          └──────┬───────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                   YES                       NO
                    │                         │
                    ▼                         ▼
              ┌──────────────┐         ┌──────────────┐
              │ Repeat Flow  │         │    Logout    │
              └──────────────┘         └──────────────┘
\`\`\`

## 2. Quiz Generation & Taking Flow

\`\`\`
┌──────────────────────────┐
│ User Clicks "Take Quiz"  │
└────────────┬─────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Quiz Selector Page             │
│ - Select Topic                  │
│ - Choose Difficulty Level       │
│ - Set Quiz Length               │
└────────────┬────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  Generate Personalized Quiz        │
│                                    │
│  1. Get User Progress Data         │
│  2. Analyze Weak Areas            │
│  3. Select Questions:             │
│     - 40% Easy (Confidence)        │
│     - 40% Medium (Challenge)       │
│     - 20% Hard (Stretch Goal)      │
│  4. Randomize Options             │
│                                    │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  Quiz Taking Interface            │
│                                    │
│  For Each Question:               │
│  ├─ Display Question              │
│  ├─ Show Options (A, B, C, D)     │
│  ├─ Allow Answer Selection        │
│  ├─ Show Timer (if applicable)    │
│  ├─ Mark for Review (optional)    │
│  └─ Next Question Button          │
│                                    │
│  Features:                         │
│  • Progress Bar                    │
│  • Question Counter               │
│  • Flag/Bookmark Questions        │
│  • Skip Questions (optional)      │
│                                    │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  Submit Quiz for Evaluation       │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  Calculate Quiz Results           │
│                                    │
│  1. Compare Answers vs Correct    │
│  2. Calculate Score               │
│     Score = (Correct / Total) × 100
│  3. Determine Accuracy            │
│  4. Identify Wrong Topics         │
│  5. Update Progress Data          │
│                                    │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  Display Results Page             │
│                                    │
│  • Overall Score                  │
│  • Time Taken                     │
│  • Accuracy Percentage            │
│  • Questions Breakdown            │
│  • Detailed Explanations          │
│  • Performance Analysis           │
│                                    │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  Update Learning Profile          │
│                                    │
│  • Mastery Level = Avg Score      │
│  • Total Attempts += 1            │
│  • Track Weak Areas               │
│  • Update Last Practiced Date     │
│                                    │
└────────────┬───────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Return to Dashboard             │
└──────────────────────────────────┘
\`\`\`

## 3. ML Analysis - Weak Areas Identification Flow

\`\`\`
┌─────────────────────────────────┐
│  Trigger Analysis               │
│  (After Quiz / On Demand)       │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Collect User Data              │
│                                 │
│  • All Quiz Attempts           │
│  • Questions Answered          │
│  • Correct/Incorrect Patterns  │
│  • Time per Question           │
│  • Topic Coverage              │
│                                 │
└────────────┬────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Algorithm 1: Accuracy Analysis  │
│                                  │
│  For Each Topic:                 │
│  1. accuracy = correct / total   │
│  2. IF accuracy < 60%            │
│     THEN weak_area = TRUE        │
│  3. severity = 100 - accuracy    │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Algorithm 2: Difficulty Filter  │
│                                  │
│  IF (easy questions passed AND   │
│      hard questions failed)      │
│     THEN strength = specific     │
│  ELSE IF all levels failing      │
│     THEN strength = fundamental  │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Algorithm 3: Recency Weighting  │
│                                  │
│  For Last 10 Attempts:           │
│  1. recent_accuracy = avg        │
│  2. IF recent worse than avg     │
│     THEN increase_priority       │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Algorithm 4: Pattern Detection  │
│                                  │
│  IF same questions wrong multiple times:
│  THEN confidence_level = LOW     │
│                                  │
│  IF improved trend:              │
│  THEN remove_from_weak           │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Generate Weak Areas Report      │
│                                  │
│  Ranked by:                      │
│  1. Severity (lowest accuracy)   │
│  2. Frequency (most attempts)    │
│  3. Recency (recent failures)    │
│  4. Importance (prerequisites)   │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Display in Analytics Dashboard  │
│  & Use for Recommendations       │
└──────────────────────────────────┘
\`\`\`

## 4. Recommendation Engine Flow

\`\`\`
┌──────────────────────────────────┐
│  Trigger Recommendations         │
│  (After Analysis)                │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Get User Weak Areas             │
│  & Learning Profile              │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Content Discovery               │
│                                  │
│  For Each Weak Area:             │
│  1. Query YouTube API            │
│  2. Query GitHub API             │
│  3. Filter by relevance          │
│  4. Sort by popularity           │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Relevance Scoring               │
│                                  │
│  score = (0.4 × topic_match) +   │
│           (0.3 × difficulty) +   │
│           (0.2 × popularity) +   │
│           (0.1 × recency)        │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Filter & Rank Results           │
│                                  │
│  Keep: score ≥ 0.6              │
│  Sort: descending by score       │
│  Limit: Top 10 per weak area     │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Recommendation Types:           │
│                                  │
│  • YouTube: Tutorials, Lectures │
│  • GitHub: Code Examples, Repos │
│  • Medium: Articles, Blogs      │
│  • Documentation: Guides         │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Display to User                 │
│                                  │
│  Sort by:                        │
│  1. Relevance                    │
│  2. Resource Type Preference     │
│  3. User Rating                  │
│  4. Learner Level                │
│                                  │
└──────────────────────────────────┘
\`\`\`

## 5. Progress Update Flow

\`\`\`
┌──────────────────────────┐
│  User Completes Activity │
│  (Quiz/Assignment)       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Collect Performance Data        │
│                                  │
│  • Score / Accuracy             │
│  • Time Taken                   │
│  • Difficulty Level             │
│  • Questions Attempted          │
│  • Correct Answers              │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Update Progress Record          │
│                                  │
│  1. Increment total_attempts     │
│  2. Add to correct_attempts      │
│  3. Calculate new_accuracy:      │
│     = (correct_attempts /        │
│       total_attempts) × 100      │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Calculate Mastery Level         │
│                                  │
│  current_score = latest_quiz_score
│  historical_avg = previous_avg   │
│  mastery = (current_score × 0.5) │
│          + (historical_avg × 0.5)│
│                                  │
│  IF mastery ≥ 80%               │
│     THEN mark_as_mastered()     │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Update Weak Areas               │
│                                  │
│  IF accuracy < threshold         │
│     THEN add_to_weak_areas       │
│  ELSE                            │
│     THEN remove_from_weak_areas  │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Trigger Re-Analysis             │
│  (If significant change)         │
│                                  │
│  UPDATE: recommendations,        │
│          analytics dashboard,    │
│          learning suggestions    │
│                                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Notify User of Changes          │
│ (On Dashboard Update)            │
└──────────────────────────────────┘
