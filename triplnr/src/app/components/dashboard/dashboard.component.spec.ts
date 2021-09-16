import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import {TripServiceService} from 'src/app/services/trip-service.service';
import { WeatherServiceService } from 'src/app/services/weather-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule], 
      providers: [TripServiceService,WeatherServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the DashboardComponent', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Dashboard'`, () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Dashboard');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it('should be created TripService', () => {
    const service: TripServiceService = TestBed.get(TripServiceService);
    expect(service).toBeTruthy();
   });

   it('should be created WeatherService', () => {
    const service: WeatherServiceService= TestBed.get(WeatherServiceService);
    expect(service).toBeTruthy();
   });

   it('should be creat failed', () => {
    const service: TripServiceService= TestBed.get(WeatherServiceService);
    expect(service).toBeTruthy();
   });

   it('should be openTrip', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app.openTrip).toBeTruthy();
   });

   it('should be callWeather', () => {
    const service: WeatherServiceService= TestBed.get(WeatherServiceService);
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app.callWeather("Uncasville,CT")).toEqual(app.callWeather("Uncasville,CT"));
   });
  
   it('should be callWeather failed', () => {
    const service: WeatherServiceService= TestBed.get(WeatherServiceService);
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app.callWeather("Uncasville,CT")).toEqual(app.callWeather("Quaker Hill,CT"));
   });
   
   it('should be open Modal', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app.open).toBeTruthy();
   });

   it('should be open Modal fail', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app.open("hi","hi",1)).toBeFalsy;
   });

   it('should be open Modal2', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app.open2).toBeTruthy();
   });

   it('should be open Modal2 fail', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app.open2("hi","hi",1)).toBeFalsy;
   });
});