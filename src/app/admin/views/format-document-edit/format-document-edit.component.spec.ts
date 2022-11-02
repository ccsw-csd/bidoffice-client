import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormatDocument } from '../../model/FormatDocument';

import { FormatDocumentEditComponent } from './format-document-edit.component';

describe('FormatDocumentEditComponent', () => {
  let component: FormatDocumentEditComponent;
  let mockFormatDocumentService;

  beforeEach(() => {

    let mockEmpty = jasmine.createSpyObj([""]);
    mockFormatDocumentService = jasmine.createSpyObj(["saveFormatDocument"]);
    component = new FormatDocumentEditComponent(mockFormatDocumentService, mockEmpty, mockEmpty, mockEmpty, mockEmpty)
  });

  it('editIfArgumentsAreCorrect', () =>{
    let element = new FormatDocument({id:1,name:"txt",priority:40})
    mockFormatDocumentService.saveFormatDocument.and.returnValue(of(element))
    component.formatDocument = element
    component.onSave();
    expect(component.formatDocument).not.toBeNull()
  });
});
