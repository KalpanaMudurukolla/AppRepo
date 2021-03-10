import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
onSubmit(ref:any){
  let userObj=ref.value;
  this.us.createUser(userObj).subscribe(
    res=>{
      if(res["message"]=="user created successfully")
      {
        alert("user created successfully");
        //navigate to login
        this.router.navigateByUrl("/login")
      }
      else
      {
        alert("user name is already existed!!.. please choose another.");
      }
    },
    err=>{
      alert("something went wrong in user creation")
      console.log(err)
    }
  )
}
}
