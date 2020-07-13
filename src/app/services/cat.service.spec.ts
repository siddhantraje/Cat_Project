import { TestBed, getTestBed } from '@angular/core/testing'; // Added getTestBed
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // added both the exports
// HttpClientTestingModule is imported to mock HttpClientModule
// because we are not going to make actual http request while testing
// HttpTestingController allows mocking and flushing of requests
// httpMock.verify() is called after each test to check that there are no outstanding calls
import { CatService } from './cat.service';
import { RANDOM_CAT } from '../shared/randomCat';
import { CATEGORIES } from '../shared/categories';


describe('CatService', () => {


  let injector: TestBed; // declared the above injector, service, httpMock
  let service: CatService;
  let httpMock: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      //adding imports, providers, declarations just like ngModule
      imports: [HttpClientTestingModule]
        });

    //Initalising the injector, service, httpMock
    injector = getTestBed();
    service = injector.get(CatService);
    httpMock = injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    const service: CatService = TestBed.get(CatService);
    expect(service).toBeTruthy();
  });

  it('should get a Random cat', () => {
    service.getRandomCat().subscribe(cat => {
      expect(typeof(cat)).toBe(typeof(RANDOM_CAT))
    })

    const req = httpMock.expectOne(service.randomCatUrl);
    expect(req.request.method).toBe('GET');
  });

  it('should get all categories', () => {
    service.getCategories().subscribe(categoriesArray => {
      expect(categoriesArray.length).toEqual(CATEGORIES.length);
    })

    const req = httpMock.expectOne(service.categoriesUrl);
    expect(req.request.method).toBe('GET');
  })

});


