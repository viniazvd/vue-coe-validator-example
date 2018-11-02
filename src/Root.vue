<template>
  <div id="app">
    <section>
      <form id="form1" @click.prevent>
        <c-input
          label="Razão social"
          name="name"
          :validation="$hasError('name', 'form1')"
          v-validator="{ required: true }"
          v-model="form1.name"
        />

        <c-input
          label="E-mail"
          name="email"
          :validation="$hasError('email', 'form1')"
          v-model="form1.email"
        />

        <c-input
          label="Cnpj"
          name="registry_code"
          :validation="$hasError('registry_code', 'form1')"
          v-model="form1.registry_code"
        />

        <c-input
          label="Telefone"
          name="phone"
          :validation="$hasError('phone', 'form1')"
          v-model="form1.phone"
        />

        <c-input
          label="Cep"
          name="zipcode"
          :validation="$hasError('zipcode', 'form1')"
          v-model="form1.zipcode"
        />

        <c-input
          label="Número"
          name="number"
          :validation="$hasError('number', 'form1')"
          v-model="form1.number"
        />

        <c-input
          label="Complemento"
          name="additional_details"
          v-model="form1.additional_details"
        />

        <c-input
          label="Bairro"
          name="neighborhood"
          :validation="$hasError('neighborhood', 'form1')"
          v-model="form1.neighborhood"
        />

        <c-input
          label="Cidade"
          name="city"
          :validation="$hasError('city', 'form1')"
          v-model="form1.city"
        />

        <c-input
          label="Estado"
          name="state"
          :validation="$hasError('state', 'form1')"
          v-model="form1.state"
        />

        <c-input
          label="Observações"
          name="description"
          v-model="form1.description"
        />

        <button @click="$resetValidations('form1')">Reset Form</button>
        <button @click="isValid">is valid?</button>
        <button @click="submit">Salvar</button>
      </form>
    </section>
  </div>
</template>

<script>
import CInput from './components/CInput'

// mixins
import formSetup from './support/mixin/formSetup'

export default {
  name: 'init-form1',

  components: { CInput },

  mixins: [ formSetup ],

  data () {
    return {
      form1: {
        name: '',
        email: '',
        registry_code: '',
        phone: '',
        zipcode: '',
        number: '',
        additional_details: '',
        neighborhood: '',
        city: '',
        state: '',
        description: ''
      },
      form2: {
        name2: '',
        email2: '',
        registry_code2: '',
        phone2: '',
        zipcode2: '',
        number2: '',
        additional_details2: '',
        neighborhood2: '',
        city2: '',
        state2: '',
        description2: ''
      },
      coe: '',
      blz: '?'
    }
  },

  validation: {
    form1: {
      // name: {
      //   required: true
      // },
      email: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      },
      registry_code: {
        required: true
      },
      phone: {
        required: true
      },
      zipcode: {
        required: true
      },
      number: {
        required: true
      },
      neighborhood: {
        required: true
      },
      city: {
        required: true
      },
      state: {
        required: true
      }
    },

    form2: {
      name2: {
        required: true
      },
      email2: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      },
      registry_code2: {
        required: true
      },
      phone2: {
        required: true
      },
      zipcode2: {
        required: true
      },
      number2: {
        required: true
      },
      neighborhood2: {
        required: true
      },
      city2: {
        required: true
      },
      state2: {
        required: true
      }
    }
  },

  messages: {
    form1: {
      name: {
        required: 'não pode ser vazio!'
      }
    },
    form2: {
      name2: {
        required: 'não pode ser vazio!'
      }
    }
  },

  methods: {
    isValid () {
      console.log(this.$isValidForm('form1'))
    },

    submit () {
      this.$validator.validateAll('form1', this.$data)
        .then(result => (this.validations = result))
    }
  }
}
</script>
