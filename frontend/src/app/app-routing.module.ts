import { NotificationsComponent } from './pages/user/notifications/notifications.component';
import { GetProfileComponent } from './pages/user/get-profile/get-profile.component';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';
import { ApplyJobComponent } from './pages/job/apply-job/apply-job.component';
import { NotAdminGuard } from './providers/guards/not-admin.guard';
import { NotClientGuard } from './providers/guards/not-client.guard';
import { LoggedGuard } from './providers/guards/logged.guard';
import { NotLoggedGuard } from './providers/guards/not-logged.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/job/add/add.component';
import { MyjobsComponent } from './pages/job/myjobs/myjobs.component';
import { ShowallComponent } from './pages/job/showall/showall.component';
import { AddskillsComponent } from './pages/user/addskills/addskills.component';
import { HomeComponent } from './pages/global/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { AddexperiencesComponent } from './pages/user/addexperiences/addexperiences.component';
import { NotFreelancerGuard } from './providers/guards/not-freelancer.guard';
import { AddInfoComponent } from './pages/user/add-info/add-info.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { GetOffersComponent } from './pages/job/get-offers/get-offers.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path:'user', children:[
    {path:'', component:ProfileComponent, canActivate:[NotLoggedGuard]},
    {path:'notifications', component:NotificationsComponent, canActivate:[NotLoggedGuard, NotFreelancerGuard]},
    {path:'addinfo', component:AddInfoComponent, canActivate:[NotLoggedGuard]},
    {path:'addskills', component:AddskillsComponent, canActivate:[NotLoggedGuard, NotFreelancerGuard]},
    {path:'edit', component:EditProfileComponent, canActivate:[NotLoggedGuard]},
    {path:'addexperiences', component:AddexperiencesComponent, canActivate:[NotLoggedGuard, NotFreelancerGuard]},
    {path:'login', component:LoginComponent, canActivate:[LoggedGuard]},
    {path:'register', component:RegisterComponent, canActivate:[LoggedGuard]},
    {path:':id', component:GetProfileComponent, canActivate:[NotLoggedGuard]},
  ]},
  {path:'job', children:[
    {path:'', component:ShowallComponent},
    {path:'add', component:AddComponent, canActivate:[NotLoggedGuard, NotClientGuard]},
    {path:'myjobs', component:MyjobsComponent, canActivate:[NotLoggedGuard, NotClientGuard]},
    {path:'apply/:id', component:ApplyJobComponent, canActivate:[NotLoggedGuard, NotFreelancerGuard]},
    {path:'offers/:id', component:GetOffersComponent, canActivate:[NotLoggedGuard, NotClientGuard]}
  ]},
  {path:'admin', children:[
    {path:'dashboard', component:DashboardComponent, canActivate:[NotLoggedGuard, NotAdminGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
