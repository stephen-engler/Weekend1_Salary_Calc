/* jshint esversion: 6 */
console.log('in client.js');

let allEmployees = [];

let totalMonthlyExpenses=0;

class Employee{
  constructor(firstNameIn, lastNameIn, iDNumberIn, titleIn, salaryIn){
    this.firstName = firstNameIn;
    this.lastName = lastNameIn;
    this.iDNumber = iDNumberIn;
    this.title = titleIn;
    this.salary = salaryIn;
  }
}

$(document).ready(readyNow);

function readyNow(){
  console.log("in jq: readyNow");
  $('#submit').on('click', submitEmployees);//on click runs submitEmployees func
  $('#table').on('click', '.deleteButton', deleteTheEmployee);//runds deleteTheEmployee
}

//gets the vals of user input
//makes new employe class
function submitEmployees(){
  console.log('in submitEmployees');
  let firstName = $('#employeeFirstName').val();
  let lastName = $('#employeeLastName').val();
  let iDNum = $('#employeeID').val();
  let title = $('#employeeTitle').val();
  let salary = $('#employeeSalary').val();

  console.log('firstName: ' + firstName + 'lastName ' + lastName + 'idnum '+
                      iDNum + "title: " + title + 'salary: ' +salary);
  let newEmployee = addEmployee(firstName, lastName, iDNum, title, salary);

  clearInputs();
  addToDom(newEmployee);
  addSalaryToDom(monthlyCost());
  checkIfOverBudget();


}

function addEmployee(first, last, iD, title, salary){
  let newEmployee = new Employee(first, last, iD, title, salary);
  allEmployees.push(newEmployee);
  //console.log('in addEmployee, new employee: ' + newEmployee);

  return newEmployee;

}

function clearInputs(){
  $('#employeeFirstName').val('');
  $('#employeeLastName').val('');
  $('#employeeID').val('');
  $('#employeeTitle').val('');
  $('#employeeSalary').val('');
}

//adds the newest employee to the table
function addToDom(newEmployee){

  let table = $('<tr class="employeeRow" data-salary = "'+newEmployee.salary+
                '" data-id = "'+newEmployee.iDNumber+'"></tr>');//makes the initial table row


  table.append('<data value="'+newEmployee.salary+'">');
  table.append('<td>'+newEmployee.firstName+'</td>');
  table.append('<td>'+newEmployee.lastName+'</td>');
  table.append('<td>'+newEmployee.iDNumber+'</td>');
  table.append('<td>'+newEmployee.title+'</td>');
  table.append('<td class="salaryInTable">'+newEmployee.salary+'</td>');
  table.append('<td><button class="deleteButton employeeRow">Delete</button> </td>');


  $('#table').data(newEmployee.firstName , newEmployee.salary);

  console.log('test for data: ' + $('#table').data(newEmployee.firstName));

  $('#table').append(table);
  console.log('in appendtoDom test table.data' + table.data('salary'));
}

function monthlyCost(){
  let monthCost=0;
  allEmployees.forEach(function(employee){
    monthCost+=parseInt(employee.salary);
  });
  monthCost=monthCost/12;
  monthCost=monthCost.toFixed(2);
  console.log('in montly Cost' + monthCost);
  return monthCost;
}

function addSalaryToDom(monthlyExpenses){
  //let monthlyExpenses = monthlyCost();
  $('#totalSalaryH3').text('Monthly Cost: '+ monthlyExpenses);
}

function checkIfOverBudget(){
  if(monthlyCost()>20000){
    $('#totalSalaryH3').addClass('red');
  }
}

function deleteTheEmployee(){
  let salary = $(this).parent().parent().data("salary");
  let iDNumber = $(this).parent().parent().data("id");

  removeDeletedEmployeeFromArray(iDNumber);

  addSalaryToDom(monthlyCost());

  $(this).parent().parent().remove();
}

function removeDeletedEmployeeFromArray(iDNumber){
  let index = allEmployees.findIndex(function(employee){
    return employee.iDNumber == iDNumber;
  });
  allEmployees.splice(index, 1);
  console.log(allEmployees);
}


//end
