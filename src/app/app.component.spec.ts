import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatService } from './services/cat.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        {provide: CatService}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const header = fixture.debugElement.query(By.css('app-header')).nativeElement;
    expect(header).toBeTruthy();
  });

  it('should render footer component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const footer = fixture.debugElement.query(By.css('app-footer')).nativeElement;
    expect(footer).toBeTruthy();
  });
});
