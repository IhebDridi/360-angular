import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  APIUrl: string;
  loginStatus :boolean;

  CanLogin :boolean;

  private CanLoginSource = new BehaviorSubject(this.CanLogin);
  currentCanLogin = this.CanLoginSource.asObservable();

  private LoginStatusSource = new BehaviorSubject(this.loginStatus);
  currentLoginStatus = this.LoginStatusSource.asObservable();

  onsignUpTest()
  {
    this.loginStatus = true;
    console.log(this.loginStatus)
    this.LoginStatusSource.next(true)

  }
  OnLoginTest()
  {
    this.loginStatus = true;
    console.log(this.loginStatus)
    this.LoginStatusSource.next(true)

  }
  OnlogoutTest()
  {
    this.loginStatus = false;
    console.log(this.loginStatus)
    this.LoginStatusSource.next(false)
  }

  onChangeOwn()
  {
    this.CanLogin = !this.CanLogin
    console.log(this.CanLogin)
    this.LoginStatusSource.next(this.CanLogin)
  }



  onSignUp(item)
  {
    this.APIUrl = "http://localhost:3000/Users/SignUp";
    if(item.Password == item.PasswordConfirm)
    {
      const newItem = {"email": item.Email,"Password": item.Password}
      this.http.post(this.APIUrl,newItem).subscribe(gotData =>{
        console.log(gotData)
      });
    }

  }

  onLogout(){
      let headers = new Headers();
      console.log(headers.get("Authorization"))
      headers.delete("Authorization")
      localStorage.removeItem("token")
      console.log(headers.get("Authorization"))
      this.navigation.navigateByUrl("/UserLogin")
  }



  onLogin(item:{email,Password}) {
    this.APIUrl = "http://localhost:4000/Users/Login";
    console.log(item);
    this.http.post(this.APIUrl,item).subscribe(gotData =>{
      console.log(gotData);
      if(gotData.hasOwnProperty("message"))
      {
        let headers = new Headers();
        let datas = gotData["token"]
        headers.append("Authorization","bearer "+datas)
        console.log(datas);

        localStorage.setItem("token",datas)
        this.navigation.navigateByUrl("/Home")
        console.log(headers.get("Authorization"))
      }
    });
  }

  constructor(private navigation: Router,private http: HttpClient) { }
}
