import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDefinitionAuditComponent } from './api-definition-audit.component';

describe('ApiDefinitionAuditComponent', () => {
  let component: ApiDefinitionAuditComponent;
  let fixture: ComponentFixture<ApiDefinitionAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiDefinitionAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDefinitionAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
