import Vue from 'vue'
import Root from './Root.vue'

import validator from './support/plugin/validator'

Vue.use(validator, {
  messages: {
    required: 'must be filled',
    alpha: 'must be alpha'
  }
})

Vue.config.productionTip = false

new Vue({ render: h => h(Root) }).$mount('#app')
