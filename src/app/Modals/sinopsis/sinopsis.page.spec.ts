import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SinopsisPage } from './sinopsis.page';

describe('SinopsisPage', () => {
  let component: SinopsisPage;
  let fixture: ComponentFixture<SinopsisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinopsisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SinopsisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
