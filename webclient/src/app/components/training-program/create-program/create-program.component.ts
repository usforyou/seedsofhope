import { Component, OnInit } from '@angular/core';
import {faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent implements OnInit {
  program = {};
  submitting = false;
  screen = "details";
  pageTitle = "program Details";
  nextIcon = faStepForward;
  backIcon = faStepBackward
  constructor() { }

  ngOnInit() {
  }
  submitprogram(){
    this.submitting = true;
  }
}
