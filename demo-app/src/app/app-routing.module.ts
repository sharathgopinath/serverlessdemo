import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
    {
      path: "",
      component: HomeComponent
    },
    {
        path: "callback",
        component: CallbackComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{ }