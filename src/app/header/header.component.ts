import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router, NavigationEnd } from '@angular/router';
import { UsersService } from '../1.Services/users.service';
import { User } from '../2.Models/user';
import { flyIn, visibility } from '../3.Animations/app.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  host: { '[@flyIn]': 'true', 'style': 'display: block' },
  animations: [visibility(), flyIn()],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  history: number = 0;
  loading!: boolean;
  searching!: boolean;
  user!: User | undefined;

  constructor(private router: Router, private location: Location, private srv: UsersService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) ++this.history;
    });
  }

  search(id: string) {
    this.user = undefined;
    if (id) {
      this.searching = true;
      this.loading = true;
      this.srv.getUserById(id).subscribe((res) => {
        this.user = res.data;
        this.loading = false;
      }, (err) => {
        this.user = undefined;
        this.loading = false;
        console.log(err)
      })
    } else {
      this.searching = false;
      this.loading = false;
    }
  }

  back() {
    if (this.history > 1) {
      --this.history;
      --this.history;
      this.location.back();
    } else this.router.navigateByUrl("/home");
  }
}
