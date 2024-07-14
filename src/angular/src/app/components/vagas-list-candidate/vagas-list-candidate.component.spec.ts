import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasListCandidateComponent } from './vagas-list-candidate.component';

describe('VagasListCandidateComponent', () => {
  let component: VagasListCandidateComponent;
  let fixture: ComponentFixture<VagasListCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VagasListCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VagasListCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
