# Devlinks — Link Sharing App 🔗

A fully functional link sharing and profile management app built with **React** and **Vite**. This project focuses on multi-page routing, shared state management across routes, drag-and-drop reordering, client-side validation, and persistent data storage — all styled with CSS Modules.

## 🚀 Overview

The goal was to build a link sharing dashboard where users can log in, customize their social media links, set up a profile with a photo and personal details, preview their public profile page, and share it with others. The application features real-time form validation, drag-and-drop link reordering, a live phone mockup preview, and localStorage persistence.

## 🔗 Links

- **Live Site:** [View Live Demo](https://altindaselif.github.io/13-react-link-sharing-app/)
- **Code:** [View GitHub Repository](https://github.com/altindaselif/13-react-link-sharing-app)

## 💡 Key Features

- **🔐 Login & Register Flow:** Users can log in or create an account with full client-side validation — email format check, minimum 8-character password, and confirm password matching.
- **🔗 Link Management:** Add, remove, and reorder social media links via drag-and-drop. Each link has a platform dropdown and a URL input with validation on save.
- **👤 Profile Details:** Upload a profile photo (PNG/JPG), enter first name, last name, and email with real-time error feedback.
- **📱 Live Mockup Preview:** A phone mockup on the dashboard updates instantly as the user edits links and profile data, showing exactly what the public profile will look like.
- **🖥️ Preview Page:** A dedicated shareable profile page displays the user's photo, name, email, and all saved links with platform-specific colors and icons.
- **💾 Persistent Storage:** All link and profile data is saved to localStorage so changes survive page refreshes.
- **↕️ Drag & Drop Reordering:** Links can be reordered by dragging, powered by `@dnd-kit`.

## 📸 Screenshots

- [View Desktop Version](./desktop-screenshot.png)
- [View Tablet Version](./tablet-screenshot.png)
- [View Mobile Version](./mobile-screenshot.png)

## 🛠️ Technical Implementation

### 1. Component Architecture

The UI is split into focused, single-responsibility components: `Header`, `PhoneMockup`, `LinkCard`, `ProfileLinkCard`, `ProfileHeader`, `AuthInput`, `ProfileInput`, and `ToastMessage`. Page-level components (`Links`, `Profile`, `Preview`, `Login`) handle logic while smaller components stay presentational. Platform data (icons, names, IDs) is extracted into a shared `constants/platforms.js` to avoid duplication.

### 2. Shared State & Routing

The app uses React Router v7 with a nested route structure — `DashboardLayout` wraps `Links` and `Profile` as child routes, sharing `links` and `profileData` state via `useOutletContext`. This avoids prop drilling while keeping things simple without a state management library. The `Preview` page is a separate top-level route and reads from localStorage directly since it lives outside the dashboard layout.

### 3. Form Validation

Both the Login and Profile forms validate on submit and display inline error messages per field. Name and last name are checked for non-empty input; email is tested with a regex pattern; password enforces a minimum of 8 characters; confirm password is checked for equality. Errors are cleared as the user types, avoiding stale messages after correction.

### 4. Drag & Drop

Link reordering is implemented with `@dnd-kit/core` and `@dnd-kit/sortable`. The drag handle is scoped to the title area of each `LinkCard` via `attributes` and `listeners`, leaving the dropdown and URL input fully interactive without accidentally triggering a drag.

### 5. Image Upload & Preview

Profile photo upload uses a hidden `<input type="file">` triggered by a styled button via `useRef`. The selected file is read with `FileReader` and stored as a base64 string in state (and localStorage), allowing it to display immediately in both the mockup and the preview page without a backend.

### 6. CSS Modules for Scoped Styles

Each component has a co-located `.module.css` file. Dynamic class combinations are composed with template literals — for example, applying platform-specific background colors to link cards using `styles[\`bg${platform}\`]`.

## 🧰 Built With

- **React 19**
- **Vite**
- **React Router DOM v7**
- **@dnd-kit** (drag and drop)
- **CSS Modules**
- **ESLint** (with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`)
- **gh-pages** (for deployment)

## ✍️ Author

- **LinkedIn:** [Elif Altındaş](https://www.linkedin.com/in/elifaltindas/)
- **Frontend Mentor:** [@altindaselif](https://www.frontendmentor.io/profile/altindaselif)
- **GitHub:** [@altindaselif](https://github.com/altindaselif)
