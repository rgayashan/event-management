# Event Management App

A modern event management application built with React, TypeScript, and Material-UI that helps users organize and manage events efficiently. This project was developed as part of an interview technical assessment.

## 🎯 Project Overview

This is a single-page application (SPA) that allows users to manage and participate in events. The application demonstrates modern React development practices, state management, and responsive design principles.

## 🚀 Features

- Modern and responsive user interface (mobile + desktop)
- Dashboard with event filtering capabilities (by host, date)
- Detailed event pages with attendee information
- User profile management with event participation tracking
- Create and edit events with form validation
- Material Design components with smooth animations
- Type-safe development with TypeScript
- Global state management with Redux Toolkit
- Client-side routing with React Router

## 🛠️ Technical Stack

- **Frontend Framework:** React 19 (Functional components + Hooks)
- **Type System:** TypeScript
- **UI Framework:** Material-UI (MUI) v7
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Date Handling:** date-fns
- **HTTP Client:** Axios
- **Development Tools:**
  - Create React App
  - ESLint
  - Jest for testing

## 📋 Technical Requirements & Best Practices

### Component Structure
- Maximum component file size: 250 lines
- Single Responsibility Principle: Each component should do one thing well
- Custom hooks for reusable logic
- Proper component composition and prop drilling avoidance

### Code Quality
- Consistent naming conventions (camelCase for functions, PascalCase for components)
- Proper TypeScript types and interfaces
- Comments for complex logic
- Error boundaries implementation
- Proper error handling and loading states

### Performance Optimizations
- Lazy loading and code splitting for routes
- React.memo() for expensive computations
- useMemo and useCallback hooks where appropriate
- Optimistic UI updates
- Debounced inputs for search/filter functionality

### State Management
- Redux Toolkit for global state
- React Context for localized state
- Normalized state shape
- Proper action naming conventions

### API Integration
- Axios interceptors for error handling
- Request caching strategy
- Proper loading and error states
- TypeScript interfaces for API responses

### Testing
- Unit tests for utilities and hooks
- Integration tests for main user flows
- Snapshot testing for UI components
- Mock service worker for API testing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended)
- npm (comes with Node.js)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will open in your default browser at `http://localhost:3000`

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## 🏗️ Project Structure

```
event-management-app/
├── public/              # Static files
├── src/
│   ├── components/     # Reusable components
│   │   ├── layout/    # Layout components
│   │   ├── common/    # Shared components
│   │   └── forms/     # Form components
│   ├── pages/         # Page components
│   ├── features/      # Feature-based modules
│   ├── hooks/         # Custom hooks
│   ├── redux/         # Redux store and slices
│   ├── services/      # API services
│   ├── types/         # TypeScript definitions
│   ├── utils/         # Utility functions
│   └── constants/     # Constants and enums
├── package.json       # Dependencies
└── tsconfig.json     # TypeScript config
```

## 🎨 UI Components & Guidelines

- Consistent component structure:
  ```typescript
  // ComponentName.tsx
  import React from 'react';
  import { useStyles } from './styles';
  
  interface Props {
    // Props interface
  }
  
  export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
    // Component logic
    return (
      // JSX
    );
  };
  ```

- Material-UI theming and styling best practices
- Responsive design breakpoints
- Accessibility considerations (ARIA labels, keyboard navigation)
- Consistent error handling and feedback
- Loading states and skeletons

### Splash Screen Implementation
The application includes a modern, animated splash screen that provides visual feedback during initial loading and route transitions:

```typescript
// Components Structure
src/
├── components/
│   └── common/
│       └── SplashScreen.tsx    # Splash screen component
└── hooks/
    └── useSplashScreen.ts      # Custom hook for splash screen logic
```

#### Features
- Smooth fade-in and scale animations
- Configurable minimum display time
- Fallback for route transitions
- Responsive design
- Material-UI integration
- Custom branding support

#### Implementation Details
1. **Animation Effects**
   ```typescript
   const fadeIn = keyframes`
     from { opacity: 0; }
     to { opacity: 1; }
   `;
   
   const scaleIn = keyframes`
     from { transform: scale(0.8); }
     to { transform: scale(1); }
   `;
   ```

2. **Custom Hook Usage**
   ```typescript
   const isLoading = useSplashScreen(2000); // 2 seconds minimum display
   ```

3. **Route Transition Support**
   ```typescript
   <Suspense fallback={<SplashScreen />}>
     {/* Route components */}
   </Suspense>
   ```

#### Customization Options
1. **Branding**
   - Replace default text with custom logo
   - Modify color scheme
   - Adjust typography

2. **Timing**
   - Configure minimum display duration
   - Customize animation speeds

3. **Styling**
   - Modify animations
   - Change layout and positioning
   - Update loading indicators

4. **Content**
   - Add progress indicators
   - Include brand messaging
   - Display loading status

## 🔍 Evaluation Focus Areas

1. **Code Quality**
   - Clean, readable, and maintainable code
   - Proper TypeScript usage
   - Consistent coding style
   - Error handling

2. **Architecture**
   - Component modularity
   - State management implementation
   - Code organization
   - Feature scalability

3. **User Experience**
   - Responsive design
   - Loading states
   - Error feedback
   - Form validation
   - Navigation flow

4. **Performance**
   - Code splitting
   - Lazy loading
   - Render optimization
   - Bundle size management

## 📱 Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## 👥 Authors

- Rajitha Gayashan - Interview Project Implementation

## 🙏 Acknowledgments

- Material-UI team for the component library
- React team for the framework
- Softvil Interview team for the opportunity
