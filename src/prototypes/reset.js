export default function (formToReset) {
  const defaultStates = ['isDirty', 'isFilled', 'isTouched', 'isValid']

  const instanceID = Object.keys(this.context.components)[Object.keys(this.context.components).length - 1]
  const context = this.context.components[instanceID]

  if (formToReset && !Object.keys(context.validations).includes(formToReset)) {
    console.warn('it was not possible to reset the validations of a form that does not exist.')
    return
  }
  if (!formToReset) formToReset = Object.keys(context.validations)[0]

  function setValue (state, value) {
    if (defaultStates.includes(state)) return false
    if (state === 'errors') return []

    return value
  }

  context.validations = Object
    .entries(context.validations)
    .filter(([formName]) => formName === formToReset)
    .reduce((acc, [form, fields]) => {
      acc[form] = Object.entries(fields).reduce((accFields, [key, states]) => {
        accFields[key] = Object.entries(states).reduce((accStates, [state, value]) => {
          accStates[state] = setValue(state, value)

          return accStates
        }, {})

        return accFields
      }, {})

      return acc
    }, {})

  context.$validator.validateOnBlur && context.$validator.setListenersTouch.call(context, context.validations)
}
