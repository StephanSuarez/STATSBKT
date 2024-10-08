import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LideresComponent } from './lideres.component';

describe('LideresComponent', () => {
  let component: LideresComponent;
  let fixture: ComponentFixture<LideresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LideresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LideresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
