export interface SignUpLiterals {
  logoAlt: string
  title: string
  subtitle: string
  email: {
    label: string
    placeholder: string
  }
  password: {
    label: string
    placeholder: string
  }
  keepUpdated: string
  submitButton: {
    default: string
    loading: string
  }
  validation: {
    emailRequired: string
    passwordRequired: string
  }
  registration: {
    allreadyRegistered: string
    logIn: string
    loginTitle: string
    loginUrl: string
    thanks: string
    willUpdate: string
    error: string
    success: string
  }
}

export interface Literals {
  signUp: SignUpLiterals
}

export const literals: Literals = {
  signUp: {
    logoAlt: 'Provet Cloud Logo',
    title: 'Sign Up',
    subtitle: 'Create an account with us',
    email: {
      label: 'Email',
      placeholder: 'Enter your email',
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password',
    },
    keepUpdated: 'Keep me updated',
    submitButton: {
      default: 'Sign Up',
      loading: 'Signing up...',
    },
    validation: {
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
    },
    registration: {
      allreadyRegistered: 'Already registered?',
      logIn: 'Log In',
      loginTitle: 'Go to Login Page',
      loginUrl: 'https://login.provetcloud.com/',
      thanks: 'Thank you for joining Provet!',
      willUpdate: 'You will receive product updates',
      error: 'There was an error processing your registration. Please try again',
      success: 'You have been registered successfully',
    },
  },
}
