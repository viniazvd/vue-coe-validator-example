export default function (validations) {
  // dynamically records listeners to deactivate touch inputs
  const forms = this.$el.querySelectorAll('form[id]')

  if (forms.length) {
    forms.forEach(form => {
      Array.from(form.elements).forEach((element, index) => {
        // register events only for those who have validation
        if (validations[form.id][form[index].name]) {
          console.log('remove')
          form[index].removeEventListener('blur', this.handlerBlur(form.id, element), { once: true, capture: false, passive: false })
        }
      })
    })
  }
}
