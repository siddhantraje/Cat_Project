import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomCatComponent } from './random-cat.component';
import { CatService } from 'src/app/services/cat.service';
import { of, throwError } from 'rxjs';

describe('RandomCatComponent', () => {
  let component: RandomCatComponent;
  let fixture: ComponentFixture<RandomCatComponent>;
  let catServiceMock: any;

  beforeEach(async(() => {

    catServiceMock = jasmine.createSpyObj('CatService', ['getRandomCat']);
    catServiceMock.getRandomCat.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [RandomCatComponent],
      providers: [
        { provide: CatService, useValue: catServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRandomCat() of CatService once on ngOnInit()', () => {
    expect(catServiceMock.getRandomCat).toHaveBeenCalledTimes(1);
  })

  it('should give an error if getRandomCat() of CatService gives an error', () => {
    let errorString = 'Error Occured';
    catServiceMock.getRandomCat.and.returnValue(throwError(errorString));
    component.changeCat();
    expect(component.errRandomCat).toBe(errorString);
  })


});