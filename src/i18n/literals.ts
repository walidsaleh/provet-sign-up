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

export interface LayoutLiterals {
  logo: {
    alt: string
  }
}

export interface Literals {
  layout: LayoutLiterals
  signUp: SignUpLiterals
}

export const literals: Literals = {
  layout: {
    logo: {
      alt: 'Provet Cloud Logo',
    },
  },
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
    keepUpdated: 'Keep me updated with news and offers',
    submitButton: {
      default: 'Sign Up',
      loading: 'Signing Up...',
    },
    validation: {
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
    },
    registration: {
      allreadyRegistered: 'Already registered?',
      logIn: 'Log in',
      loginTitle: 'Log in to your account',
      loginUrl: 'https://login.provetcloud.com/',
      thanks: 'Thanks for signing up!',
      willUpdate: 'We will keep you updated with news and offers.',
      error: 'Something went wrong. Please try again.',
      success: 'Registration successful!',
    },
  },
}
