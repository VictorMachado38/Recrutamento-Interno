import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasListCandidateApplyComponent } from './vagas-list-candidate-apply.component';

describe('VagasListCandidateApplyComponent', () => {
  let component: VagasListCandidateApplyComponent;
  let fixture: ComponentFixture<VagasListCandidateApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VagasListCandidateApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VagasListCandidateApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
