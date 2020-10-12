import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent implements OnInit {


  @Input () buttonConfig : MyButtonConfig ;


  
  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(event) {
    this.onClick.emit(event);
  }

}

export class MyButtonConfig {
  customCssClass: string;
  text: string;
  icon: string;

  constructor (classe,testo){
    this.customCssClass = classe;
    this.text = testo;
  }
}

