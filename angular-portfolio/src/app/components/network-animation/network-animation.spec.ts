import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAnimationComponent } from './network-animation';

describe('NetworkAnimationComponent', () => {
  let component: NetworkAnimationComponent;
  let fixture: ComponentFixture<NetworkAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 