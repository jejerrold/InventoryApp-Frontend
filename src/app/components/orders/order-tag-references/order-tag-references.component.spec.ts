import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTagReferencesComponent } from './order-tag-references.component';

describe('OrderTagReferencesComponent', () => {
  let component: OrderTagReferencesComponent;
  let fixture: ComponentFixture<OrderTagReferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTagReferencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderTagReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
