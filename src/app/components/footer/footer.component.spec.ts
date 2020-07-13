import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set current Date and time after every call of setInterval', () => {
    spyOn(window, 'setInterval');
    component.ngOnInit();
    var start = new Date().getTime();
    for (; ;) {
      if ((new Date().getTime() - start) > 1000) {
        break;
      }
    }
    expect(window.setInterval).toHaveBeenCalledTimes(1);

  })

});
