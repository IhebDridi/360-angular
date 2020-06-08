import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  APIUrl: string;
  constructor(private navigation: Router,private http: HttpClient) { }

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: Array<object>) {
    this.messageSource.next(message)
  }

  onGetProjects(item:{ProjectName}){
    this.APIUrl = "http://localhost:4000/ProjectData/ShowOneProject"
    this.http.post(this.APIUrl,item).subscribe(gotData =>{
      console.log(gotData);
    });

  }
}
