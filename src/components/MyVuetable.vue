<template>
  <div class="container">
    <div>
      <vuetable-pagination-info ref="paginationInfoTop"
        info-class="pull-left""
      ></vuetable-pagination-info>
      <vuetable-pagination ref="paginationTop"
        :css="cssPagination"
        :icons="icons"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    <vuetable ref="vuetable"
      api-url="http://vuetable.ratiw.net/api/users"
      :fields="fields"
      :css="css"
      pagination-path=""
      :per-page="20"
      :multi-sort="true"
      multi-sort-key="ctrl"
      :sort-order="sortOrder"
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>
    <div>
      <vuetable-pagination-info ref="paginationInfo"
        info-class="pull-left""
      ></vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
        :css="cssPagination"
        :icons="icons"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import accounting from 'accounting'
import moment from 'moment'
import Vue from 'vue'
import CustomActions from './CustomActions'

Vue.component('custom-actions', CustomActions)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
  	return {
      css: {
        tableClass: 'table table-striped table-bordered',
        loadingClass: 'loading',
        ascendingIcon: 'glyphicon glyphicon-chevron-up',
        descendingIcon: 'glyphicon glyphicon-chevron-down',
        sortHandleIcon: 'glyphicon glyphicon-menu-hamburger',
      },
      cssPagination: {
        wrapperClass: 'pagination pull-right',
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
        {
          name: '__checkbox',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },          
        {
          name: 'name',
          sortField: 'name'
        }, 
        {
          name: 'email', 
          sortField: 'email'
        },
        {
          name: 'age',
          sortField: 'birthdate',
          dataClass: 'text-center'
        },
        {
          name: 'birthdate',
          sortField: 'birthdate',
          titleClass: 'text-center',
          dataClass: 'text-center',
          callback: 'formatDate|DD-MM-YYYY'
        },
        {
          name: 'nickname',
          sortField: 'nickname',
          callback: 'allcap'
        },
        {
          name: 'gender',
          sortField: 'gender',
          titleClass: 'text-center',
          dataClass: 'text-center',
          callback: 'genderLabel'
        },
        {
          name: 'salary',
          sortField: 'salary',
          titleClass: 'text-center',
          dataClass: 'text-right',
          callback: 'formatNumber',
        },
        {
          name: '__component:custom-actions',
          title: 'Actions',
          titleClass: 'text-center',
          dataClass: 'text-center'
        }
      ],
      sortOrder: [
        {
          field: 'email',
          sortField: 'email',
          direction: 'asc'
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
      this.$refs.paginationTop.setPaginationData(paginationData)
      this.$refs.paginationInfoTop.setPaginationData(paginationData)

      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    }
  }
}
</script>
<style>
.pagination {
  margin-top: 0;
}
.btn.btn-border {
  border: 1px solid;
  margin-right: 2px;
}
.vuetable-pagination-info {
  margin-top: 8px !important;
}
</style>