export function getSnapshots () {
  const validation = this.$options.validation

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = this.$data
  /* eslint-enable */

  return Object.entries(data).reduce((acc, [dataKey, dataValue]) => {
    Object.keys(validation).forEach(validationKey => (validationKey === dataKey) && (acc[dataKey] = dataValue))

    return acc
  }, {})
}

export function setContext () {
  this.$validator.context.components = {
    ...this.$validator.context.components,
    [this._uid]: this
  }
}

export function setSnapshot () {
  this.$validator.snapshots.components = {
    ...this.$validator.snapshots.components,
    [this._uid]: getSnapshots.call(this)
  }
}

const defaultState = {
  isTouched: false,
  isDirty: false,
  isFilled: false,
  isValid: false,
  errors: []
}

export function makeInitialForm (data, form, validation) {
  return {
    [form]: Object.entries(data).reduce((initialForm, [key, value]) => {
      const filled = { isFilled: !!value }
      const dirted = { isDirty: !!value }
      const validations = validation && validation[key]

      if (validations !== undefined) {
        initialForm[key] = { ...defaultState, ...dirted, ...filled, ...validations }
      }

      return initialForm
    }, {})
  }
}

export function setListenersTouch () {
  const componentID = Object.keys(this.$validator.context.components)[Object.keys(this.$validator.context.components).length - 1]
  const vm = this.$validator.context.components[componentID]

  // dynamically records listeners to activate touch inputs
  vm.$nextTick(() => {
    const forms = vm.$el.querySelectorAll('form[name]')

    if (forms.length) {
      forms.forEach(form => {
        const formName = form.getAttribute('name')

        Array.from(form.elements).forEach((element, index) => {
          // register events only for those who have validation
          if (vm.validations[formName] && vm.validations[formName][element.name]) {
            element.addEventListener('blur', () => vm.$handlerBlur(formName, element), { once: true })
          }
        })
      })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the form')
    }
  })
}
