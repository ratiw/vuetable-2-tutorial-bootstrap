<template>
  <vuetable ref="vuetable"
    api-url="http://vuetable.ratiw.net/api/users"
    :fields="fields"
    :css="css"
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  components: {
    Vuetable
  },
  data () {
  	return {
      css: {
        tableClass: 'table table-striped table-bordered'
      },
      fields: [
        'name', 'email', 
        {
          name: 'birthdate',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'nickname',
        },
        {
          name: 'gender',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'salary',
          titleClass: 'text-center',
          dataClass: 'text-right'
        }
      ]
  	}
  }
}
</script>