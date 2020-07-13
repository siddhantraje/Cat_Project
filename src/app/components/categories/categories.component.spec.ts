import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { CatService } from 'src/app/services/cat.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { CATEGORIES } from 'src/app/shared/categories';
import { CATS_BY_CATEGORY } from 'src/app/shared/catsByCategories';
import { ProcessHTTPMsgService } from 'src/app/services/process-httpmsg.service';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let catServiceMock: any;

  beforeEach(async(() => {

    catServiceMock = jasmine.createSpyObj('CatService', ['getCategories', 'getCatsUsingCategory']);
    catServiceMock.getCategories.and.returnValue(of(CATEGORIES));
    catServiceMock.getCatsUsingCategory.and.returnValue(of(CATS_BY_CATEGORY));

      TestBed.configureTestingModule({
      declarations: [CategoriesComponent, DummyComponent],
      providers: [
        { provide: CatService, useValue: catServiceMock },
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'images/:id', component: DummyComponent }
        ])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should be at '' before clicking any image", () => {
    const location = TestBed.get(Location);
    expect(location.path()).toBe('');
  })

  it('should navigate to the /images/ after clicking the image', () => {
    const location = TestBed.get(Location);
    let buttonElements = fixture.debugElement.queryAll(By.css('button'));
    let firstButtonElement: HTMLButtonElement = buttonElements[0].nativeElement;
    firstButtonElement.click();
    fixture.whenStable().finally(() => {
      expect(location.path()).toContain('/images/');
    });
  })

  it('should call getCategories() of CatService once on ngOnInit()', () => {
    expect(catServiceMock.getCategories).toHaveBeenCalledTimes(1);
  });

  it('should call getCatsUsingCategory() of CatService once on ngOnInit()', () => {
    let buttonElements = fixture.debugElement.queryAll(By.css('button'));
    let firstButtonElement: HTMLButtonElement = buttonElements[0].nativeElement;
    firstButtonElement.click();
    expect(catServiceMock.getCatsUsingCategory).toHaveBeenCalled();
  })

  it('should return error if getCategories() return an error', () => {
    let errorString = 'Error Occured';
    catServiceMock.getCategories.and.returnValue(throwError(errorString));
    component.ngOnInit();
    expect(component.errCategories).toBe(errorString);
  })

  it('should return error if getCatOfEachCategory() return an error', () => {
    let errorString = 'Error Occured';
    catServiceMock.getCatsUsingCategory.and.returnValue(throwError(errorString));
    component.ngOnInit();
    expect(component.errCatOfEachCategory).toBe(errorString);
  })

  it('should change the css properties of the elements on scroll less than 100', () => {
    let spyElement = fixture.debugElement.query(By.css('#showOnScroll')).nativeElement;
    window.scrollTo(0,0);
    window.dispatchEvent(new Event('scroll'));
    expect(spyElement.style.opacity).toBe('0');  
  })

  it('should change the css properties of the elements on scroll more than 100', () => {
    let spyElement = fixture.debugElement.query(By.css('#showOnScroll')).nativeElement;
    window.scrollTo(0,0);
    window.scrollBy(0,101);
    window.dispatchEvent(new Event('scroll'));
    expect(spyElement.style.opacity).toBe('0.252');  
  })

  it('should change the css properties of the elements on scroll more than 400', () => {
    let spyElement = fixture.debugElement.query(By.css('#categoriesTextH1')).nativeElement;
    window.scrollTo(0,0);
    window.scrollBy(0,401);
    window.dispatchEvent(new Event('scroll'));
    expect(spyElement.style.transform).toBe('translateX(0vw)');  
  })

  it('should change the css properties of the elements on scroll more than 600', () => {
    let spyElement = fixture.debugElement.query(By.css('#categoriesTextP')).nativeElement;
    window.scrollTo(0,0);
    window.scrollBy(0,601);
    window.dispatchEvent(new Event('scroll'));
    expect(spyElement.style.transform).toBe('translateY(0vh)');  
  })
});

@Component({
  template: ''
}) class DummyComponent { }
