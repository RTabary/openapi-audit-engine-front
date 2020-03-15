import { TestBed } from '@angular/core/testing';

import { ApiDefinitionAuditService } from './api-definition-audit.service';

describe('ApiDefinitionAuditService', () => {
  let service: ApiDefinitionAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDefinitionAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
