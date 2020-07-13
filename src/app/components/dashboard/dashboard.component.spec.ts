import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';

import { CatService } from '../../services/cat.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RandomCatComponent } from '../random-cat/random-cat.component';
import { CategoriesComponent } from '../categories/categories.component';
import { Component } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let catServiceMock: any;

  beforeEach(async(() => {

    catServiceMock = jasmine.createSpyObj('CatService', ['getRandomCat', 'getCategories']);
    catServiceMock.getRandomCat.and.returnValue(of());
    catServiceMock.getCategories.and.returnValue(of([]));


    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'images/:id', component: DummyComponent }
        ])
      ],
      declarations: [DashboardComponent, RandomCatComponent, CategoriesComponent, DummyComponent],
      providers: [
        { provide: CatService, useValue: catServiceMock }
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render random cat Component', () => {
    let randomCatElement = fixture.debugElement.query(By.css('app-random-cat')).nativeElement;
    expect(randomCatElement).toBeTruthy();
  })

  it('should render categories Component', () => {
    let categoriesElement = fixture.debugElement.query(By.css('app-categories')).nativeElement;
    expect(categoriesElement).toBeTruthy();
  })

});

@Component({
  template: ''
}) class DummyComponent { }