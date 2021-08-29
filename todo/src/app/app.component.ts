import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = "Minhas Tarefas";
  public form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: [
        '', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])
      ]
    });

    this.todos.push(new Todo(1, "Passear com o cachorro", false));
    this.todos.push(new Todo(2, "Ir ao supermercado", false));
    this.todos.push(new Todo(3, "Cortar o cabelo", true));
  }

  public add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.clear();
  }

  public clear() {
    this.form.reset();
  }

  public remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  public maskAsDone(todo: Todo) {
    todo.done = true;
  }

  public markAsUndone(todo: Todo) {
    todo.done = false;
  }
}
