import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { BehaviorSubject, from, map, tap } from 'rxjs';
import { wait } from '../shared/utilities/wait';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private _projects$ = new BehaviorSubject<Project[]>([]);
  projects$ = this._projects$.asObservable();

  getProjects() {
    return this._getProjectsFromLocalStorage().pipe(
      tap((projects) => this._projects$.next(projects))
    );
  }

  getProject(id: number) {
    return this._getProjectsFromLocalStorage().pipe(
      map((projects) => projects.find((p) => p.id == id) || null)
    );

    //Array Function
    //const project = this._projects.find((p) => { return p.id == id });
    //Simple Function (Both are the same thing; Array Functions are mostly used in modern browsers and technology)
    //const project = this._projects.find(function(p) { return p.id == id });
  }

  addProject(project: Project) {
    //This saves the project to localstorage
    return this._saveProjectToLocalStorage(project).pipe(
      map((id) => {
        project.id = id;
        return project;
      }),
      tap((project) => {
        this._projects$.value.push(project);
        this._projects$.next(this._projects$.value);
      })
    );
  }

  updateProject(project: Project) {
    return this._saveProjectToLocalStorage(project).pipe(
      map(() => {
        return project;
      }),
      tap((_project) => {
        const existingProject = this._projects$.value.find(
          (p) => p.id == project.id
        );
        if (!existingProject) return;

        const index = this._projects$.value.indexOf(existingProject);
        const projects = Object.assign([], this._projects$.value, {
          [index]: project,
        });
        this._projects$.next(projects);
      })
    );
  }

  removeProject(id: number) {
    return this._deleteProjectsFromLocalStorage(id).pipe(
      tap(() => {
        const projects = this._projects$.value.filter((p) => p.id != id);
        this._projects$.next(projects);
      })
    );
  }

  private _getProjectsFromLocalStorage() {
    return from(wait(500)).pipe(
      map(
        () =>
          JSON.parse(localStorage.getItem('projects') || '[]') as Array<Project>
      )
    );
  }

  private _saveProjectToLocalStorage(project: Project) {
    return this._getProjectsFromLocalStorage().pipe(
      tap((projects) => {
        const existingProject = projects.find((p) => p.id == project.id);
        if (!existingProject) {
          project.id = projects.length + 1;
          projects.push(project);
        } else {
          const index = projects.indexOf(existingProject);
          projects = Object.assign([], projects, { [index]: project });
        }

        localStorage.setItem('projects', JSON.stringify(projects));
      }),
      map(() => project.id)
    );
  }

  private _deleteProjectsFromLocalStorage(id: number) {
    return this._getProjectsFromLocalStorage().pipe(
      tap((projects) => {
        projects = projects.filter((p) => p.id != id);
        localStorage.setItem('projects', JSON.stringify(projects));
      })
    );
  }
}
