import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaComponent } from './para.component';

describe('ParaComponent', () => {
  let component: ParaComponent;
  let fixture: ComponentFixture<ParaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
