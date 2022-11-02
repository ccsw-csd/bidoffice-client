import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormatDocument } from '../../model/FormatDocument';

import { FormatDocumentListComponent } from './format-document-list.component';

describe('FormatDocumentListComponent', () => {
  let component: FormatDocumentListComponent;
  let mockFormatDocumentService, mockDynamicDialogRef, mockDialogService, mockSnackService;
  let FORMAT_DOCUMENT_ITEMS = [];
  let FORMAT_DOCUMENT_DELETED = [];

  beforeEach(() => {

    FORMAT_DOCUMENT_ITEMS =  [
      new FormatDocument({id:1, name:"pdf", priority: 1}),
      new FormatDocument({id:2, name:"docx", priority: 2})
    ]
    FORMAT_DOCUMENT_DELETED = [ new FormatDocument({id:2, name:"Name2", priority: 2}) ]

    mockFormatDocumentService = jasmine.createSpyObj(["getAllFormatDocument, deleteFormatDocument"]);

    mockDialogService = jasmine.createSpyObj([""])
    mockSnackService = jasmine.createSpyObj(["error", "showMessage"])
    component = new FormatDocumentListComponent(mockFormatDocumentService, mockDialogService, mockSnackService)

  });

  it('getAllShouldReturnList', () => {
    mockFormatDocumentService.getAllFormatDocument.and.returnValue(of(FORMAT_DOCUMENT_ITEMS))
    component.getAllFormatDocument();
    expect(component.formatDocuments).not.toBeNull()
    expect(component.formatDocuments).toEqual(FORMAT_DOCUMENT_ITEMS)
  });

  it('deleteShouldDelete', () => {
    mockFormatDocumentService.getAllFormatDocument.and.returnValue(of(FORMAT_DOCUMENT_DELETED))
    mockFormatDocumentService.deleteFormatDocument.and.returnValue(of(component.getAllFormatDocument()))
    component.deleteItem(FORMAT_DOCUMENT_ITEMS[1])
    expect(component.formatDocuments).not.toBeNull()
    expect(component.formatDocuments).toEqual(FORMAT_DOCUMENT_DELETED)
  });
});
