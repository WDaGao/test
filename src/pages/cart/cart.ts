import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import { OrderConfirmPage} from '../order-confirm/order-confirm'
//import { isLeapYear } from 'ionic-angular/umd/util/datetime-util';

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
  OrderConfirmPage:any;//跳转OrderConfirmPage
  isLogin: boolean = false;//判断是否登录
  cartList: Array<any> = [];//空数组接收购物车数据
  goodsCount: number = 1;//接收商品数量
  goodsPrice:number=0;
  getCartList:Array<any>=[];//订单列表
  constructor(public myToast:ToastController,public myhttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.home = HomePage
    this.Login = LoginPage
    this.OrderConfirmPage=OrderConfirmPage;
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
  ngAfterContentChecked() {
    
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
    //msg.path[3].firstElementChild.firstElementChild.setAttribute("checked","true");
    //let isChecked=msg.path[3].firstElementChild.firstElementChild.lastElementChild.attributes[5].value;
    msg.path[0].previousElementSibling.innerHTML++;
    this.goodsCount = msg.path[0].previousElementSibling.innerHTML;
    this.setCount(index, this.goodsCount)
    /*console.log(isChecked);
    if(isChecked=='true'){
      msg.path[3].firstElementChild.firstElementChild.lastElementChild.attributes[5].value='true';
      console.log(msg.path[3].firstElementChild.firstElementChild.lastElementChild.attributes[5].value);
    }else{
      msg.path[3].firstElementChild.firstElementChild.lastElementChild.attributes[5].value='false';
    }*/
    this.goodsPrice=0;
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
    this.goodsPrice=0;
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
  //添加订单
  addDingdan(lid,buyCount,iid){
    this.myhttp.sendRequest("http://127.0.0.1/ajia_code/datas/cart/dingdan.php?lid="+lid+"&buyCount="+buyCount+"&iid="+iid)
      .subscribe((result)=>{
        //console.log(result);
      })
  }
  //判断复选框是否被选中
  upDatePepper(msg:any,index:number){
    var a=this.cartList[index].count;
    if(msg.checked==true){
      this.goodsPrice+=parseInt(msg._elementRef.nativeElement.getAttribute("price"))*a;
      this.addDingdan(this.cartList[index].lid,this.cartList[index].count,this.cartList[index].iid);
    }else{
      this.goodsPrice-=parseInt(msg._elementRef.nativeElement.getAttribute("price"))*a;
      this.addDingdan(this.cartList[index].lid,this.cartList[index].count,this.cartList[index].iid);
    }
  }
  //结算
  toPay(){
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/cart/ddlist.php')
    .subscribe((result)=>{
      console.log(result)
      if(result.data.length==0){
        this.myToast.create({
          message: "您未选择任何商品",
          duration: 1000,
          position: 'bottom'
        }).present();
      }else{
        this.navCtrl.push(OrderConfirmPage);
      }
    })
  }

}
