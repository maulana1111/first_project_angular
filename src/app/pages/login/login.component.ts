import { UserService } from './../../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'Login';

  // username: any;
  // password: any;
  user = new User();
  formdata: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.formdata = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
    });
  }

  onClickSubmit() {
    this.user.username = this.formdata.value.username;
    this.user.password = this.formdata.value.password;
    // console.log(this.user)
    this.userService.doLogin(this.user).subscribe({
      next: (data) => {
        // console.log(data);
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('name', data.firstName+ " " + data.lastName);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user_logged_in', 'true');
        // console.log('data = ' + JSON.stringify(data));
        this.userService._dataUser.next(data);
        this.router.navigate(['/']);
      },
      error: (err) => this.showErrorAlert(err.error.message),
    });
  }

  showSuccessAlert() {
    Swal.fire('Success!', 'Berhasil Login', 'success');
  }

  showErrorAlert(data: string) {
    Swal.fire('Error !', data, 'error');
  }
}
