import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapituloPage } from './capitulo.page';

describe('CapituloPage', () => {
  let component: CapituloPage;
  let fixture: ComponentFixture<CapituloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapituloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapituloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
