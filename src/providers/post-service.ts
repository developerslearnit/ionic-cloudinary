import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { postData } from '../models/posts';
import { AppSettings } from '../AppSettings/AppSettings';

@Injectable()
export class PostService {
  posts: any;

  constructor(public http: Http) {

  }

  getPosts() {
    return this.http.get(AppSettings.API_ENDPOINT)
      .map(res => res.json());
  }

  handleError(error) {
    console.error(error);

  }

  get() {

    if (this.posts) {
      return Promise.resolve(this.posts);
    }

    return new Promise(resolve => {
      this.http.get('https://photocloudapp.herokuapp.com/api/v1/posts').map(res => <Array<postData>>(res.json()))
        .subscribe(p => {
          this.posts = p;
          resolve(this.posts);
        });
    });

  }

}


