import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePhotoComponent } from './edit-profile-photo.component';

describe('EditProfilePhotoComponent', () => {
  let component: EditProfilePhotoComponent;
  let fixture: ComponentFixture<EditProfilePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
