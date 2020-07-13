import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesComponent } from './images.component';
import { CatService } from 'src/app/services/cat.service';
import { throwError, Subscription} from 'rxjs';
import { of } from 'rxjs';
import { Cat } from 'src/app/models/cat.model';
import { ActivatedRoute} from '@angular/router';
import { By } from '@angular/platform-browser';
import { CATS_BY_CATEGORY } from 'src/app/shared/catsByCategories';


describe('ImagesComponent', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;

  let catServiceMock: any;

  beforeEach(async(() => {   
    catServiceMock = jasmine.createSpyObj('CatService', ['getCatsUsingCategory']);
    catServiceMock.getCatsUsingCategory.and.returnValue(of(CATS_BY_CATEGORY));

    TestBed.configureTestingModule({
      declarations: [ ImagesComponent ],
      providers: [
        {provide: CatService, useValue: catServiceMock},
        {provide: ActivatedRoute, useValue: 
          {params:
            {
              pipe: () => {
                      return of([])
                          }
            }                                            
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to the fetched cat during scrolling if showMore is true', () => {
    catServiceMock.getCatsUsingCategory.and.returnValue(of(new Cat()));
    component.catsByCategory = CATS_BY_CATEGORY;
      component.showMore = true;
      component.catsByCategory = [];
      component.fetchCatsUsingCategoryOnScroll();
      expect(component.catsByCategory.length).toBe(1);
  })

  it('should not subscribe to the fetched cats during scrolling if showMore is false', () => {
   component.cacheSub = new Subscription();
    catServiceMock.getCatsUsingCategory.and.returnValue(of(new Cat()));
    component.catsByCategory = CATS_BY_CATEGORY;
      component.showMore = false;
      component.catsByCategory = [];
      component.fetchCatsUsingCategoryOnScroll();
      expect(component.catsByCategory.length).toBe(0);
  })


  it('should call stopLoadingMoreImages() when clicked on "Stop Loading" button, and make the "Show More" value false', () => {
    spyOn(component, "stopLoadingMoreImages")
    component.catsByCategory = CATS_BY_CATEGORY;
    component.showMore = true;
    fixture.detectChanges()
    let buttonElement: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    expect(component.stopLoadingMoreImages).toHaveBeenCalledTimes(1);    
  })

  it('should change value of showMore from true to false', () => {
    component.stopLoadingMoreImages();
    expect(component.showMore).toBeFalsy();
  })

  it('should give an error if getCatsUsingCategory() of CatService gives an error while scrolling', () => {
    let errorString = 'Error Occured';
    catServiceMock.getCatsUsingCategory.and.returnValue(throwError(errorString));
    component.fetchCatsUsingCategoryOnScroll();
    expect(component.errCatsByCategory).toBe(errorString);
  })

  it('should call fetchCatsUsingCategoryOnScroll() on Scroll', () => {
    spyOn(component, 'fetchCatsUsingCategoryOnScroll')
    component.showMoreImages();
    window.dispatchEvent(new Event('scroll'));  
    expect(component.fetchCatsUsingCategoryOnScroll).toHaveBeenCalledTimes(7);
  }) 

  it('should not call fetchCatsUsingCategoryOnScroll() on Scroll if showMore is false', () => {
    spyOn(component, 'fetchCatsUsingCategoryOnScroll')
    component.showMoreImages();
    component.showMore = false;
    window.dispatchEvent(new Event('scroll'));  
    expect(component.fetchCatsUsingCategoryOnScroll).toHaveBeenCalledTimes(6);
  }) 
  
});
