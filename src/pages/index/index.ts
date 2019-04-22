import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService} from '../../app/utility/service/myhttp.service'
import { DetailPage} from '../detail/detail'
/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  slideList:Array<any>=[];
  newArrivalItems:Array<any>=[];
  recommendedItems:Array<any>=[];
  detail:any;
  constructor(private myhttp:MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.detail=DetailPage;
  }

  ionViewDidLoad() {
    this.myhttp.sendRequest('http://127.0.0.1/ajia_code/datas/product/index.php').subscribe((result)=>{
      this.slideList=result.carouselItems;
      this.newArrivalItems=result.newArrivalItems;
      this.recommendedItems=result.recommendedItems;
    })
  }

  doRefresh(refresher){
    setTimeout(()=>{
      if(this.slideList.length>0){
        refresher.complete();
      }
    },1000)
  }

}
