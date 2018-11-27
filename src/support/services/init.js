import { setValidation, defaultState } from '../services'

export function setFieldsName (form, fields, validations) {
  this.$nextTick(() => {
    const result = this.$el
    console.log(result)
    console.log('---')

    // const formListNode = this.$el.querySelectorAll(`form[name="${form}"]`)

    // if (formListNode.length) {
    //   const TAGS = ['SELECT', 'INPUT']
    //   const FIELDS = Object.keys(fields)

    //   formListNode.forEach(NodeForm => {
    //     Array
    //       .from(NodeForm)
    //       .filter(({ tagName }) => TAGS.includes(tagName))
    //       .forEach((node, index) => node.setAttribute('name', FIELDS[index]))
    //   })
    // }
  })
}

export function setValidations (form, validations) {
  Object
    .keys(validations)
    .forEach(input => setValidation.call(this, form, input))
}

function getFormFields (form, data, validations) {
  return {
    [form]: Object.entries(validations).reduce((accForm, [input, rules]) => {
      const value = data[input]
      const filled = { isFilled: !!value }
      const dirted = { isDirty: !!value }

      accForm[input] = { ...defaultState, ...dirted, ...filled, ...rules }

      return accForm
    }, {})
  }
}

export function setFormFields (form, data, validation) {
  const newFormStates = getFormFields(form, data, validation)

  this.validations = { ...this.validations, ...newFormStates }
}
