import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import { PayPage } from '../pay/pay'

/**
 * Generated class for the OrderConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
  getCartList: Array<any> = [];
  goodsCount = 0;
  constructor(public myModalCtrl: ModalController, public myhttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/cart/ddlist.php')
      .subscribe((result) => {
        this.getCartList = result.data;
        for (var i = 0; i < result.data.length; i++) {
          this.goodsCount += parseFloat(result.data[i].price);
        }
      })
  }

  pay() {
    let myModal = this.myModalCtrl
      .create(PayPage, { price: this.goodsCount });

    myModal.present();

    //指定当关闭模态窗时，要执行的方法
    myModal.onDidDismiss((data) => {
      console.log(data);
      if (data.result) {
        //返回
        if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop();
        }
        //跳转到首页
        this.navCtrl.parent.select(0);
      }

    })
  }
}
