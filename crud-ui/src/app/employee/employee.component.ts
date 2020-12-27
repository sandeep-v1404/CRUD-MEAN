import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Employee } from '../Interfaces/EmployeeInterface';
import { EmployeeService } from '../services/employee.service';

declare const M: any

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.reloadEmployeeList();
  }
  reloadEmployeeList() {
    this.employeeService.readEmployees().subscribe(res => {
      this.employeeService.employees = res as Employee[];
    });

  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.addEmployee(form.value).subscribe(res => {
        M.toast({ html: "Saved Successfully", classes: "rounded" })
        this.resetForm(form);
        this.reloadEmployeeList();
      })
    }
    else {
      this.employeeService.updateEmployee(form.value).subscribe(res => {
        M.toast({ html: "Updated Successfully", classes: "rounded" });
        this.resetForm(form);
        this.reloadEmployeeList();
      })

    }

  }
  onEdit(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }


  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }
  onDelete(_id: string, form: NgForm) {
    if (confirm("Are you Sure ?")) {
      this.employeeService.deleteEmployee(_id).subscribe(res => {
        this.reloadEmployeeList();
        this.resetForm();
        M.toast({ html: "Deleted Successfully", classes: "rounded" });
      })
    }

  }
}
