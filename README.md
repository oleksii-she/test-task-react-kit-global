# React Blog App

A simple blogging application built with **Next.js**, **React**, **Redux Toolkit**, and **Firebase**. Users can create and edit blog posts. At this stage, there is no user authentication or post ownership.

## 🧰 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) – schema validation
- [nanoid](https://github.com/ai/nanoid) – unique ID generator
- [TypeScript](https://www.typescriptlang.org/)
- [React Spinners](https://www.davidhu.io/react-spinners/) – loading indicators

## 🚀 Features

- 📄 Create blog posts
- ✏️ Edit existing blog posts
- ⏳ Loading indicators for asynchronous actions
- 💾 Data stored in Firebase Realtime Database
- ❌ No authentication or user-post association (yet)

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/oleksii-she/test-task-react-kit-global.git
cd blog-app
```

### 2. Install dependencies

```bash

npm install
```

### 3. Set up Firebase environment variables

```bash

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Start the development server

```bash

npm run dev
```

### 5. Project Structure

```bash
src/
├── app/ # Next.js app directory (routes, layouts, etc.)
├── components/ # Reusable UI components
├── store/ # Redux store configuration
│ └── features/ # Redux slices
├── schemasValidation.ts # Zod schemas for form validation
├── StoreProvider.tsx # Redux provider wrapper for the app
├── types.ts # Shared TypeScript types
└── utils.ts # Utility functions
```

### 6. Available Scripts

```bash

npm run dev # Start development server
npm run build # Build the application
npm run start # Start production server
npm run lint # Run ESLint checks
```

### 7. 📌 Future Improvements

- 🔐 Add authentication and registration
- 👤 Link each blog post to a specific registered user
  -🗑️ Allow users to delete their own posts
  -📅 Display post creation and update timestamps
  -💬 Enable commenting functionality
  -🖼️ Add support for post images or cover photos

### 📄 License

This project is licensed under the MIT License.
