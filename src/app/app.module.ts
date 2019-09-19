import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { FramePageComponent } from './pages/master/frame.page';
// Pages
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { SignupPageComponent } from './pages/account/signup-page/signup-page.component';
import { PetsPageComponent } from './pages/account/pets-page/pets-page.component';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
// Components
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ProductCardComponent } from './components/store/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    FramePageComponent,
    NavbarComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    SignupPageComponent,
    PetsPageComponent,
    ProductsPageComponent,
    CartPageComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
     AppRoutingModule,
     HttpClientModule,
     ReactiveFormsModule,
    ],
  providers: [
    DataService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
