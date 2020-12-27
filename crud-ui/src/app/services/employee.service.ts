import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from "../Interfaces/EmployeeInterface"
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee
  employees: Employee[]
  readonly baseURL = "http://localhost:3000/employees"
  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee) {
    return this.http.post(this.baseURL, employee);
  }
  readEmployees() {
    return this.http.get(this.baseURL);
  }
  updateEmployee(employee: Employee) {
    return this.http.put(`${this.baseURL}/${employee._id}`, employee)
  }
  deleteEmployee(_id: string) {
    return this.http.delete(`${this.baseURL}/${_id}`);
  }
}
