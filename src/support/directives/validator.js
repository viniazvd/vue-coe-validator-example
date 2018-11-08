export default {
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

      console.log('-----', validations)

      vnode.context.validations = vnode.context.$validator.init(data, null, validations)
      console.log('pela diretiva')
      // vnode.context.$validator.setValidations.call(vnode.context, vnode.context.validations)
    }

    // componentUpdated (el, { value: rules }, vnode) {
    //   const formReseted = vnode.context.$validator.states.forms[vnode.context._uid]

    //   if (formReseted) {
    //     console.log('foi resetado')

    //     const [ form, key ] = vnode.data.model.expression.split('.')
    //     const data = vnode.context[form]

    //     setTimeout(() => {
    //       const validations = {
    //         ...vnode.context.validations,
    //         [form]: {
    //           ...vnode.context.validations[form],
    //           [key]: {
    //             ...vnode.context.validations[form][key],
    //             ...rules
    //           }
    //         }
    //       }
    //       console.log(validations)

    //       // vnode.context.validations = vnode.context.$validator.init(data, null, validations)
    //       vnode.context.$validator.setValidations.call(vnode.context, vnode.context.validations)
    //     }, 0)
    //   } else {
    //     console.log('n foi resetado')
    //   }
    // }
  }
}
