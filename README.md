# Provet Sign-Up Form (Vue 3 + TypeScript)

## Live Demo

Deployed at Netlify: [https://provet-sign-up.netlify.app](https://provet-sign-up.netlify.app)

This project implements a client-side rendered sign-up form for Provet, built using Vue 3 + TypeScript and adhering to the Provet Cloud Design System guidelines.

## Features

### Form Validation

- Comprehensive client-side validation
- Immediate validation on field blur
- Dynamic, context-aware error messaging
- Prevents form submission with invalid inputs

### User Experience

- Elegant password visibility toggle
- Seamless, non-intrusive validation feedback
- Toast notifications for form submission
- Adaptive form state management
- Disabled form fields during loading state

## Core Technologies

- Vue 3 Composition API
- TypeScript
- Provet Cloud Design System
- Vitest for unit testing
- Vue Test Utils for component testing

## Technical Highlights

- Modular component architecture
- Custom Web Components (`provet-*`)
- Strict TypeScript type enforcement
- Comprehensive unit test coverage
- Dependency injection using Vue's provide/inject
- Flexible content rendering with slots
- Separation of concerns in component design

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:walidsaleh/provet-sign-up.git
    ```

2. Navigate to the project directory:

    ```bash
    cd provet-sign-up
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run in development mode:

    ```bash
    npm run dev
    ```

5. Run tests:

    ```bash
    npm run test
    ```

## Project Structure

```
src/
├── components/                         # Vue components
│   └── SignUp/                         # Sign-up related components
│       ├── SignUpForm.vue              # Sign-up form component
│       ├── SignUpStack.vue             # Main sign-up stack component
│       ├── SignUpLoginLink.vue         # Login link component
│       └── __tests__/                  # Component unit tests
│           ├── SignUpForm.test.ts      # SignUpForm unit tests
├── types/                              # TypeScript type definitions
│   ├── signup.ts                       # Sign-up form type definitions
│   └── toast.ts                        # Toast message type definitions
├── constants.ts                        # Application-wide constants
├── style.css                           # Global styles
├── App.vue                             # Root Vue application component
└── main.ts                             # Application entry point
```

## Component Architecture

### SignUpStack
- Main container component
- Manages form and success states
- Renders success message using Provet Banner
- Uses slots for flexible content rendering

### SignUpForm
- Handles form validation and submission
- Uses dependency injection for toast notifications
- Emits success/error events to parent
- Manages loading states during submission

### SignUpLoginLink
- Provides navigation to login page
- Reusable component for consistent styling

## Testing Strategy

### Component Testing

Our testing approach focuses on comprehensive coverage of `SignUpForm` component:

#### SignUpForm Tests
- Form validation and submission
- Event emission for success/error
- Loading state management
- Toast notification integration

## Performance Considerations

- Minimal runtime overhead
- Efficient reactive updates
- Optimized form validation
- Lazy-loaded components

## Accessibility

- Semantic HTML structure
- ARIA attributes for form elements
- Keyboard navigation support
- Screen reader compatibility

## Future Improvements

- Add more comprehensive form validations
- Implement internationalization (i18n)
- Enhance error handling
- Add more granular unit tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Walid Saleh - [LinkedIn](https://www.linkedin.com/in/walplanet)

Project Link: [https://github.com/walidsaleh/provet-sign-up](https://github.com/walidsaleh/provet-sign-up)
