import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirPedidoComponent } from './inserir-pedido.component';

describe('InserirPedidoComponent', () => {
  let component: InserirPedidoComponent;
  let fixture: ComponentFixture<InserirPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
