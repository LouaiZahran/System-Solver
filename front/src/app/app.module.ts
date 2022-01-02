import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {homecomponent} from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './home/home.service';
import { SystemSolverComponent } from './system-solver/system-solver.component';
import { RootFindingComponent } from './root-finding/root-finding.component';

@NgModule({
  declarations: [
    AppComponent,
    homecomponent,
    SystemSolverComponent,
    RootFindingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }