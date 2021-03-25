import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEventPattern, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['female', 'male', 'rather not say'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Anna', 'Chris'];


  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbbidenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const formControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(formControl);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbbidenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbbiden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
