# Contributing to Student Task Board

Thank you for contributing to Codebreakers!

---

## Contribution Rules

1. **Claim First:** Comment on an open issue and wait for assignment before writing code.
2. **Branching:** Create a descriptive branch (e.g. `git switch -c add-filter-bar`). Never commit directly to `main`.
3. **Vanilla Tech Stack:** Keep this 100% vanilla (no React, Bootstrap, or external libraries).
4. **Automated/bot PRs will be closed immediately.**

---

## How to Add Default Starter Tasks

If your contribution adds starter tasks:
1. Open `js/data.js`.
2. Add your task object to `defaultTasks` following this structure:
   ```javascript
   {
     id: 5,
     title: "Coursework Title",
     category: "Subject Name",
     dueDate: "YYYY-MM-DD",
     priority: "low | medium | high",
     status: "todo | inprogress | done"
   }

    Test locally in an Incognito window or clear browser localStorage.