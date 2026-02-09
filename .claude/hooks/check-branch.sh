#!/bin/bash

# Get current branch name
BRANCH=$(git branch --show-current 2>/dev/null)

# Define protected branches
if [[ "$BRANCH" == "main" ]] || [[ "$BRANCH" == "master" ]]; then
    echo "⚠️  PROTECTED BRANCH: You are currently on '$BRANCH'." >&2
    echo "Action blocked. Please checkout a feature branch before writing code." >&2
    exit 2 # Exit code 2 tells Claude Code to strictly BLOCK the action
fi

exit 0