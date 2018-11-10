import { getValidation, makeInitialForm, setValidations } from '../support/services'

function init (__validation, form) {
  const instance = this || this.$validator
  const componentID = Object.keys(instance.context.components)[Object.keys(instance.context.components).length - 1]
  const vm = instance.context.components[componentID]

  const validation = getValidation.call(vm, __validation, form)

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = vm.$data
  /* eslint-enable */

  Object
    .entries(data)
    .forEach(([formKey, formValue]) => {
      makeInitialForm.call(vm, validation, formKey, formValue)
      setValidations.call(vm, validation, form, formKey, formValue)
    })

  const validationsProxy = new Proxy(vm.validations, {
    deleteProperty (target, prop) {
      if (prop in target) {
        process.env.NODE_ENV === 'development' && console.warn(`you can not remove validations property`)

        return true
      }
    }
  })

  vm.validations = validationsProxy
}

export default init
