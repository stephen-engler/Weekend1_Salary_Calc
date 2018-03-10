/* jshint esversion: 6 */
console.log('in client.js');

let allEmployees = [];

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
  $('#submit').on('click', submitEmployees);
  $('#table').on('click', '.deleteButton', deleteTheEmployee);
}

function submitEmployees(){
  console.log('in submitEmployees');
  let firstName = $('#employeeFirstName').val();
  let lastName = $('#employeeLastName').val();
  let iDNum = $('#employeeID').val();
  let title = $('#employeeTitle').val();
  let salary = $('#employeeSalary').val();

  console.log('firstName: ' + firstName + 'lastName ' + lastName + 'idnum '+
                      iDNum + "title: " + title + 'salary: ' +salary);
  addEmployee(firstName, lastName, iDNum, title, salary);
  clearInputs();
  addToDom();
  addSalaryToDom();
  checkIfOverBudget();

}

function addEmployee(first, last, iD, title, salary){
  let newEmployee = new Employee(first, last, iD, title, salary);
  allEmployees.push(newEmployee);
  console.log('in addEmployee, new employee: ' + newEmployee);
  console.log(newEmployee.title);

}

function clearInputs(){
  $('#employeeFirstName').val('');
  $('#employeeLastName').val('');
  $('#employeeID').val('');
  $('#employeeTitle').val('');
  $('#employeeSalary').val('');
}

function addToDom(){
  let index = newestEmployee();
  let table = $('<tr></tr>');
  table.append('<td>'+allEmployees[index].firstName+'</td>');
  table.append('<td>'+allEmployees[index].lastName+'</td>');
  table.append('<td>'+allEmployees[index].iDNumber+'</td>');
  table.append('<td>'+allEmployees[index].title+'</td>');
  table.append('<td class="salaryInTable">'+allEmployees[index].salary+'</td>');
  table.append('<td><button class="deleteButton">Delete</button> </td>');

  $('#table').append(table);
}

function newestEmployee(){
  return allEmployees.length -1;
}

function monthlyCost(){
  let totalSalaryCost=0;
  allEmployees.forEach(function(employee){
    totalSalaryCost+=parseInt(employee.salary);
  });
  totalSalaryCost=totalSalaryCost/12;
  totalSalaryCost=totalSalaryCost.toFixed(2);
  console.log('in montly Cost' + totalSalaryCost);
  return totalSalaryCost;
}

function addSalaryToDom(){
  let monthlyExpenses = monthlyCost();
  $('#totalSalaryH3').text('Monthly Cost: '+ monthlyExpenses);
}

function checkIfOverBudget(){
  if(monthlyCost()>20000){
    $('#totalSalaryH3').addClass('red');
  }
}

function deleteTheEmployee(){
  console.log('in deleteTheEmployee');
}


//end
