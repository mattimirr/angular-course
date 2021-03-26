import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(response => {
      this.isFetching = false;
      this.loadedPosts = response;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(response => {
      this.isFetching = false;
      this.loadedPosts = response;
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
