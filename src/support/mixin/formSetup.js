import { setMessages, setValidations } from '../services'

import RULES from '../../rules/types'
import * as VALIDATIONS from '../../rules'

const formSetup = {
  created () {
    const { validation, messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) setMessages(this.messages, this.$validator.messages)

      setValidations.call(this, validation)
    }
    //  else {
    // console.warn('follow the instructions in the documentation to correctly register the data')
    // }
  },

  directives: {
    validator: {
      bind (el, binding, vnode) {
        const [ form ] = vnode.data.model.expression.split('.')

        // if the form property does not exist in validations, set.
        if (!vnode.context.validations[form]) {
          vnode.context.$set.call(vnode, vnode.context.validations, form, {})
        }
      },

      inserted (el, { value: rules }, vnode) {
        const [ form, key ] = vnode.data.model.expression.split('.')
        const data = vnode.context[form]

        // nextTick? because data was not built yet.
        vnode.context.$nextTick(() => {
          const validations = {
            ...vnode.context.validations,
            [form]: {
              ...vnode.context.validations[form],
              [key]: {
                ...vnode.context.validations[form][key],
                ...rules
              }
            }
          }

          vnode.context.validations = vnode.context.$validator.init(data, null, validations)
          vnode.context.$validator.setValidations.call(vnode.context, vnode.context.validations)
        })
      }
    }
  },

  data () {
    return {
      validations: {},
      messages: {}
    }
  },

  computed: {
    $validations () {
      /* eslint-disable */
      const { validation } = this.$options
      const { validations = {}, messages = {}, ...data } = this.$data
      /* eslint-enable */

      if (validation) {
        return Object.entries(data).reduce((dataAcc, [form, dataValue]) => {
          if (Object.keys(validation).includes(form)) {
            const defaultState = {
              isTouched: false,
              isDirty: false,
              isFilled: false,
              isValid: false,
              errors: []
            }

            dataAcc = {
              ...dataAcc,
              [form]: Object.keys(dataValue).reduce((initialForm, key) => {
                const filled = { isFilled: !!dataValue[key] }
                const validations = (validation && validation[form][key]) || {}

                let errors = []

                RULES.some(rule => {
                  if (validation[form] && validation[form][key] && validation[form][key][rule]) {
                    const msg = messages && messages[form][key] && messages[form][key][rule]
                    const error = VALIDATIONS[rule](dataValue[key], msg, validation, form, key)
                    if (error) errors = [ ...errors, error ]
                  }
                })

                initialForm[key] = {
                  ...defaultState,
                  errors  ,
                  ...filled,
                  ...validations
                }

                return initialForm
              }, {})
            }
          }

          return dataAcc
        }, {})
      }

      return {}
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
