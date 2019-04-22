import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service';

/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  isUserName:string="未登录";
  constructor(public myhttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }
  ionViewWillEnter(){
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/user/session_data.php').subscribe((result)=>{
      if(result.uname==null){
        this.isUserName="未登录";
      }else{
        this.isUserName=result.uname;
      }
    })
  }

}
