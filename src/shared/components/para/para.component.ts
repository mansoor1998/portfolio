import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-para',
  templateUrl: './para.component.html',
  styleUrls: ['./para.component.css']
})
export class ParaComponent implements OnInit {

  @Input('text') text: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
