import { Component } from '@angular/core';
import { ToastController, ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'
import { CartPage } from '../cart/cart'
import { LoginPage} from '../login/login'
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  goodsId: number;
  details: any;
  picList: any;
  CartPage: any;
  constructor(
    public myhttp: MyHttpService,
    public myAction: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public myToast:ToastController
  ) {
    this.CartPage = CartPage;
  }

  ionViewDidLoad() {
    this.goodsId = this.navParams.get('pid');
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/product/details.php?lid=' + this.goodsId).subscribe((result) => {
      console.log(result)
      this.picList = result.details.picList;
      this.details = result.details;
    })
  }
  share() {
    let actionSheet = this.myAction.create({
      buttons: [
        {
          text: '分享商品',
          handler: () => {

          }
        }, {
          text: '举报',
          handler: () => {

          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }
  addToCart() {
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/cart/add.php?buyCount=1&lid=' + this.goodsId).subscribe((result) => {
      let showMsg:string;
      console.log(result);
      if (result.code == 200) {
        //成功
        showMsg="添加成功"
      } else if (result.code == 300) {
        //未登录
        showMsg="未登录，跳转到登录界面";
        this.navCtrl.push(LoginPage);
      } else if (result.code == 500) {
        //出错了
        showMsg="添加失败"
      }
      let myTo=this.myToast.create({
        message:showMsg,
        duration:1500,
        position:'bottom'
      })
      myTo.present();
    })
  }
}
