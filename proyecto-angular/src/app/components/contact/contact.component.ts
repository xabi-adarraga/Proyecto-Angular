// viewChild para acceder a los elementos como con js querySelector
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // propiedad (ancho) para pasarle al componente hijo slider
public widthSlider: number;
public withToSlider: any;
public captions:boolean;
public autor: any;
@ViewChild('textos', {static: true}) textos;
  constructor() { 
    this.captions = true;
  }

  ngOnInit() {
    var opcion_clasica_js = document.querySelector("#texto").innerHTML;
    console.log(opcion_clasica_js);
    console.log(this.textos);
    console.log(this.textos.nativeElement.textContent);
  }
cargarSlider() {
this.withToSlider = this.widthSlider;
}
resetSlider() {
this.withToSlider = false;
}

getAutorFather(event) {
  this.autor = event;
}
  }
