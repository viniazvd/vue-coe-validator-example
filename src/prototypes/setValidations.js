import { makeInitialForm } from '../support/services'

function watchValidate (formKey, input) {
  this.$watch(formKey.concat('.', input), value => {
    this.validations = this.$validator.validate(this.validations, this.messages, formKey, input, value)
  })
}

function setValidations (validation, form) {
  const instance = this || this.$validator
  const componentID = Object.keys(instance.context.components)[Object.keys(instance.context.components).length - 1]
  const vm = instance.context.components[componentID]

  if (!validation) {
    validation = vm.$options.validation
  } else {
    validation = {
      ...vm.validations,
      [form]: {
        ...vm.validations[form],
        ...validation
      }
    }
  }

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = vm.$data
  /* eslint-enable */

  Object.entries(data).forEach(([formKey, formValue]) => {
    if (Object.keys(validation).includes(formKey)) {
      vm.validations = {
        ...vm.validations,
        ...makeInitialForm(
          formValue,
          formKey, (
            validation[formKey] || // when validation is created automatically
            validation // when validation is created dynamically
          )
        )
      }
    }

    Object.keys(validation).forEach(validationKey => {
      if ((form && form === formKey) || validationKey === formKey) {
        // set validator for each input
        for (const input in formValue) watchValidate.call(vm, formKey, input)
      }
    })
  })
}

export default setValidations
