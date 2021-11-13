import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProdutoService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
