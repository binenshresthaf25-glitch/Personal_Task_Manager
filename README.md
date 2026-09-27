# Personal Task Manager

## Project Description

**Personal Task Manager** is a simple, responsive React.js web application that
helps you organize your daily tasks. You can add tasks, assign them a
category, mark them complete, edit them, and delete them. All tasks are saved
automatically in your browser's `localStorage`, so your list is still there
the next time you open the app — no backend, database, or account required.

This project was built as a beginner-friendly but professionally structured
React application, using only functional components and React Hooks.

## Features

-  Add new tasks with a text description and a category
-  Edit existing tasks (text, category, and due date)
-  Delete tasks
-  Mark tasks as complete / incomplete
-  Organize tasks into 4 categories: **Work**, **Personal**, **Study**, **Urgent**
-  Filter tasks by **All**, **Active**, or **Completed**
-  Live count of remaining and completed tasks
-  Automatic saving to `localStorage`
-  Automatic loading of saved tasks on app start
-  Fully responsive design (works on desktop, tablet, and mobile)
-  **Drag-and-drop reordering** — drag any task by its handle (⠿) to reorder your list, using the native HTML5 Drag and Drop API (no library)
-  **Due dates** — set an optional due date per task; overdue, incomplete tasks are highlighted with an "Overdue" badge
-  **Dark / light theme toggle** — click the button in the header to switch themes; your choice is remembered across visits

## Technologies Used

- [React 18](https://react.dev/) (functional components + Hooks: `useState`, `useEffect`)
- [Vite](https://vitejs.dev/) — fast development server and build tool
- Plain JavaScript (no TypeScript)
- Plain CSS (no Tailwind, no CSS frameworks)
- Browser `localStorage` (no backend, no database, no external APIs)

## Project Structure

```
personal-task-manager/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── FilterButtons.jsx
│   │   └── Footer.jsx
│   │
│   ├── styles/
│   │   └── App.css
│   │
│   ├── utils/
│   │   └── dateUtils.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation Steps

1. Make sure [Node.js](https://nodejs.org/) (version 16 or higher) is installed on your computer.
2. Download or unzip this project folder.
3. Open a terminal in the project's root folder (`personal-task-manager`).
4. Install the dependencies:

   ```bash
   npm install
   ```

## Running Instructions

Start the development server:

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`) in
your web browser.

Other available scripts:

```bash
npm run build     # Create an optimized production build in /dist
npm run preview   # Preview the production build locally
```

## How to Use

1. Type a task into the input box.
2. Choose a category (Work, Personal, Study, or Urgent).
3. Click **Add Task**.
4. Click the checkbox to mark a task complete.
5. Click **Edit** to change a task's text or category, then **Save**.
6. Click **Delete** to remove a task.
7. Use the **All / Active / Completed** buttons to filter your list.
8. Your remaining and completed task counts are shown at the bottom.

## Screenshots

> Add your own screenshots here after running the app.

**Home screen (empty state):**

`[ screenshot-home-empty.png ]`

**Task list with tasks added:**

`[ screenshot-task-list.png ]`

**Editing a task:**

`[ screenshot-edit-task.png ]`

**Mobile responsive view:**

`[ screenshot-mobile-view.png ]`

## Author's Notes

This project satisfies common beginner React assignment requirements:
functional components only, `useState` and `useEffect`, props, controlled
forms, list rendering with `.map()`, conditional rendering, and persistent
state via `localStorage` — with no external backend, APIs, or asset
downloads required.
