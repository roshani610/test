import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {

  public isEmployeeList = true;
  isModalOpenForDelete = false;
  public search = '';
  public employeeForm: FormGroup;
  public employeeId;
  rowData = [];
  constructor(private empService:EmployeeService) { }

  ngOnInit(): void {
    this.getData();
    this.createForm();
  }
  getData() {
    this.empService.get().subscribe((resp: any) => {
      console.log(resp);
      if (!resp) {
        return;
      }
      this.rowData = resp.data;
    })
  }
  searchData() {
    this.empService.search({searchValue:this.search}).subscribe((resp: any) => {
      if (!resp.data) {
        return;
      }
      this.rowData = resp.data;
    })
  }
  createForm = () => {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      hobbies: new FormControl([], [Validators.required]),
      profilePic: new FormControl('', [Validators.required]),
    });
  }
  addData(formData) {
    formData.hobbies = ['adsd', 'dsd'];
    this.empService.create(formData).subscribe(resp => {
      console.log(resp);
      if (!resp) {
        return;
      }
      this.isEmployeeList = true;
      this.getData();
    })
  }
  openEditFormData = (data) => {
    this.employeeForm.patchValue(data);
  }
  updatedata = (data) => {
    this.empService.update(data).subscribe(resp => {
      if (!resp) {
        return;
      }
      console.log("data updated successfully...");
      this.isEmployeeList = true;
    })
  }
  deleteRecord(id) {
    this.employeeId = id;
    if (confirm("Are you sure you want to delete ?")) {
      this.deleteData();
    }
  }
  deleteData = () => {
    this.empService.delete(this.employeeId).subscribe(resp => {
      console.log(resp);
      if (!resp) {
        return;
      }
      alert(resp.message);
    })
  }
  
}
