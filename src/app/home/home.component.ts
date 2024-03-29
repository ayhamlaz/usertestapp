import { Component } from '@angular/core';
import { UsersService } from '../1.Services/users.service';
import { User } from '../2.Models/user';
import { flyInOut, visibility } from '../3.Animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  host: { '[@flyInOut]': 'true', 'style': 'display: block' },
  animations: [visibility(), flyInOut()],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  users!: User[];
  nextPage: number = 1;
  total_pages: number = 1;
  loading!: boolean;

  constructor(private srv: UsersService) { }

  ngOnInit() {
    this.loading = true;
    this.srv.getUsers(this.nextPage).subscribe((res) => {
      this.users = res.data;
      this.total_pages = res.total_pages;
      this.nextPage++;
      this.loading = false;
    }, (err) => console.log(err));
  }

  moreUsers() {
    if (this.nextPage <= this.total_pages) {
      this.loading = true;
      this.srv.getUsers(this.nextPage).subscribe((res) => {
        this.users = this.users.concat(res.data);
        this.total_pages = res.total_pages;
        this.nextPage++;
        this.loading = false;
      }, (err) => console.log(err));
    }

  }

}
