import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text" : this.type="password";
  }

  onSignup(){
    if(this.signupForm.valid)
    {
      //Send object to dtabase
      this.authService.signup(this.signupForm.value).subscribe({
        next:(res=>{
          this.toast.success({detail:"SUCCESS", summary: res.message, duration: 5000});
          this.router.navigate(['login']);
        }),
        error:(err=>{
          this.toast.error({detail:"ERROR", summary: err?.error.message, duration: 5000});
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.signupForm);
      alert("Your form is invalid");
      //throw error using toaster with required field
    }
  }
}
