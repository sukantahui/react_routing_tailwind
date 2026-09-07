# CNAT — Computer Networking & Advanced Technology

> A full-featured React + Vite educational web application for managing students, courses, fees, and study resources.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Routing & Navigation](#routing--navigation)
- [API Layer](#api-layer)
- [Build & Deployment](#build--deployment)
- [Deployment to cPanel Server](#deployment-to-cpanel-server)
- [Code Conventions](#code-conventions)

---

## Overview 

CNAT is a React 19 single-page application (SPA) built with Vite and styled using Tailwind CSS v4. It serves as a management and learning platform for a computer education institute, offering:

- Student admission and fee management
- Course management
- Authentication with role-based navigation
- A rich study section with interactive tools (code editors, visualizers, whiteboards)
- SEO-optimized public-facing pages (home, about, courses, contact)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios (with interceptors) |
| Forms | React Hook Form |
| Animations | Framer Motion |
| Icons | Lucide React, Heroicons |
| Code Highlighting | PrismJS |
| Math Rendering | KaTeX / react-katex |
| Diagrams | Mermaid |
| Code Editor | Monaco Editor |
| Drawing | Excalidraw, Fabric.js |
| Export | jsPDF, ExcelJS, JSZip, FileSaver |
| SEO | React Helmet Async |
| Alerts | SweetAlert2 |

---

## Project Structure

```
react_routing_tailwind/
├── public/                     # Static assets served as-is
├── src/
│   ├── api/
│   │   ├── api.js              # Axios instance with request/response interceptors
│   │   └── auth.service.js     # Authentication API calls
│   ├── assets/                 # Images, fonts, and static files
│   ├── common/                 # Reusable shared components (41 total)
│   │   ├── CodeBlock.jsx       # Syntax-highlighted code display
│   │   ├── EditableCodeBlock.jsx
│   │   ├── BinaryTreeVisualizer.jsx
│   │   ├── AvlTreeVisualizer.jsx
│   │   ├── LinkedListVisualizer.jsx
│   │   ├── DoublyLinkedListVisualizer.jsx
│   │   ├── QRCodeGenerator.jsx
│   │   ├── CertificateGenerator.jsx
│   │   ├── Whiteboard.jsx / StudyWhiteboard.jsx
│   │   ├── PythonPlayground.jsx
│   │   ├── MathSymbolDictionary.jsx
│   │   ├── FAQTemplate.jsx
│   │   └── ...
│   ├── components/             # Page-level feature components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AddStudent.jsx
│   │   ├── StudentAdmission.jsx
│   │   ├── AddCourse.jsx
│   │   ├── AddUser.jsx
│   │   ├── AddResult.jsx
│   │   ├── FeePaymentsList.jsx
│   │   ├── StudentFeeReceipt.jsx (Part 2, 3, 4)
│   │   ├── DatabaseBackup.jsx
│   │   ├── UserManagement.jsx
│   │   ├── SortingVisualizer.jsx
│   │   ├── TypingTest.jsx
│   │   ├── JsonFormatter.jsx
│   │   ├── AudioExtractor.jsx
│   │   ├── BigOCalculator.jsx
│   │   └── study/
│   ├── data/                   # Static JSON data files
│   ├── resolvers/              # Data resolver utilities
│   ├── routes/
│   │   ├── AppRoutes-master-roadmap.jsx  # Main route configuration (active)
│   │   ├── NavBar.jsx          # Public navigation bar
│   │   ├── AuthNavBar.jsx      # Authenticated user navigation bar
│   │   ├── ProtectedRoute.jsx  # Route guard for authenticated routes
│   │   ├── Admin.jsx           # Admin layout
│   │   ├── NotFound.jsx        # 404 page
│   │   └── HomeComponent/      # Public-facing page components
│   │       ├── Home.jsx
│   │       ├── About.jsx
│   │       ├── Courses.jsx
│   │       ├── Contact.jsx
│   │       ├── Teachers.jsx
│   │       ├── Services.jsx
│   │       ├── Facilities.jsx
│   │       ├── WhyChooseUs.jsx
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       ├── EventToday.jsx
│   │       └── LocalSEO.jsx
│   ├── seo/                    # SEO utilities and meta components
│   ├── services/               # Business logic / API service wrappers
│   │   ├── loginService.js
│   │   ├── studentService.js
│   │   ├── admissionService.jsx
│   │   ├── courseService.jsx
│   │   ├── resultService.jsx
│   │   ├── backupService.js
│   │   ├── certificateService.js
│   │   ├── simpleFeesReceiptService.js
│   │   └── visitorService.js
│   ├── App.jsx                 # Root component with auth-aware navbar logic
│   ├── main.jsx                # App entry point: BrowserRouter + HelmetProvider
│   ├── index.css               # Global CSS
│   └── input.css               # Tailwind CSS input file
├── index.html                  # HTML entry point
├── vite.config.js              # Vite + Rollup configuration
├── eslint.config.js            # ESLint flat config
├── package.json
├── .env                        # Default env (fallback)
├── .env.development            # Development environment variables
├── .env.production             # Production environment variables
└── .htaccess                   # Apache rewrite rules for SPA routing
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/sukantahui/cnat.git
cd cnat

# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## Environment Variables

The app uses Vite's `import.meta.env` for environment configuration.

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://127.0.0.1/cnat_api/public/api` |

**Files:**

- `.env` — default fallback
- `.env.development` — used during `npm run dev`
- `.env.production` — used during `npm run build`

> **Warning:** Never commit secrets or production credentials to version control.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run g:component` | Scaffold a new component using `generate-component.js` |

---

## Features

### Authentication

- JWT-based login via `loginService.js`
- Token stored in `localStorage`
- Auth-aware navbar: shows `AuthNavBar` when logged in, `NavBar` when not
- Auth state changes broadcast via custom `authChanged` DOM event and `storage` event

### Public Pages

| Page | Description |
|---|---|
| Home | Landing page with institute overview |
| About | Institution details |
| Courses | Course listings |
| Services | Offered services |
| Facilities | Available facilities |
| Teachers | Faculty profiles |
| Contact | Contact form and map |
| Events | Today's events |
| WhyChooseUs | Marketing section |

### Admin / Protected Pages

| Page | Description |
|---|---|
| Dashboard | Overview and stats |
| Student Admission | Full admission workflow |
| Add Student | Add new student records |
| Add Course | Create/manage courses |
| Add Result | Enter academic results |
| Fee Payments List | View all fee records |
| Student Fee Receipt | Generate printable receipts (4 variants) |
| User Management | Manage app users |
| Database Backup | Download/restore DB backups |

### Developer / Utility Tools

| Tool | Description |
|---|---|
| Sorting Visualizer | Animated sorting algorithm demos |
| Big-O Calculator | Algorithm complexity calculator |
| Typing Test | WPM typing practice |
| JSON Formatter | Pretty-print and validate JSON |
| Audio Extractor | Extract audio from media files |
| QR Code Generator | Generate and download QR codes |
| Certificate Generator | Create and export certificates |
| Whiteboard | Free-draw canvas (Fabric.js / Excalidraw) |
| Screen Annotator | Annotate screenshots |

### Study Section

- Syntax-highlighted code blocks for C, Python, Java, JavaScript, Shell, React
- Editable code blocks with live execution
- Python Playground (run Python in browser)
- Binary Tree, AVL Tree, Linked List, Doubly Linked List visualizers
- Math Symbol Dictionary (KaTeX)
- Mermaid diagram rendering
- VSCode Ultra Expert Guide
- Reusable FAQ accordion component

---

## Routing & Navigation

Routes are defined in `src/routes/AppRoutes-master-roadmap.jsx`.

Protected routes are wrapped with `ProtectedRoute`, which checks for a valid JWT token in `localStorage` before rendering. Unauthenticated users are redirected to `/login`.

The `App.jsx` root switches between `NavBar` (public) and `AuthNavBar` (authenticated) based on token presence.

---

## API Layer

### Axios Instance (`src/api/api.js`)

| Feature | Detail |
|---|---|
| Base URL | Read from `VITE_API_BASE_URL` env variable (auto-sanitized) |
| Request Interceptor | Attaches `Authorization: Bearer <token>` header automatically |
| Response Interceptor | Strips BOM characters, auto-parses JSON strings, handles `401` |

### Service Layer (`src/services/`)

| Service | Responsibility |
|---|---|
| `loginService.js` | Login, logout, token management |
| `studentService.js` | Student CRUD operations |
| `admissionService.jsx` | Admission form submission |
| `courseService.jsx` | Course CRUD |
| `resultService.jsx` | Result submission |
| `backupService.js` | Database backup download |
| `certificateService.js` | Certificate generation |
| `simpleFeesReceiptService.js` | Fee receipt generation |
| `visitorService.js` | Visitor logging |

---

## Build & Deployment

### Production Build

```bash
npm run build
```

Output goes to the `dist/` folder. Manual chunk splitting is configured in `vite.config.js`:

| Chunk | Libraries |
|---|---|
| `vendor-react-core` | React, ReactDOM, react-helmet |
| `vendor-router` | react-router-dom |
| `vendor-motion` | framer-motion |
| `vendor-icons` | lucide-react, @heroicons/react |
| `vendor-monaco` | @monaco-editor/react |
| `vendor-excalidraw` | @excalidraw/excalidraw |
| `vendor-mermaid` | mermaid |
| `vendor-katex` | katex, react-katex |
| `vendor-docs` | xlsx, jspdf, jszip, file-saver |
| `vendor-canvas` | fabric, dom-to-image, html-to-image |
| `vendor-prism` | prismjs |
| `vendor-misc` | All other node_modules |

> The chunk size warning limit is set to 2500 kB to accommodate large visualization libraries.

---

## Deployment to cPanel Server

See [CNAT_Server_Git_Deployment_Documentation.md](./CNAT_Server_Git_Deployment_Documentation.md) for the full guide.

### Quick Sync

```bash
cd ~/public_html
git fetch origin
git reset --hard origin/main
git status
ls -la
```

### Full Cleanup + Sync

```bash
cd ~/public_html
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.htaccess' ! -name 'cnat_api' -exec rm -rf -- {} +
git fetch origin
git reset --hard origin/main
git status
```

> **Important:** Always preserve `.git`, `.htaccess`, and `cnat_api/` on the production server.

### SPA Routing on Apache

The `.htaccess` file configures Apache to redirect all requests to `index.html`, enabling client-side React Router navigation.

---

## Code Conventions

- **Components** use PascalCase filenames: `StudentAdmission.jsx`
- **Services** use camelCase filenames: `studentService.js`
- **Path aliases** configured in `vite.config.js`:
  - `@assets` → `src/assets`
  - `@data` → `src/data`
- **Backup files** are kept alongside originals with `.bak` suffix (not deployed)
- **SEO** is handled per page via `react-helmet-async`
- **User alerts** use SweetAlert2

---

## License

Private project — © CNAT. All rights reserved.
