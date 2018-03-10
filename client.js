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
  findSalaries();

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

//adds the newest employee to the table
function addToDom(){
  let index = newestEmployee();//gets index of newest employee
  let table = $('<tr class="employeeRow"></tr>');//makes the initial table row
  table.append('<td>'+allEmployees[index].firstName+'</td>');//appends the employee
  table.append('<td>'+allEmployees[index].lastName+'</td>');//in the employee array at index
  table.append('<td>'+allEmployees[index].iDNumber+'</td>');//.something
  table.append('<td>'+allEmployees[index].title+'</td>');
  table.append('<td class="salaryInTable">'+allEmployees[index].salary+'</td>');
  table.append('<td><button class="deleteButton employeeRow">Delete</button> </td>');

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
//there has to be a way to associate the button with the row...
//can count the number of rows and use dom traveral..
function deleteTheEmployee(){
  console.log('in deleteTheEmployee');
  console.log($(this));
  $(this).parent().parent().remove();
}

//find all things with the class salaryInTable
function findSalaries(){

  totalMonthlyExpenses += parseInt($('.salaryInTable').text());
  console.log('in findSalaries after parseInt' + totalMonthlyExpenses);
  totalMonthlyExpenses=totalMonthlyExpenses/12;
  console.log('in findSalaries after /12' + totalMonthlyExpenses);
}
//end
