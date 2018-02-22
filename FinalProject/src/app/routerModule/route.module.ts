
import { ChatComponent } from './../components/chat/chat.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { AddItemComponent } from './../components/add-item/add-item.component';
import { PageNotFoundComponent } from './../components/page-not-found/page-not-found.component';
import { WellcomeComponent } from './../components/wellcome/wellcome.component';
import { LoginComponent } from './../components/login/login.component';
import { Routes , RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from '../components/items/items.component';
import { AutocompleteModule } from 'ng2-input-autocomplete';



export const routesConfig: Routes = [
     {path: 'home' , component: HomeComponent},
    { path: 'wellcome', component: WellcomeComponent },
    { path: 'chat', component: ChatComponent },
     {path : '' , component: HomeComponent , pathMatch: 'full'},
     {path : '**' , component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routesConfig), BrowserModule, FormsModule, CommonModule,
        AutocompleteModule.forRoot()],

    declarations: [
        HomeComponent ,
        LoginComponent ,
        NavbarComponent,
        ItemsComponent,
        AddItemComponent,
        ChatComponent ,
        WellcomeComponent,
        PageNotFoundComponent
    ],
    exports: [RouterModule]
})
export class AppRouterModule {}

