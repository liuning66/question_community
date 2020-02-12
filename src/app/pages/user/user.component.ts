import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/User";
import {DateUtil} from "../../utils/DateUtil";
import {HttpService} from "../../service/http.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  userList:Array<User> = [];
  constructor(private http:HttpService) { }

  ngOnInit() {
    this.requestData();
    this.getDate();
  }
  getDate() {
    let date = DateUtil.format(new Date(),"yyyy-MM-dd");
    console.log(date);
  }

  requestData() {
    let url = "http://localhost:8081/say";
    // let username = "zhangsan"
  //   let data = this.http.post<Array<User>>(url,{
  //     username
  //   }
  // ).subscribe(res=>{console.log(res)});


    this.http.post<Array<User>>(url,{
      username:"zhangsan",
    },{
      success:(res)=>{
        console.log(res);
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("请求完成！！！");
      }
    });
  }
}
