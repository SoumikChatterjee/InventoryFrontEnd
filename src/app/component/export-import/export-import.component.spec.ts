import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportImportComponent } from './export-import.component';

describe('ExportImportComponent', () => {
  let component: ExportImportComponent;
  let fixture: ComponentFixture<ExportImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportImportComponent]
    });
    fixture = TestBed.createComponent(ExportImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
