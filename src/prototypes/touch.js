import Vue from 'vue'

export default function (validation, messages, form, key, value) {
  const isTouched = validation[form] && validation[form][key] && validation[form][key].isTouched

  // to prevent unnecessary checks
  if (validation && Object.keys(validation).length && !isTouched) {
    const inputToTouch = Object.entries(validation[form][key]).reduce((acc, [key, value]) => {
      acc[key] = key === 'isTouched' || value

      return acc
    }, {})

    const formToUpdate = validation[form]

    const touched = {
      ...validation,
      [form]: {
        ...formToUpdate,
        [key]: { ...inputToTouch }
      }
    }

    Vue.util.defineReactive(validation, form, { ...touched })

    // solition by @vjoao
    // Vue.util.defineReactive(validation, form, { ...touched })

    console.log(validation)

    // forced validation
    return this.validate(validation, messages, form, key, value || '')
  }
}
