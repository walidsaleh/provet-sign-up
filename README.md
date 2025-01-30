# Provet Sign-Up Form (Vue 3 + TypeScript)

## Live Demo
Deployed at netlify:
https://provet-sign-up.netlify.app

This project implements a client-side rendered sign-up form for Provet, as part of a technical assessment. It is built using Vue 3 + TypeScript and adheres to the Provet Cloud Design System guidelines.

## Features

### Form Validation
- Basic required field validation
- Immediate validation on field blur
- Dynamic error messaging

### User Experience
- Elegant password visibility toggle using eye icon
- Seamless, non-intrusive validation feedback
- Toast notifications for form submission

## Core Technologies
- Vue 3 Composition API
- TypeScript
- Provet Cloud Design System
- Vitest for testing

## Technical Highlights
- Custom Web Components (provet-*)
- Comprehensive form validation
- Strict TypeScript type enforcement
- Unit test coverage

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
├── components/          # Vue components
│   ├── SignUpStack.vue  # Main sign-up form component
│   └── __tests__/       # Component unit tests
│       └── SignUpStack.test.ts
├── types/               # TypeScript type definitions
│   ├── signup.ts        # Sign-up form type definitions
│   └── toast.ts         # Toast message type definitions
├── constants.ts         # Application-wide constants
├── style.css            # Global styles
├── App.vue              # Root Vue application component
└── main.ts              # Application entry point
```

## Testing

The project includes a comprehensive test suite covering:

### Form Validation
* Validation of empty email field
* Validation of empty password field
* Validation of whitespace-only inputs

### Password Visibility
* Eye icon toggle for password visibility
* Conditional icon display based on password input

### Form Submission
* Loading state management
* Success message display
* Error handling

## Technologies & Development

This project utilizes the following technologies and development practices:

* **Frontend Framework:** Vue 3 (Composition API)
* **Type Safety:** TypeScript
* **UI Library:** Provet Cloud Design System (including custom Web Components)
* **Testing:** Vitest and Vue Test Utils

## UX Design Considerations

### Validation Approach

This form implements a pragmatic validation strategy that balances user experience with data integrity. Validation occurs programmatically to provide immediate, non-intrusive feedback.

Key validation principles:
- Minimal interruption to user workflow
- Immediate error detection
- Clear, concise error messaging
- Final validation check during form submission

The approach focuses on creating a smooth, responsive form interaction that guides users without overwhelming them with immediate or constant validation messages.

### Password Visibility

The password field features an intuitive eye icon for toggling password visibility, directly integrated within the input field. This approach provides a clean, modern solution for password masking:

- Seamless icon integration
- Dynamic open/closed eye states
- Conditional display based on password input
- Immediate visual feedback on password visibility

### Form Submission

The submit button is disabled until form is valid.
The form submission process follows a loading state, with a success message displayed upon successful submission. The checkbox state is updated to reflect the user's choice about receiving updates.
