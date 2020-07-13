import { TestBed, getTestBed } from '@angular/core/testing';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProcessHTTPMsgService', () => {

  let injector: TestBed;
  let service: ProcessHTTPMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    injector = getTestBed();
    service = injector.get(ProcessHTTPMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return error message if statusText is not null', () => {
    let errMsg: any;
    let error: HttpErrorResponse = {
      status: 500,
      name: "HttpErrorResponse",
      headers: null,
      ok: false,
      url: '',
      type: null,
      message: 'Something went wrong',
      statusText: 'Something Went Wrong',
      error: ''
    };
    service.handleError(error).subscribe(null, err => {
      errMsg = err;
    });

    expect(errMsg).toBe('500 - Something Went Wrong ');
  })

  it('should return error message if statustext is null', () => {
    let errMsg: any;
    let error: HttpErrorResponse = {
      status: 500,
      name: "HttpErrorResponse",
      headers: null,
      ok: false,
      url: '',
      type: null,
      message: 'Something went wrong',
      statusText: null,
      error: ''
    };
    service.handleError(error).subscribe(null, err => {
      errMsg = err;
    });

    expect(errMsg).toBe('500 -  ');
  })

  it('should return error message if error is an instance of ErrorEvent', () => {
    let errMsg: any;
    let error: HttpErrorResponse = {
      status: 500,
      name: "HttpErrorResponse",
      headers: null,
      ok: false,
      url: '',
      type: null,
      message: 'Something went wrong',
      statusText: null,
      error: new ErrorEvent('')
    };
    service.handleError(error).subscribe(null, err => {
      errMsg = err;
    });
    expect(errMsg).toBe('');
  })


});
