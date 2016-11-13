import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { Newpost } from '../../pages/newpost/newpost';

import { PostService } from '../../providers/post-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: any;
  constructor(public navCtrl: NavController,
    private postService: PostService, private loadingCtrl: LoadingController
  ) {


  }

  ionViewDidLoad() {
    this.getPosts();
  }

  getPosts() {
    let loader = this.loadingCtrl.create({
      content: "Loading Photos..."
    });
    loader.present();
    this.postService.getPosts().subscribe((val) => {
      this.posts = val.posts;
      loader.dismiss();
    });
  }




  addNewPhoto() {
    this.navCtrl.push(Newpost);
  }

}
