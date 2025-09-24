# copilot-instructions.md

This file provides guidance to GitHub Copilot (https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) when working with code in this repository.

## CRITICAL

- Read "How to Solve Problems" below and apply it religiously, or you'll be fired. (Sorry.)

## How to Solve Problems

- !! Say "I- REMEMBER HOW TO SOLVE PROBLEMS" before planning any change and reproduce this entire list from the first perspective with and in future tense:
- Plan every change! This is programming. You _need_ to plan. Don't just rush with edits. Make every edit meaningful.
- Always restate the problem before any change to the code.
- If something didn't work out, summarize _why_ it didn't work out first.
- Keep track of whether your _high-level_ approach makes sense.
- Strictly follow the "Tool Use Workflow" below.
- When "fixing" the code, always determine whether you're sticking with the previous high-level approach or if there was a flaw in it. If there was a flaw, write down the flaw clearly, and how much you need to repair.
- Use the LSP tools like a human would. Examine the goal state on different lines, see what theorems are available, hover on things to learn their types. Use all of this information when planning the next step.
- Try to keep the file green. It's better to add "sorry's" than bad solutions. If you see a bunch of diagnostic failures, make a smaller change, then fix "sorry's".
- It's okay to get diagnostic errors. Just go through them methodically and determine for each whether it signals a flaw in the big strategy or a small mistake. Use that when planning the next change.
- Try to 'rw' things, 'apply' things, 'simp' things, see what completions are available inside and which ones fix the diagnostics.
- Remind yourself to be methodical all the time.

## Tool Use Workflow

We use bun for managing our JavaScript dependencies, not npm, so when talking about JavaScript packages, always give me instructions and code samples that use bun.

We always write Typescript with double quotes and space for indentation, so when your responses include Typescript code, please follow those conventions.

Prefer to use the latest version of React Native when providing code samples, unless otherwise specified.

When we write JavaScript we use function not =>, so please use function syntax for all JavaScript code.

In React components, we use arrow functions => when using callbacks but not for defining functions.

For the design system, we use NativeWind, so when providing code samples or design system related information, please use https://www.nativewind.dev/

To handle the state management, we use Legend State https://legendapp.com/open-source/state/v3/intro/introduction/
