import { setMessages, setValidations } from '../services'
import validator from '../directives/validator'

const formSetup = {
  created () {
    const { validation, messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) setMessages(this.messages, this.$validator.messages)

      console.log('no created')
      setValidations.call(this)
      this.$validator.validateOnBlur && this.$validator.setListenersTouch.call(this, this.validations)

      // set the component context values
      this.$validator.context.components = {
        ...this.$validator.context.components,
        [this._uid]: this
      }
    }
  },

  directives: validator,

  data () {
    return {
      validations: {},
      messages: {}
    }
  },

  // watch: {
  //   '$data': {
  //     handler: function (to, from) {
  //       console.log(to, from)
  //     },
  //     deep: true
  //   }
  // },

  methods: {
    $handlerBlur (form, element) {
      this.validations = {
        ...this.validations,
        ...this.$validator.touch(this.validations, this.messages, form, element.name, element.value)
      }
    },

    $hasError (key, form) {
      if (this.validations && Object.keys(this.validations).length) {
        // in a single-form scenario, the scope is unique, and you do not have to explicitly name the form
        if (!form) form = Object.keys(this.validations)[0]

        const input = this.validations[form][key]

        return input && input.isTouched && !input.isValid && input.errors[0]
      }

      return false
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
