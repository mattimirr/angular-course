import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;


  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, null, this.forbiddenPName.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenPName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'projectNameIsForbidden': true})
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
