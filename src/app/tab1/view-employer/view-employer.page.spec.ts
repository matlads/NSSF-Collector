import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewEmployerPage } from './view-employer.page';

describe('ViewEmployerPage', () => {
  let component: ViewEmployerPage;
  let fixture: ComponentFixture<ViewEmployerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmployerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEmployerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
