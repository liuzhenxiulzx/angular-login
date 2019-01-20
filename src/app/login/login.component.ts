import { Component, OnInit } from '@angular/core';
import { Apollo} from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  userAll:any=[];//用户数据
  isLogin:boolean=false;//是否登录成功
  isShow:boolean=false; //是否显示用户列表

// 实例化Apollo类
  constructor(private apollo:Apollo) { }
//获取用户信息数据
  ngOnInit() {
    this.apollo.watchQuery({
      query:gql`
      query{
        users{
          username
          email
          password
        }
      } 
      `
    })
    .valueChanges.subscribe(result=>{
      // 把数据保存到rates中
      this.userAll = result.data['users'];
    })
  }
  //点击登录时
  login(name,password){
    this.userAll.forEach(res => {
    
      // 判断用户名和密码
        if(name==res.username && password==res.password){
          // 登录成功
          this.isLogin = true;
        }
    });
    if(this.isLogin){
      this.isLogin=false;
      // 显示用户列表
      this.isShow=true;
    }
    else
    {
      alert('登录失败')
    }
  }

}
