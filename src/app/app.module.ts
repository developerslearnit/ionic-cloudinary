import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Newpost } from '../pages/newpost/newpost';
import { PostService } from '../providers/post-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Newpost
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Newpost
  ],
  providers: [PostService]
})
export class AppModule {}
