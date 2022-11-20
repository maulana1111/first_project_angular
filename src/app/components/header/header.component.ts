import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  dataUser: any;
  nama: any;
  cond = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService._dataUser.subscribe((data) => {
      if (data) {
        var dt = JSON.parse(JSON.stringify(data));
        this.changeValue(dt.firstName + ' ' + dt.lastName, true);
      }

      if (sessionStorage.getItem('user_logged_in') === 'true') {
        this.changeValue(sessionStorage.getItem('name'), true);
      }
    });
  }

  changeValue(nama: any, cond: any): void {
    console.log('hit = '+nama);
    this.nama = nama;
    this.cond = cond;
    console.log('state = ' + this.nama);
  }

  ngOnDestroy(): void {
    if (this.dataUser) {
      // this.dataUser.unsubscribe();
      this.userService._dataUser.unsubscribe();
    }
  }

  logOut() {
    Swal.fire({
      title: 'Are you sure Want Log Out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.dataUser.unsubscribe();
        // window.location.reload();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
