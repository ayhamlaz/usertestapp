import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../1.Services/users.service';
import { User } from '../2.Models/user';
import { flyInOut, visibility } from '../3.Animations/app.animation';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  animations: [visibility(), flyInOut()],
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  user!: User;

  constructor(private route: ActivatedRoute, private router: Router, private srv: UsersService) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.srv.getUserById(param['id']).subscribe((res) => {
        this.user = res.data;
      }, (err) => console.log(err))
    })
  }

}
