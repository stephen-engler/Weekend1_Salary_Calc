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
}

function addEmployee(){

}

function submitEmployees(){
  console.log('in submitEmployees');
  let firstName = $('#employeeFirstName').val();
  let lastName = $('#employeeLastName').val();
}
