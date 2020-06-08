import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-dropdownform-log-in',
  templateUrl: './dropdownform-log-in.component.html',
  styleUrls: ['./dropdownform-log-in.component.css']
})
export class DropdownformLogInComponent implements OnInit {


  form = this.fb.group({
    //company: null,
    email: [null, Validators.compose([
      Validators.required, Validators.email
    ])],
    Password: [null, Validators.compose([
      Validators.min(2), Validators.required
    ])]
  });

  onSubmit(item:{email,Password}) {
    console.log(item)
    this.servicer.OnLoginTest()
    /*this.servicer.onLogin(item);
    this.form.reset();*/

  }
  constructor(private fb: FormBuilder,private http: HttpClient,private navigation: Router,private servicer:AuthServiceService) {
  }


  ngOnInit(): void {
  }

}
