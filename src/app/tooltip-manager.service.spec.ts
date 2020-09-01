import { TestBed } from '@angular/core/testing';

import { TooltipManagerService } from './tooltip-manager.service';

describe('TooltipManagerService', () => {
  let service: TooltipManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TooltipManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
