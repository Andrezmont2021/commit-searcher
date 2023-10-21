import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commit } from '../models/commit.model';
import { endpoints } from '../../environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CommitsApiService {
  private commitApiEndpoint = endpoints.commits_endpoint;

  constructor(private http: HttpClient) {}

  getCommits(owner: string, repositoryName: string): Observable<Commit[]> {
    return this.http.get<Commit[]>(
      `${this.commitApiEndpoint}?owner=${owner}&repositoryName=${repositoryName}`
    );
  }
}
