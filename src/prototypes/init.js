export default function (data, form, validation) {
  if (!form) form = Object.keys(validation)

  const defaultState = {
    isTouched: false,
    isDirty: false,
    isFilled: false,
    isValid: false,
    errors: []
  }

  // initialize by directive
  if (Array.isArray(form)) {
    let initialForm = {}

    form.forEach(formName => {
      initialForm = {
        ...initialForm,
        [formName]: Object.entries(data).reduce((initialForm, [key, value]) => {
          const filled = { isFilled: !!value }
          const validations = validation[formName][key]

          initialForm[key] = { ...defaultState, ...filled, ...validations }

          return initialForm
        }, {})
      }
    })

    return initialForm
  }

  // initialized by library configuration object
  return {
    [form]: Object.entries(data).reduce((initialForm, [key, value]) => {
      const filled = { isFilled: !!value }
      const validations = validation[key]

      initialForm[key] = { ...defaultState, ...filled, ...validations }

      return initialForm
    }, {})
  }
}
