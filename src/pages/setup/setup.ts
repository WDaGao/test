import { Component } from '@angular/core';
import { LoadingController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SetupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  myLoading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myhttp: MyHttpService,
    public myToast: ToastController,
    public myLoadCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {

  }
  loginOut() {
    let msg: any;
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/user/logout.php').subscribe((result) => {
      if (result.code == 200) {
        msg = "退出成功"
        console.log(msg);
        this.navCtrl.push(LoginPage)
      }
    })
  }
}
