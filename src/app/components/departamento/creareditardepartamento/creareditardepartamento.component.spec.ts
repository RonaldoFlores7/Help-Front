import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareditardepartamentoComponent } from './creareditardepartamento.component';

describe('CreareditardepartamentoComponent', () => {
  let component: CreareditardepartamentoComponent;
  let fixture: ComponentFixture<CreareditardepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreareditardepartamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreareditardepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
