import { Component, OnInit } from '@angular/core';
import {ProgramService} from '../../../services/program.service';
import {Program} from '../../../models/TrainingProgram';
import {faPlusSquare } 
  from '@fortawesome/free-solid-svg-icons'
import {faTwitter, faLinkedinIn, faFacebookF } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'program-listing',
  templateUrl: './program-listing.component.html',
  styleUrls: ['./program-listing.component.css']
})
export class ProgramListingComponent implements OnInit {

  searchKeyword: string;
  createIcon = faPlusSquare;
  facebookIcon = faFacebookF;
  linkedInIcon = faLinkedinIn;
  twitterIcon = faTwitter;

  programs: Program[];
  constructor(private programSvc: ProgramService) { }

  ngOnInit() {
    this.programSvc.getPrograms(this.searchKeyword)
    .subscribe(_programs => {
      this.programs = _programs;
    })
  }
}
