import RULES from '../rules/types'
import * as VALIDATIONS from '../rules'

import { getContext, setProxy } from '../support/services'

export default function (validation, messages, form, key, value) {
  const vm = getContext.call(this)

  if (!form) { console.warn('select a form to validate the data.') }

  let errors = []

  RULES.some(rule => {
    if (validation[form] && validation[form][key] && validation[form][key][rule]) {
      const msg = messages && messages[form][key] && messages[form][key][rule]
      const error = VALIDATIONS[rule](value, msg, validation, form, key)
      if (error) errors = [ ...errors, error ]
    }
  })

  const isTouched = vm.validations[form] && vm.validations[form][key] && vm.validations[form][key].isTouched

  const changed = {
    ...validation[form][key],
    errors,
    isTouched: true,
    isDirty: !!value || isTouched,
    isFilled: !!value,
    isValid: errors.length <= 0
  }

  const inputUpdated = { [key]: changed }
  const formToUpdate = validation[form]

  vm.validations = {
    ...validation,
    [form]: {
      ...formToUpdate,
      ...inputUpdated
    }
  }

  setProxy.call(vm)
}
