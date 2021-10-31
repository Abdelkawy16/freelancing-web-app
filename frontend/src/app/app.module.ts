import { GlobalService } from 'src/app/providers/services/global.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatTabsModule } from '@angular/material/tabs'; 

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { HomeComponent } from './pages/global/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { AddskillsComponent } from './pages/user/addskills/addskills.component';
import { AddComponent } from './pages/job/add/add.component';
import { MyjobsComponent } from './pages/job/myjobs/myjobs.component';
import { ShowallComponent } from './pages/job/showall/showall.component';
import { AuthInterceptor } from './providers/interceptors/auth.interceptor';
import { AddexperiencesComponent } from './pages/user/addexperiences/addexperiences.component';
import { ApplyJobComponent } from './pages/job/apply-job/apply-job.component';
import { AddInfoComponent } from './pages/user/add-info/add-info.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';
import { GetOffersComponent } from './pages/job/get-offers/get-offers.component';
import { NotificationsComponent } from './pages/user/notifications/notifications.component';
import { GetProfileComponent } from './pages/user/get-profile/get-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AddskillsComponent,
    AddexperiencesComponent,
    AddComponent,
    MyjobsComponent,
    ShowallComponent,
    HomeComponent,
    AddexperiencesComponent,
    ApplyJobComponent,
    AddInfoComponent,
    DashboardComponent,
    EditProfileComponent,
    GetOffersComponent,
    NotificationsComponent,
    GetProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatTabsModule,
  ],
  providers: [GlobalService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
