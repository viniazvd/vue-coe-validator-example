export default function (validations, form) {
  const defaultState = {
    isTouched: false,
    isDirty: false,
    isFilled: false,
    isValid: false,
    errors: []
  }

  const formReseted = Object.entries(validations[form]).map(λ => ({ ...defaultState }))

  validations = { ...validations, [form]: { ...formReseted } }
}
