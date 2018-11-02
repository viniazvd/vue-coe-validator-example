import { setMessages, setValidations } from '../services'

const formSetup = {
  created () {
    const { validation } = this.$options
    const { messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) setMessages(this.messages, this.$validator.messages)

      setValidations.call(this, validation)
    } else {
      console.warn('follow the instructions in the documentation to correctly register the data')
    }
  },

  directives: {
    validator: {
      inserted (el, { value: rules }, vdom, oldvdom) {
        const [ form, key ] = vdom.data.model.expression.split('.')
        const data = vdom.context[form]

        // console.log(vdom.context.validations)
        setTimeout(() => {
          const validations = {
            ...vdom.context.validations,
            [form]: {
              ...vdom.context.validations[form],
              [key]: {
                ...vdom.context.validations[form][key],
                ...rules
              }
            }
          }
          console.log('validations directive to init', validations)

          vdom.context.validations = vdom.context.$validator.init(data, null, validations)
          // vdom.context.$validator.setValidations.call(vdom.context, vdom.context.validations)
        }, 0)
      },

      componentUpdated (el, { value: rules }, vdom, oldvdom) {
        // const isTouched = vdom.context.validations.form1.name.isTouched

        // let { validations, messages } = vdom.context
        // const [ form, key ] = vdom.data.model.expression.split('.')
        // const value = vdom.context[form][key]
        // // const value = (vdom.data.domProps || vdom.data.props).value

        // validations = {
        //   ...validations,
        //   [form]: {
        //     ...validations[form],
        //     [key]: {
        //       ...validations[form][key],
        //       ...rules
        //     }
        //   }
        // }

        // vdom.context.validations = vdom.context.$validator.validate(validations, messages, form, key, value)
        // const hasErrors = vdom.context.$validator.getErrors(validations, messages, form, key, value)
        // // const errorMessage = vdom.context.messages[form][key].required
        // const errorMsg = rules.errorMsg
        // console.log(rules)

        // vdom.data.attrs.validation = isTouched && hasErrors && errorMsg
      }
    }
  },

  data () {
    return {
      validations: {},
      messages: {}
    }
  },

  methods: {
    $handlerBlur (form, element) {
      this.validations = {
        ...this.validations,
        ...this.$validator.touch(this.validations, this.messages, form, element.name, element.value)
      }
    },

    $hasError (key, form) {
      if (this.validations && Object.keys(this.validations).length) {
        const input = this.validations[form][key]

        return input && input.isTouched && !input.isValid && input.errors[0]
      }

      return false
    },

    $resetValidations () {
      const { validation } = this.$options

      // overwrites the initial validations
      setValidations.call(this, validation)
    },

    $isValidForm (form) {
      const isValid = Object
        .entries(this.validations[form])
        .every(([_, { isValid }]) => isValid)

      return isValid
    }
  }
}

export default formSetup
