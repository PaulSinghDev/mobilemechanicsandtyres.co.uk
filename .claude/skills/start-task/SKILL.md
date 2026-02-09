---
name: start-task
description: Start a new coding task by creating and pushing a clean feature branch.
---

# Start Task Workflow

ALWAYS use this skill when the user asks to start a new feature, fix a bug, or begins a new coding task, especially if we are currently on the 'main' or 'master' branch.

## Procedures

1.  **Generate Branch Name**: Create a kebab-case branch name based on the task description (e.g., `feat/user-login` or `fix/memory-leak`).
2.  **Checkout**: Run `git checkout -b <branch_name>`.
3.  **Push**: Run `git push -u origin <branch_name>`.
4.  **Report**: Inform the user the branch is ready and you are starting work.

## Restrictions

- Do not ask for permission to run the git commands; just do them as part of the setup.
- Ensure the branch name is valid (no spaces, special characters).
