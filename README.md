# U-Shows

A modern, responsive TV shows discovery application built with Vue.js 3 and TypeScript. Browse popular TV shows by genre, view detailed information, and search for specific shows using the TVMaze API.

---

## 1. How to run the project

### Prerequisites

- Node.js 24.13.1 (LTS)
- npm

### Quick start

```bash
npm install
npm run dev
```

### Available scripts

| Command                 | Description                         |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Start development server with HMR   |
| `npm run build`         | Type-check and build for production |
| `npm run preview`       | Preview production build locally    |
| `npm run types`         | Run TypeScript type checking        |
| `npm test`              | Run tests in watch mode             |
| `npm test -- --run`     | Run tests once (CI/CD)              |
| `npm run test:coverage` | Run tests with coverage report      |
| `npm run lint`          | Run ESLint                          |
| `npm run lint:fix`      | Run ESLint with auto-fix            |
| `npm run format`        | Format code with Prettier           |

---

## 2. Development process

### Phase 1: Initial setup

- Git repository initialized
- Node.js 24.13.1 (LTS) pinned
- Vue 3.5.25 + Vite 7.3.1 + TypeScript 5.9.3
- Vitest 4.0.18 for unit testing
- ESLint 10.0.1 + Prettier 3.8.1 for code quality
- Zero security vulnerabilities

### Phase 2: Routing, State management & Data fetching

- Vue Router 5.0.3 with HTML5 History Mode
- Two routes: Dashboard (`/`) and Show Detail (`/show/:id`)
- RouteName enum for type-safe routing
- Pinia 3.0.4 for state management
- TVMaze API integration (shows list, show detail, search)
- TypeScript interfaces for API responses
- Custom `useQuery<T>` composable for data fetching
- View-specific composable (`useShows`) for genre grouping
- Unit tests for stores, composables, and data fetching (16 tests across 4 test files)
- Error logging utility with structured error tracking
- Dashboard and Show Detail views with proper error handling and loading states
- Search component with Enter key support and loading states

## 3. Tech decisions

### Data fetching

Built a generic `useQuery<T>` composable:

- Generic type parameter for type safety
- `isLoading` (initial) vs `isFetching` (any fetch) states
- Required `immediate` option for explicit fetch strategy (auto-execute or lazy)
- Exposes `fetchData()` for manual refresh

### State management

**Store (Pinia)**: Only for data persisting across navigation

- `shows` - accumulated shows list
- `nextPage` - tracks next page to fetch
- `addShows()` - appends shows to list
- `incrementPage()` - increments page counter
- Separated concerns following Single Responsibility Principle

**Composables**:

- `useQuery<T>` - generic data fetching with explicit fetch strategy
- `useShows` - genre grouping logic for Dashboard view

### Routing

**RouteName Enum**: Type-safe route navigation

- Exported enum with all route names, prevents typos and enables refactoring

### Caching

Session-based caching (no localStorage) - data clears on refresh to avoid stale data

### Error handling

**Structured error logging**:

- `logError()` utility for consistent error tracking
- Context tracking (component, action, lifecycle hook)
- Global error handler via `app.config.errorHandler`
- User-friendly error messages
- Ready for production monitoring integration
