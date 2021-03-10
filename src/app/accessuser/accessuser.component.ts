import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-accessuser',
  templateUrl: './accessuser.component.html',
  styleUrls: ['./accessuser.component.css']
})
export class AccessuserComponent implements OnInit {

  constructor(private us:UserService) { }

  ngOnInit(): void {
    let userObj={}
    this.us.getUser(userObj).subscribe(
      res=>{
        alert(res["reason"])
      }
    )
  }

}
