import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './cliente/cliente.module';
import { PedidoModule } from './pedido/pedido.module';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProdutoModule } from './produto/produto.module';
import { ProdutoService } from './produto/services/produto.service';
import { ClienteService } from './cliente/services/cliente.service';
import { PedidoService } from './pedido/services/pedido.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClienteModule,
    PedidoModule,
    FormsModule,
    ProdutoModule,
    HttpClientModule
  ],
  providers: [ProdutoService, ClienteService, PedidoService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
