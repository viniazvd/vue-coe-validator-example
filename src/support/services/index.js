export const setMessages = (source, newMessages) => {
  for (let form of Object.values(source)) {
    for (let input of Object.values(form)) {
      for (let messageKey of Object.keys(input)) {
        if (newMessages[messageKey]) {
          input[messageKey] = newMessages[messageKey]
        }
      }
    }
  }
}

function watchValidate (dataKey, input) {
  this.$watch(dataKey.concat('.', input), value => {
    this.validations = this.$validator.validate(this.validations, this.messages, dataKey, input, value)
  })
}

function watchDynamicFields (form) {
  this.$watch(form, (fields, oldFields) => {
    if (Object.keys(fields).length !== Object.keys(oldFields).length) setValidations.call(this)
  })
}

export function setValidations (form) {
  const validation = this.$options.validation

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = this.$data
  /* eslint-enable */

  Object.entries(data).forEach(([dataKey, dataValue]) => {
    Object.keys(validation).forEach(validationKey => {
      if ((form && form === dataKey) || validationKey === dataKey) {
        // if new fields are added dynamically to the form, set the validations again
        watchDynamicFields.call(this, dataKey)

        // set validator for each input
        for (const input in dataValue) watchValidate.call(this, dataKey, input)

        this.validations = {
          ...this.validations,
          ...this.$validator.init(dataValue, dataKey, validation[dataKey])
        }
      }
    })
  })
}
