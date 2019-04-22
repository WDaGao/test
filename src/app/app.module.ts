import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http'
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage} from '../pages/home/home'
import { IndexPage} from '../pages/index/index'
import { DetailPage} from '../pages/detail/detail'
import { CartPage} from '../pages/cart/cart'
import { LoginPage} from '../pages/login/login'
import { PayPage} from '../pages/pay/pay'
import { UserCenterPage} from '../pages/user-center/user-center'
import { OrderConfirmPage} from '../pages/order-confirm/order-confirm'
import { NotFoundPage} from '../pages/not-found/not-found'
import { MyHttpService} from './utility/service/myhttp.service'
import { SetupPage} from '../pages/setup/setup'

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomePage,
    IndexPage,
    DetailPage,
    CartPage,
    LoginPage,
    PayPage,
    UserCenterPage,
    OrderConfirmPage,
    NotFoundPage,
    SetupPage
  ],
 
    /*tabsHideOnSubPages: 'true',        //隐藏全部子页面tabs
    backButtonText: "返回"  /*修改返回按钮为返回（默认是）*/
    
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomePage,
    IndexPage,
    DetailPage,
    CartPage,
    LoginPage,
    PayPage,
    UserCenterPage,
    OrderConfirmPage,
    NotFoundPage,
    SetupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyHttpService
  ]
})
export class AppModule {}
