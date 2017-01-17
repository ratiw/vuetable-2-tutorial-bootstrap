<template>
  <div class="container">
    <vuetable ref="vuetable"
      api-url="http://vuetable.ratiw.net/api/users"
      :fields="fields"
      :css="css"
      pagination-path=""
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>
    <vuetable-pagination ref="pagination"
      :css="cssPagination"
      :icons="icons"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import accounting from 'accounting'
import moment from 'moment'

export default {
  components: {
    Vuetable,
    VuetablePagination
  },
  data () {
  	return {
      css: {
        tableClass: 'table table-striped table-bordered'
      },
      cssPagination: {
        wrapperClass: 'pagination',
        activeClass: 'btn-primary',
        disabledClass: 'disabled',
        pageClass: 'btn btn-border',
        linkClass: 'btn btn-border',
      },
      icons: {
        first: '',
        prev: '',
        next: '',
        last: '',
      },
      fields: [
        'name', 'email', 
        {
          name: 'birthdate',
          titleClass: 'text-center',
          dataClass: 'text-center',
          callback: 'formatDate|DD-MM-YYYY'
        },
        {
          name: 'nickname',
          callback: 'allcap'
        },
        {
          name: 'gender',
          titleClass: 'text-center',
          dataClass: 'text-center',
          callback: 'genderLabel'
        },
        {
          name: 'salary',
          titleClass: 'text-center',
          dataClass: 'text-right',
          callback: 'formatNumber'
        }
      ]
  	}
  },
  methods: {
    allcap (value) {
      return value.toUpperCase()
    },
    genderLabel (value) {
      return value === 'M'
        ? '<span class="label label-warning"><span class="glyphicon glyphicon-star"></span> Male</span>'
        : '<span class="label label-info"><span class="glyphicon glyphicon-heart"></span> Female</span>'
    },
    formatNumber (value) {
      return accounting.formatNumber(value, 2)
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    }
  }
}
</script>
<style>
.btn.btn-border {
  border: 1px solid;
  margin-right: 2px;
}
</style>