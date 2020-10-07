import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent implements OnInit {


  @Input () buttonConfig : MyButtonConfig ;

  constructor() { }

  ngOnInit(): void {
  }

}

export class MyButtonConfig {
  customCssClass: string;
  text: string;
  icon: string;
}

