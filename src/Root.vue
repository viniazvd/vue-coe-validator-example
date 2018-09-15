<template>
  <div id="app">
    <section>
      <h3>form1</h3>
      <form name="form1">
        <c-input
          name="input1"
          label="input1"
          :validation="$hasError('input1', 'form1')"
          v-model="form1.input1"
        />

        <c-input
          name="input2"
          label="input2"
          :validation="$hasError('input2', 'form1')"
          v-model="form1.input2"
        />
      </form>
    </section>

    <section>
      <h3>form2</h3>
      <form name="form2">
        <c-input
          name="input1"
          label="input1"
          :validation="$hasError('input1', 'form2')"
          v-model="form2.input1"
        />
      </form>
    </section>
  </div>
</template>

<script>
// components
import CInput from './components/CInput'

// mixins
import formSetup from './support/mixin/formSetup'

export default {
  name: 'root',

  mixins: [ formSetup ],

  components: { CInput },

  data () {
    return {
      form1: { input1: '', input2: '22' },
      form2: { input1: '33' }
    }
  },

  validation: {
    form1: {
      input1: {
        required: true,
        alphabetic: true
      },
      input2: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      }
    },
    form2: {
      input1: {
        required: true,
        alpha: true
      }
    }
  },

  messages: {
    form1: {
      input1: {
        required: 'não pode ser vazio!',
        alphabetic: 'tá errado, é alphabetic!'
      },
      input2: {
        required: 'preenche tudo!',
        pattern: 'precisa ser e-mail!'
      }
    },
    form2: {
      input1: {
        required: 'tá vazio, não pode!',
        alpha: 'tá errado, é alpha!'
      }
    }
  }
}
</script>

<style>
.input { margin-bottom: 15px; }
</style>
