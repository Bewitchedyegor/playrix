var employee = [
  {id: 1, name: 'Федор', surname: 'Петров', birthdate: '11.10.90', city: 'Вологда', type: 'удалённо'},
  {id: 2, name: 'Сергей', surname: 'Васильев', birthdate: '10.09.89', city: 'Санкт-Петербург', type: 'офис'},
  {id: 3, name: 'Генадий', surname: 'Иванов', birthdate: '09.08.88', city: 'Москва', type: 'удалённо'}
];

function findEmployee (employeeId) {
  return employee[findEmployeeKey(employeeId)];
};

function findEmployeeKey (employeeId) {
  for (var key = 0; key < employee.length; key++) {
    if (employee[key].id == employeeId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#employee-list',
  data: function () {
    return {employee: employee, searchKey: ''};
  },
  computed: {
    filteredEmployees: function () {
      return this.employee.filter(function (person) {
        return this.searchKey=='' || person.surname.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Employee = Vue.extend({
  template: '#employee',
  data: function () {
    return {person: findEmployee(this.$route.params.employee_id)};
  }
});

var EmployeeEdit = Vue.extend({
  template: '#employee-edit',
  data: function () {
    return {person: findEmployee(this.$route.params.employee_id)};
  },
  methods: {
    updateEmployee: function () {
      var person = this.person;
      employee[findEmployeeKey(person.id)] = {
        id: person.id,
        name: person.name,
        surname: person.surname,
        birthdate: person.birthdate,
        city: person.city,
        type: person.type
      };
      router.push('/');
    }
  }
});

var EmployeeDelete = Vue.extend({
  template: '#employee-delete',
  data: function () {
    return {person: findEmployee(this.$route.params.employee_id)};
  },
  methods: {
    deleteEmployee: function () {
      employee.splice(findEmployeeKey(this.$route.params.employee_id), 1);
      router.push('/');
    }
  }
});

var AddEmployee = Vue.extend({
  template: '#add-employee',
  data: function () {
    return {person: {name: '', surname: '', birthdate: '', city: '', type: ''}}
  },
  methods: {
    createEmployee: function() {
      var person = this.person;
      employee.push({
        id: Math.random().toString().split('.')[1],
        name: person.name,
        surname: person.surname,
        birthdate: person.birthdate,
        city: person.city,
        type: person.type
      });
      router.push('/');
    }
  }
});

var router = new VueRouter({routes:[
  { path: '/', component: List},
  { path: '/add-employee', component: AddEmployee},
  { path: '/employee/:employee_id/edit', component: EmployeeEdit, name: 'employee-edit'},
  { path: '/employee/:employee_id/delete', component: EmployeeDelete, name: 'employee-delete'}
]});
app = new Vue({
  router:router
}).$mount('#app')