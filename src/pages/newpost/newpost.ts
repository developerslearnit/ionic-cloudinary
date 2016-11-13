import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { File, Camera, Transfer } from 'ionic-native';
import { AppSettings } from '../../AppSettings/AppSettings';
import { HomePage } from '../home/home';

declare var cordova: any;

@Component({
  selector: 'page-newpost',
  templateUrl: 'newpost.html'
})
export class Newpost {
  postTitle: any;
  desc: any;
  imageChosen: any = 0;
  imagePath: any;
  imageNewPath: any;

  constructor(public navCtrl: NavController,
    public actionSheet: ActionSheetController,
    private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {

  }


  uploadPhoto() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let filename = this.imagePath.split('/').pop();
    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: { 'title': this.postTitle, 'description': this.desc }
    };


    const fileTransfer = new Transfer();

    fileTransfer.upload(this.imageNewPath, AppSettings.API_UPLOAD_ENDPOINT,
      options).then((entry) => {
        this.imagePath = '';
        this.imageChosen = 0;
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        alert(JSON.stringify(err));
      });
  }

  chooseImage() {

    let actionSheet = this.actionSheet.create({
      title: 'Choose Picture Source',
      buttons: [
        {
          text: 'Gallery',
          icon: 'albums',
          handler: () => {
            this.actionHandler(1);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.actionHandler(2);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }


  //}

  actionHandler(selection: any) {
    var options: any;

    if (selection == 1) {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    } else {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    }

    Camera.getPicture(options).then((imgUrl) => {

      var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
      var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
      sourceFileName = sourceFileName.split('?').shift();
      File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
        this.imagePath = imgUrl;
        this.imageChosen = 1;
        this.imageNewPath = result.nativeURL;

      }, (err) => {
        alert(JSON.stringify(err));
      })

    }, (err) => {
      alert(JSON.stringify(err))
    });

  }
  
}
