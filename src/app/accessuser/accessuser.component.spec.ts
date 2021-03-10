import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessuserComponent } from './accessuser.component';

describe('AccessuserComponent', () => {
  let component: AccessuserComponent;
  let fixture: ComponentFixture<AccessuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
