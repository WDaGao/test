import { AfterContentChecked, Component } from '@angular/core';
import { LoadingController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import { HomePage } from '../home/home'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterContentChecked {
  uname = "";
  pwd = "";
  isShow: boolean = true;
  myLoading:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public myhttp: MyHttpService,
    public myToast: ToastController,
    public myLoadCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngAfterContentChecked() {
    if (this.uname != "" && this.pwd != "") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
  showLoading() {
    this.myLoading =
      this.myLoadCtrl.create(
        {
          content: '正在刷新数据',
          // duration:3000
        }
      );
    this.myLoading.present();

    /* 4s延迟之后，手工关掉加载中的窗口
    setTimeout(
      ()=>{
        myLoading.dismiss();
      },
      4000
    )*/

  }

  toLogin() {
    this.showLoading();
    let msg: any;
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/user/login.php?uname=' + this.uname + "&upwd=" + this.pwd).subscribe((result) => {
      if(result!=null){
        this.myLoading.dismiss();
      }
      if (result.code == 200) {
        msg = "登录成功";
        this.navCtrl.push(HomePage)
      } else if (result.code == 201) {
        msg = "用户名或密码有误";
      }
      this.myToast.create({
        message: msg,
        duration: 1000,
        position: 'bottom'
      }).present();
    })

  }

}
