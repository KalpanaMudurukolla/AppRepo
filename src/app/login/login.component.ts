import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    localStorage.clear()
  }
  onSubmit(formRef)
  {
let credObj=formRef.value;
//if user
if(credObj.usertype=="user")
{
  delete credObj.usertype;
  this.us.loginUser(credObj).subscribe(
    res=>{
    
      if(res["message"]=="login success"){
        //save token and username in browser's memory
        localStorage.setItem("token",res["token"])
        localStorage.setItem("username",res["username"])
        //navigate to user dashboard
        this.router.navigateByUrl("/userdashboard")
      }
      else{
        alert(res["message"])
      }
   
    },
    err=>{
      alert("something went wrong in user login")
      console.log(err)
    }
  )
}
  }

}
