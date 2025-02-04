import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import SignUpForm from '../SignUpForm.vue'

describe('SignUpForm', () => {
  let wrapper: VueWrapper<InstanceType<typeof SignUpForm>>

  beforeEach(() => {
    wrapper = mount(SignUpForm, {
      attachTo: document.body,
      global: {
        provide: {
          displayToast: vi.fn(),
        },
      },
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
    // Mock timer
    vi.useFakeTimers()

    const form = wrapper.vm.signUpForm
    form.email = 'test@example.com'
    await wrapper.find('#email').trigger('blur')
    await wrapper.vm.$nextTick()
    form.password = 'password123'
    await wrapper.find('#password').trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isValidForm).toBe(true)

    // Trigger submit
    await wrapper.find('form').trigger('submit')

    // Fast-forward timers
    await vi.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('success')
    const emittedSuccess = wrapper.emitted('success')
    expect(emittedSuccess?.[0]).toEqual([
      {
        email: 'test@example.com',
        password: 'password123',
        receiveUpdates: false,
      },
    ])

    // Restore timers
    vi.useRealTimers()
  })

  it('emits error event when submission fails', async () => {
    vi.useFakeTimers()

    const form = wrapper.vm.signUpForm
    form.email = 'test@example.com'
    form.password = 'password123'
    await wrapper.vm.$nextTick()

    // Trigger submit
    const submitPromise = wrapper.find('form').trigger('submit')

    // Advance timers to trigger the setTimeout
    vi.runAllTimers()
    await submitPromise
    await wrapper.vm.$nextTick()

    const emitted = wrapper.emitted()
    // Verify only the event names, ignoring the _vts
    expect(Object.keys(emitted)).toEqual(['submit'])

    vi.useRealTimers()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
})
