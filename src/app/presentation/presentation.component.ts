import { Component, OnInit} from '@angular/core';
declare var jquery:any;
declare var $ :any;


@Component({
    selector: 'app-presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.scss']
})

export class PresentationComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $("#details").click(function(){
      console.log("clicked");
    });
  }

  



}

