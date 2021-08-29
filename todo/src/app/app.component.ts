import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: 'add' | 'list' = "list";
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

    this.load();

  }

  public add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
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
    this.save();
  }

  public maskAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  public markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  public save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  public load() {
    const data = localStorage.getItem('todos');
    this.todos = !!data ? JSON.parse(data) : [];
  }

  public changeMode(mode: 'add' | 'list') {
    this.mode = mode;
  }
}
