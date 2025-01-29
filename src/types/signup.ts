export interface SignupForm {
  email: string
  password: string
  confirmPassword: string
  receiveUpdates: boolean
}

export interface SignUpFormErrors {
  email: string
  password: string
  confirmPassword: string
}
