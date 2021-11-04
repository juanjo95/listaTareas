import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {

  tarea:string = '';
  listaTareas: Array<Tarea> = [];

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('listado') != null){
      this.listaTareas = JSON.parse(localStorage.getItem('listado')!);
    }
  }

  agregarTarea():void{
    const tarea = {
      tarea: this.tarea,
      finalizada: false,
    }

    this.listaTareas.push(tarea);
    this.actualizarLocalStorage();
    this.tarea = '';
  }

  eliminarTarea(indice:number):void{
    this.listaTareas.splice(indice, 1);
    this.actualizarLocalStorage();
    if(this.listaTareas.length == 0){
        localStorage.clear();
    }
  }

  actualizarTarea(tarea:Tarea,indice:number):void{
    this.listaTareas[indice].finalizada = !tarea.finalizada;
    this.actualizarLocalStorage();
  }

  actualizarLocalStorage(){
    localStorage.setItem('listado',JSON.stringify(this.listaTareas));
  }

}
