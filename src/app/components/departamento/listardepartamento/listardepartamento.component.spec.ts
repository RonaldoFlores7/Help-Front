import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListardepartamentoComponent } from './listardepartamento.component';

describe('ListardepartamentoComponent', () => {
  let component: ListardepartamentoComponent;
  let fixture: ComponentFixture<ListardepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListardepartamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListardepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
