import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  constructor(private us:UserService,public au:AuthService){}
  users:Array<User>=[]
  ngOnInit(){   
    this.us.getAllUsers().subscribe((res)=>{
      this.users=res;
      console.log(this.users);
      this.users.sort((a, b) => {
        const roles = ['Admin', 'Manager','User']; // define the order of the roles
        const aIndex = roles.indexOf(a.role);
        const bIndex = roles.indexOf(b.role);
        return aIndex - bIndex; // sort by index in roles array
      });
    })    
  }
  delete(id:string)
  {
    this.users=this.users.filter( u=>u.id!=id)
    this.us.deleteUsersById(id).subscribe((res)=>{
      console.log(res);
      
      alert("User Deleted");
      
    },(error)=>{
      console.log(error);
      
    });
    
  }
  handleIconClick(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      event.target?.dispatchEvent(new MouseEvent('click'));
    }
  }

}
