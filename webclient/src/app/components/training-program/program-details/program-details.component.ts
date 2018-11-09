import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { ProgramService } from "../../../services/program.service";
import { Program } from "../../../models/TrainingProgram";

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {
  program: Program;

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProgramDetails();
  }

  getProgramDetails(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['programId'];
      this.programService.getProgramById(id.toString())
        .subscribe((_program) => {
          this.program = _program;
        });
    })
  }
}
