export default [
  '__handle',
  {
    name: '__checkbox',
    titleClass: 'text-center',
    dataClass: 'text-center',
  },
  {
    name: 'name',
    title: '<span class="glyphicon glyphicon-user"></span> Name',
    sortField: 'name'
  },
  {
    name: 'email',
    title: '<span class="glyphicon glyphicon-envelope"></span> Email Address',
    sortField: 'email'
  },
  {
    name: 'age',
    sortField: 'birthdate',
    dataClass: 'text-center'
  },
  {
    name: 'birthdate',
    title: '<span class="glyphicon glyphicon-gift"></span> Birthdate',
    sortField: 'birthdate',
    titleClass: 'text-center',
    dataClass: 'text-center',
    callback: 'formatDate|DD-MM-YYYY'
  },
  {
    name: 'nickname',
    title: '<span class="glyphicon glyphicon-tag"></span> Nickname',
    sortField: 'nickname',
    callback: 'allcap'
  },
  {
    name: 'gender',
    title: '<span class="glyphicon glyphicon-asterisk"></span> Gender',
    sortField: 'gender',
    titleClass: 'text-center',
    dataClass: 'text-center',
    callback: 'genderLabel'
  },
  {
    name: 'salary',
    title: '<span class="glyphicon glyphicon-usd"></span> Salary',
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
]
