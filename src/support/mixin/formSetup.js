import { mutateMessages } from '../utils'

const formSetup = {
  mounted () {
    const { validation } = this.$options
    const { messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) mutateMessages(this.messages, this.$validator.messages)

      Object
        .entries(this.$data)
        .find(([ keyForm, valueForm ]) => {
          Object.entries(validation).find(([keyValidation, objectValidations]) => {
            if (keyForm === keyValidation) {
              for (const input in valueForm) {
                this.$watch(keyForm.concat('.', input), value => {
                  this.validations = this.$validator.validate(
                    this.validations,
                    this.messages,
                    keyForm,
                    input,
                    value
                  )
                })
              }
              this.validations = {
                ...this.validations,
                ...this.$validator.init(objectValidations, keyForm)
              }
            }
          })
        })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the data')
    }

    this.$validator.setListenersTouch.call(this, this.validations, this.messages)

    // // dynamically records listeners to activate touch inputs
    // const forms = this.$el.querySelectorAll('form[id]')
    // if (forms.length) {
    //   forms.forEach(form => {
    //     Array.from(form.elements).forEach((element, index) => {
    //       // register events only for those who have validation
    //       if (this.validations[form.id][form[index].name]) {
    //         form[index].addEventListener('blur', () =>
    //           (
    //             this.validations = {
    //               ...this.validations,
    //               ...this.$validator.touch(
    //                 this.validations,
    //                 this.messages,
    //                 form.id,
    //                 element.name,
    //                 element.value
    //               )
    //             }
    //           ),
    //         { once: true })
    //       }
    //     })
    //   })
    // } else {
    //   console.warn('follow the instructions in the documentation to correctly register the form')
    // }
  },

  data () {
    return {
      validations: {},
      messages: {}
    }
  },

  methods: {
    $hasError (key, form) {
      if (this.validations && Object.keys(this.validations).length) {
        const input = this.validations[form][key]

        return input && input.isTouched && !input.isValid && input.errors[0]
      }

      return false
    },

    $resetValidations (form) {
      const defaultState = {
        isTouched: false,
        isDirty: false,
        isFilled: false,
        isValid: false,
        errors: []
      }

      const formReseted = Object.entries(this.validations[form]).map(λ => ({ ...defaultState }))

      this.validations = { ...this.validations, [form]: { ...formReseted } }
    }
  }
}

export default formSetup
