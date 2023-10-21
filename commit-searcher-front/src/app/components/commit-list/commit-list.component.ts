import { Component, OnInit } from '@angular/core';
import { CommitsApiService } from '../../services/commits-api.service';
import { environment } from '../../../environments/environment';
import { Commit } from '../../models/commit.model';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.css'],
})
export class CommitListComponent implements OnInit {
  commits: Commit[] = [];
  private owner = environment.owner;
  private repositoryName = environment.repository_name;

  constructor(private commitsApiService: CommitsApiService) {}

  ngOnInit(): void {
    this.getCommits();
  }
  getCommits() {
    this.commitsApiService
      .getCommits(this.owner, this.repositoryName)
      .subscribe((data: Commit[]) => {
        this.commits = data;
      });
  }
}
