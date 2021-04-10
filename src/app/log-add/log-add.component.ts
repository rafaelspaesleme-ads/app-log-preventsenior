import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validator, Validators} from "@angular/forms";
import { ApiService } from "../api.service";

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.scss']
})
export class LogAddComponent implements OnInit {

  // @ts-ignore
  logForm: FormGroup;
  isLoadingResults: boolean | undefined;


  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  addLog(form: NgForm) {
    console.log('log', form);
    this.isLoadingResults = true;
    this.api.addOrUpdateLog({...form, active: true})
      .subscribe(response => {
        // @ts-ignore
        const id = response.data['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/log-detalhe', id]);
      }, error => {
        console.log(error);
        this.isLoadingResults = false;
      })

  }

  ngOnInit(): any {
    this.logForm = this.formBuilder.group({
      'fileName': ["", Validators.required],
      'dateTime': ["", Validators.required, Validators.pattern('[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9].[0-9][0-9][0-9]')],
      'ip': ["", Validators.required, Validators.pattern('[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5]')],
      'request': ["", Validators.required],
      'statusHttp': ["", Validators.required, Validators.pattern('[0-5][0-9][0-9]')],
      'userAgent': ["", Validators.required]
    })
  }

}
