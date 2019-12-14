// Input decorador para poder pasar elementos del componente padre al hijo
// Output para poder pasar elementos del componente hijo al padre
// EventEmitter para poder crear elementos por nosotros mismos
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// para que coja elementos jquery
declare var $: any;
@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  // se recoge la  anchura del input
  @Input() anchura: number;
  // la cambiamos el nombre pasandole al decorador etiquetas
  @Input('etiquetas') captions: boolean;
  @Output() getAutor = new EventEmitter();
  public autor: any;
  constructor() {

    this.autor = {
      nombre: 'Jose Mari',
      web: 'muchoruidoypocasluces.com',
      youtube: 'nomveacuerdo'
    };

  }
  ngOnInit() {
    $("#logo").click(function (e) {
      e.preventDefault();
      $("header").css("background", "green")
        .css("heigth", "50px");
    });

    $('.galeria').bxSlider({
      mode: 'fade',
      captions: this.captions,
      slideWidth: this.anchura
    });

    // Lanzar el evento directamente al cargar
    // this.getAutor.emit(this.autor);
  }

  lanzar(event){
    this.getAutor.emit(this.autor);
  }

}
