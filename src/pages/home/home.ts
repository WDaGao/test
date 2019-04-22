import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserCenterPage} from '../user-center/user-center'
import { CartPage} from '../cart/cart'
import { IndexPage} from '../index/index'
import { NotFoundPage} from '../not-found/not-found'
import { SetupPage} from '../setup/setup'
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  index:any;
  cart:any;
  userCenter:any;
  notFound:any;
  setup:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.index=IndexPage;
  this.cart=CartPage;
  this.userCenter=UserCenterPage;
  this.notFound=NotFoundPage;
  this.setup=SetupPage;
  }

  ionViewDidLoad() {
    
  }

}
