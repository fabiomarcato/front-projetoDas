import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { InserirClienteComponent } from './cliente/inserir-cliente/inserir-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'clientes', redirectTo: 'clientes/listar' },
  { path: 'clientes/listar', component: ListarClienteComponent },
  { path: 'clientes/novo', component: InserirClienteComponent },
  { path: 'clientes/editar/:id', component: EditarClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
