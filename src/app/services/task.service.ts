import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, from, map, tap } from 'rxjs';
import { wait } from '../shared/utilities/wait';

@Injectable({ providedIn: 'root' })
export class TaskService {
  getTasksByProjectId(projectId: number) {
    return this._getTasksFromLocalStorage().pipe();
  }

  private _tasks$ = new BehaviorSubject<Task[]>([]);
  tasks$ = this._tasks$.asObservable();

  getTasks(projectId: number) {
    return this._getTasksFromLocalStorage().pipe(
      map((tasks) => tasks.filter((task) => task.projectId === projectId)),
      tap((tasks) => this._tasks$.next(tasks))
    );
  }

  getTask(id: number) {
    return this._getTasksFromLocalStorage().pipe(
      map((tasks) => tasks.find((p) => p.id == id) || null)
    );

    //Array Function
    //const project = this._projects.find((p) => { return p.id == id });
    //Simple Function (Both are the same thing; Array Functions are mostly used in modern browsers and technology)
    //const project = this._projects.find(function(p) { return p.id == id });
  }

  addTask(task: Task) {
    //This saves the project to localstorage
    return this._saveTaskToLocalStorage(task).pipe(
      map((id) => {
        task.id = id;
        return task;
      }),
      tap((task) => {
        this._tasks$.value.push(task);
        this._tasks$.next(this._tasks$.value);
      })
    );
  }

  updateTask(task: Task) {
    return this._saveTaskToLocalStorage(task).pipe(
      map(() => {
        return task;
      }),
      tap((_task) => {
        const existingTask = this._tasks$.value.find((p) => p.id == task.id);
        if (!existingTask) return;

        const index = this._tasks$.value.indexOf(existingTask);
        const tasks = Object.assign([], this._tasks$.value, {
          [index]: task,
        });
        this._tasks$.next(tasks);
      })
    );
  }

  removeTask(id: number) {
    return this._deleteTasksFromLocalStorage(id).pipe(
      tap(() => {
        const tasks = this._tasks$.value.filter((p) => p.id != id);
        this._tasks$.next(tasks);
      })
    );
  }

  private _getTasksFromLocalStorage() {
    return from(wait(500)).pipe(
      map(
        () => JSON.parse(localStorage.getItem('tasks') || '[]') as Array<Task>
      )
    );
  }

  private _saveTaskToLocalStorage(task: Task) {
    return this._getTasksFromLocalStorage().pipe(
      tap((tasks) => {
        const existingTask = tasks.find((p) => p.id == task.id);
        if (!existingTask) {
          task.id = tasks.length + 1;
          tasks.push(task);
        } else {
          const index = tasks.indexOf(existingTask);
          tasks = Object.assign([], tasks, { [index]: task });
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
      }),
      map(() => task.id)
    );
  }

  private _deleteTasksFromLocalStorage(id: number) {
    return this._getTasksFromLocalStorage().pipe(
      tap((tasks) => {
        tasks = tasks.filter((p) => p.id != id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      })
    );
  }
}
