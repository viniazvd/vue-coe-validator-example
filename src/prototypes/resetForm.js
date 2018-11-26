import { getContext } from '../support/services/context'
import { setListeners, hasForm } from '../support/services'

export default function (form) {
  const vm = getContext.call(this)

  if (!form) form = Object.keys(vm.validations)[0]

  if (!hasForm.call(vm, form)) {
    console.warn(`it was not possible to reset the ${form} of a form that does not exist.`)
    return false
  }

  const fields = Object.keys(vm.validations[form])

  fields.forEach(field => vm.$validator.resetField(field, form))

  vm.$validator.validateOnBlur && setListeners.call(vm)
}
