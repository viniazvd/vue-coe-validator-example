export default function (form, element) {
  // console.log('name', element.name)
  // console.log('value', element.value)
  const key = element.name
  const value = element.value

  const componentID = Object.keys(this.context.components)[Object.keys(this.context.components).length - 1]
  const vm = this.context.components[componentID]

  const isTouched = vm.validations[form] && vm.validations[form][key] && vm.validations[form][key].isTouched

  // to prevent unnecessary checks
  if (vm.validations && !isTouched) {
    const inputToTouch = Object.entries(vm.validations[form][key]).reduce((acc, [key, value]) => {
      acc[key] = key === 'isTouched' || value

      return acc
    }, {})

    const formToUpdate = vm.validations[form]

    const touched = {
      ...vm.validations,
      [form]: {
        ...formToUpdate,
        [key]: { ...inputToTouch }
      }
    }

    // forced validation
    return this.validate(touched, vm.messages, form, key, value || '')
  }
}
