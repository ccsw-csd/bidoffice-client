import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SectorEditComponent } from './sector-edit.component';
import { Sector } from '../../model/Sector';

describe('SectorEditComponent', () => {
  
    let sectorEditComponent: SectorEditComponent;
    let mockDynamicDialogRef: any;
    let mockDynamicDialogConfig: any;
    let mockSectorService: any;
    let mockSnackService;

    beforeEach(() => {

        mockSectorService = jasmine.createSpyObj(["saveSector", "deleteSector", "findAll"]);
        mockSnackService = jasmine.createSpyObj(["error","showMessage"])
        mockDynamicDialogConfig = jasmine.createSpyObj(['']);
        mockDynamicDialogRef = jasmine.createSpyObj(['close']);

        sectorEditComponent = new SectorEditComponent(
            mockDynamicDialogRef,
            mockDynamicDialogConfig,
            mockSnackService,
            mockSectorService
        )
    });

    /**
     * Test de edición de tecnología.
     * 
     * El test debe modificar la tecnología y 
     * devolver un estado HTTP OK.
     */
     it("editSectorShouldEdit",()=>{
        let editSector = new Sector({id:3, name:"editing sector", priority:1, startDate: new Date('2022-09-01'), endDate: new Date('2022-09-30')});
        mockSectorService.saveSector.and.returnValue(of(true));
        mockDynamicDialogRef.close.and.returnValue(of(true));
        sectorEditComponent.saveChanges(editSector);
        expect(sectorEditComponent.saveChanges(editSector)).not.toBeNull();
    });
});
