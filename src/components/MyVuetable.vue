<template>
  <div class="container">
    <filter-bar></filter-bar>
    <vuetable ref="vuetable"
      api-url="http://vuetable.ratiw.net/api/users"
      :fields="fields"
      :css="css"
      pagination-path=""
      :per-page="20"
      :multi-sort="true"
      multi-sort-key="ctrl"
      :sort-order="sortOrder"
      detail-row-component="my-detail-row"
      :append-params="moreParams"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData"
    >
      <template slot="actions" scope="props">
        <div class="custom-actions">
          <button class="btn btn-default"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="glyphicon glyphicon-zoom-in"></i>
          </button>
          <button class="btn btn-default"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="glyphicon glyphicon-pencil"></i>
          </button>
          <button class="btn btn-default"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="glyphicon glyphicon-remove"></i>
          </button>
        </div>
      </template>
    </vuetable>
    <div>
      <vuetable-pagination-info ref="paginationInfo"
        info-class="pull-left"
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
import DetailRow from './DetailRow'
import FilterBar from './FilterBar'
import VueEvents from 'vue-events'
Vue.use(VueEvents)

Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    FilterBar
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
        },
        {
          name: '__slot:actions',
          title: 'Slot Actions',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
      ],
      sortOrder: [
        {
          field: 'email',
          sortField: 'email',
          direction: 'asc'
        }
      ],
      moreParams: {}
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
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (data, field, event) {
      console.log('cellClicked: ', field.name)
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onAction (action, data, index) {
        console.log('custom-actions: ' + action, data.name, index)
    }
  },
  events: {
    'filter-set' (filterText) {
      this.moreParams = {
        'filter': filterText
      }
      Vue.nextTick( () => this.$refs.vuetable.refresh())
    },
    'filter-reset' () {
      this.moreParams = {}
      this.$refs.vuetable.refresh()
      Vue.nextTick( () => this.$refs.vuetable.refresh())
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
