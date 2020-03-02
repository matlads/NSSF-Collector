import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEmployerPage } from './add-employer.page';

describe('AddEmployerPage', () => {
  let component: AddEmployerPage;
  let fixture: ComponentFixture<AddEmployerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
