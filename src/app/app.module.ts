import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SliderComponent } from './public/slider/slider.component';
import { EmpresaComponent } from './public/empresa/empresa.component';
import { SupervisoresComponent } from './public/supervisores/supervisores.component';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './user-pages/login/login.component';
import { RecoveryPasswordComponent } from './user-pages/recovery-password/recovery-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { PanelAdminComponent } from './admin/panel-admin/panel-admin.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard-admin/dashboard/dashboard.component';
import { EnterpriceComponent } from './enterprice-pages/enterprice/enterprice.component';
import { RegisterEnterpriceComponent } from './enterprice-pages/register-enterprice/register-enterprice.component';
import { ListEnterpriceComponent } from './enterprice-pages/list-enterprice/list-enterprice.component';
import { DesactivateEnterpriceComponent } from './enterprice-pages/desactivate-enterprice/desactivate-enterprice.component';
import { CarrierComponent } from './carriers-pages/carrier/carrier.component';
import { UserComponent } from './user-admins/user/user.component';
import { RegisterUserComponent } from './user-admins/register-user/register-user.component';
import { ListUserComponent } from './user-admins/list-user/list-user.component';
import { ProfileAdminComponent } from './profiles/profile-admin/profile-admin.component';
import { ProfileCarrierComponent } from './profiles/profile-carrier/profile-carrier.component';
import { MsgLogoutComponent } from './messages/msg-logout/msg-logout.component';

// ngx-charst
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HorizontalBarComponent } from './admin/dashboard-admin/charts/horizontal-bar/horizontal-bar.component';
import { PieChartComponent } from './admin/dashboard-admin/charts/pie-chart/pie-chart.component';
import { ListCarriersComponent } from './carriers-pages/list-carriers/list-carriers.component';
import { RegisterCarriersComponent } from './carriers-pages/register-carriers/register-carriers.component';
import { DesactivateCarriersComponent } from './carriers-pages/desactivate-carriers/desactivate-carriers.component';
import { VerticalBarChartComponent } from './admin/dashboard-admin/charts/vertical-bar-chart/vertical-bar-chart.component';
import { DesactivateUserComponent } from './messages/desactivate-user/desactivate-user.component';
import { RegisterCarComponent } from './carriers-pages/register-car/register-car.component';
import { OwnerCarComponent } from './carriers-pages/owner-car/owner-car.component';
import { ListDesacUserComponent } from './user-admins/list-desac-user/list-desac-user.component';

// firebase config
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// toast
import { ToastrModule } from 'ngx-toastr';
import { AdminPortadaComponent } from './public/admin-portada/admin-portada.component';
import { FormDescripComponent } from './public/forms/form-descrip/form-descrip.component';
import { PostComponent } from './public/forms/post/post.component';
import { OptionsComponent } from './messages/options/options.component';
import { Page404Component } from './redirect/page404/page404.component';
import { AccessDeniedComponent } from './redirect/access-denied/access-denied.component';

// ngx
import { QRCodeModule } from 'angularx-qrcode';

//rxjs
import { catchError, retry } from 'rxjs/operators';
import { ImgPipe } from './pipes/img.pipe';

//ngx-avatar
import { AvatarModule } from 'ngx-avatar';

//ngx-masonry
import { NgxMasonryModule } from 'ngx-masonry';
import { ViewPostComponent } from './public/view-post/view-post.component';
import { PreviewOwnerComponent } from './profiles/preview-owner/preview-owner.component';

//ngx-RatingModule
import { RatingModule } from 'ng-starrating';

// Import library module ngx-spinner
import { NgxSpinnerModule } from "ngx-spinner";
import { CommentComponent } from './public/forms/comment/comment.component';
import { ListQrCarriersComponent } from './carriers-pages/list-qr-carriers/list-qr-carriers.component';

// Ngx - print
import { NgxPrintModule } from 'ngx-print';
import { CalificationComponent } from './public/calification/calification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    EmpresaComponent,
    SupervisoresComponent,
    HomeComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    DashboardComponent,
    PanelAdminComponent,
    SidebarComponent,
    EnterpriceComponent,
    RegisterEnterpriceComponent,
    ListEnterpriceComponent,
    DesactivateEnterpriceComponent,
    CarrierComponent,
    UserComponent,
    RegisterUserComponent,
    ListUserComponent,
    ProfileAdminComponent,
    ProfileCarrierComponent,
    MsgLogoutComponent,
    HorizontalBarComponent,
    HorizontalBarComponent,
    PieChartComponent,
    ListCarriersComponent,
    RegisterCarriersComponent,
    DesactivateCarriersComponent,
    VerticalBarChartComponent,
    DesactivateUserComponent,
    RegisterCarComponent,
    OwnerCarComponent,
    ListDesacUserComponent,
    AdminPortadaComponent,
    FormDescripComponent,
    PostComponent,
    OptionsComponent,
    Page404Component,
    AccessDeniedComponent,
    ImgPipe,
    ViewPostComponent,
    PreviewOwnerComponent,
    CommentComponent,
    ListQrCarriersComponent,
    CalificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot({preventDuplicates: true}),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    QRCodeModule,
    AvatarModule,
    NgxMasonryModule,
    RatingModule,
    NgxSpinnerModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
