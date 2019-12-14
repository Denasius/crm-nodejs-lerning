import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServices} from '../shared/services/auth.services';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthServices,
              private router: Router,
              private route: ActivatedRoute
              ) {
  }

  ngOnInit() {
    this.form = new FormGroup( {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Enter to the system
      } else if (params['accessDenied']) {
        // sign i nto the system
      }
    });
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }

  }

  onSubmit() {
    this.form.disable();

    this.auth.login(this.form.value).subscribe(
      () => {
        console.log('Login success');
        this.router.navigate(['/overview']);
        },
      error => {
        console.warn('Error');
        this.form.enable();
      }
    );
  }

}
