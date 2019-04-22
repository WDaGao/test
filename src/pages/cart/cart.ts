import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import { isLeapYear } from 'ionic-angular/umd/util/datetime-util';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  home: any; //跳转home
  Login: any;//跳转login
  isLogin: boolean = false;//判断是否登录
  cartList: Array<any> = [];//空数组接收购物车数据
  goodsCount: number = 1;//接收商品数量
  goodsPrice:number=0;
  constructor(public myhttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.home = HomePage
    this.Login = LoginPage
  }

  ionViewDidLoad() {

  }
  ionViewWillEnter() {
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/user/session_data.php')
      .subscribe((result) => {
        if (result.uid) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      })
    this.getCartData();
  }
  //接收购物车数据
  getCartData() {
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/cart/list.php')
      .subscribe((result) => {
        this.cartList = result.data;
      })
  }
  //添加
  add(msg:any, index:number) {
    msg.path[0].previousElementSibling.innerHTML++;
    this.goodsCount = msg.path[0].previousElementSibling.innerHTML;
    this.setCount(index, this.goodsCount)
  }
  //减去
  reduce(msg:any, index:number) {
    if (msg.path[0].nextElementSibling.innerHTML == 1) {
      this.delete(index);
    } else {
      msg.path[0].nextElementSibling.innerHTML--;
      this.goodsCount = msg.path[0].nextElementSibling.innerHTML;
      this.setCount(index, this.goodsCount)
    }
  }
  //修改购物车商品数量
  setCount(index: any, count: any) {
    this.myhttp.sendRequest('http://localhost/ajia_code/datas/cart/update_count.php?iid=' + this.cartList[index].iid + "&count=" + count)
      .subscribe((result: any) => {
        if (result.code == 200) {
          this.getCartData();
        }
      })
  }

  // 删除
  delete(index: number) {
    this.myhttp.sendRequest('http://localhost/ajia_code/datas/cart/del.php?iid=' + this.cartList[index].iid)
      .subscribe((result: any) => {
        if (result.code == 200) {
          this.getCartData();
        }
      })
  }
  //判断复选框是否被选中
  upDatePepper(msg:any){
    if(msg.checked==true){
      this.goodsPrice+=parseInt(msg._elementRef.nativeElement.getAttribute("price"));
    }else{
      this.goodsPrice-=parseInt(msg._elementRef.nativeElement.getAttribute("price"));
    }
  }
}
