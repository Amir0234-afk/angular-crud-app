import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { ContactComponent } from './contact/contact.component';
import { ListManagerComponent } from './list-manager/list-manager.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'list-manager', component: ListManagerComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
