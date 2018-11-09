import { Component, OnInit } from '@angular/core';
import { faStepBackward, faStepForward} from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  previousIcon = faStepBackward; 
  nextIcon = faStepForward;

  constructor() { }

  ngOnInit() {
  }

}
