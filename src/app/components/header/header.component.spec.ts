import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { CatService } from 'src/app/services/cat.service';
import { of, throwError } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let catServiceMock: any;

  beforeEach(async(() => {

    catServiceMock = jasmine.createSpyObj('CatService', ['getCategories']);
    catServiceMock.getCategories.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [HeaderComponent,
        DummyComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: 'dashboard', component: DummyComponent } //DummyComponent is created only to avoid the more dependecies, we could have added dashboard component, but it will need to add the dependencies too.
          ]
        )
      ],
      providers: [
        { provide: CatService, useValue: catServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called getCategories() of CatService', () => {
    expect(catServiceMock.getCategories).toHaveBeenCalled();
  })

  it('should give error if getCategories() of CatService return error', () => {
    let errorString = 'Error Occured';
    catServiceMock.getCategories.and.returnValue(throwError(errorString));
    component.fetchAllCategories();
    expect(component.errCategories).toBe(errorString);
  })
});

@Component({
  template: ''
}) class DummyComponent { }
