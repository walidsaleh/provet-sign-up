import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import SignUpStack from '../SignUpStack.vue'
import type { SignUpForm, SignUpFormErrors } from '../../types/signup'
import { LOADING_TIMEOUT } from '../../constants'

describe('SignUpStack', () => {
  let wrapper: VueWrapper<InstanceType<typeof SignUpStack>>

  beforeEach(() => {
    wrapper = mount(SignUpStack, {
      attachTo: document.body,
    })
  })

  it('validates required email', async () => {
    const validateEmail = wrapper.vm.validateEmail
    const isValidForm = wrapper.vm.isValidForm
    const formErrors = wrapper.vm.signUpFormErrors

    const form = wrapper.vm.signUpForm
    form.email = ''

    validateEmail()
    expect(isValidForm).toBe(false)
    expect(formErrors.email).toBe('Email is required')
  })

  it('validates required password', async () => {
    const validatePassword = wrapper.vm.validatePassword
    const isValidForm = wrapper.vm.isValidForm
    const formErrors = wrapper.vm.signUpFormErrors

    const form = wrapper.vm.signUpForm
    form.password = ''

    validatePassword()
    expect(isValidForm).toBe(false)
    expect(formErrors.password).toBe('Password is required')
  })

  it('validates form with empty inputs', async () => {
    const form = wrapper.vm.signUpForm
    form.email = '   '
    await wrapper.find('#email').trigger('blur')
    await wrapper.vm.$nextTick()

    form.password = '   '
    await wrapper.find('#password').trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isValidForm).toBe(false)
    expect(wrapper.vm.signUpFormErrors).toEqual({
      email: 'Email is required',
      password: 'Password is required',
    })
  })

  it('handles password toggle visibility', async () => {
    const form = wrapper.vm.signUpForm
    form.password = 'password123'
    await wrapper.vm.$nextTick()

    const visiblePasswordIcon = wrapper.find('provet-icon')
    expect(visiblePasswordIcon.exists()).toBe(true)

    const passwordType = wrapper.vm.passwordType
    expect(passwordType).toBe('password')

    await visiblePasswordIcon.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.passwordType).toBe('text')

    await visiblePasswordIcon.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.passwordType).toBe('password')
  })

  it('handles form submission with valid inputs', async () => {
    const form = wrapper.vm.signUpForm
    form.email = 'test@example.com'
    await wrapper.find('#email').trigger('blur')
    await wrapper.vm.$nextTick()
    form.password = 'password123'
    await wrapper.find('#password').trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isValidForm).toBe(true)

    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoading).toBe(true)
    expect(wrapper.vm.showPassword).toBe(false)

    await new Promise((resolve) => setTimeout(resolve, LOADING_TIMEOUT + 100))
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.isSuccess).toBe(true)
  })

  afterEach(() => {
    wrapper.unmount()
  })
})
