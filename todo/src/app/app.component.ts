import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: any[] = [];
  public title: String = "Minhas Tarefas";

  constructor() {
    this.todos.push("passear com o cachorro");
    this.todos.push("ir ao supermercado");
    this.todos.push("cortar o cabelo");
  }
}
