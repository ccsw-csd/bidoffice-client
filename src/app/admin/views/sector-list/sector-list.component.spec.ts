import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Sector } from '../../model/Sector';
import { SectorService } from '../../services/sector.service';
import { SectorListComponent } from './sector-list.component';


describe('SectorListComponent', () => {
  
    let sectorListComponent: SectorListComponent;
    let mockSectorService;
    let mockSnackBarService;

    let SECTOR_LIST = [
        new Sector({id:1, name: "Insurance", priority:1}),
        new Sector({id:2, name: "Automotive", priority:3})
    ]

    let SECTOR_LIST_DELETED = [
        new Sector({id:1, name: "Insurance", priority:1})
    ]


    beforeEach(() => {
        mockSectorService = jasmine.createSpyObj(["findAll", "deleteSector"]);
        mockSnackBarService = jasmine.createSpyObj(["showMessage"]);
        sectorListComponent = new SectorListComponent (
            mockSectorService,
            mockSnackBarService
        );
        
    });

    /**
     * Recupera todos los sectores de la base de datos.
     */
    it('findAllShouldReturnSectors', () => {

        let sectorList: Sector[];

        mockSectorService.findAll.and.returnValue(of(sectorList));
        sectorListComponent.findAll();

        expect(sectorListComponent.sectors).toEqual(sectorList);

    });

    /**
     * Borra un sector de la base de datos.
     * Realiza el borrado simple de una tecnología, ya que
     * la validación de si existe o no la tecnología, se
     * realiza en backend.
     */
    it('deleteIfNotUsingTechnologyShouldDelete', () => {
        mockSectorService.findAll.and.returnValue(of(SECTOR_LIST_DELETED));
        mockSectorService.deleteSector.and.returnValue(of(sectorListComponent.findAll()));
        sectorListComponent.deleteSector(SECTOR_LIST[1]);
        expect(sectorListComponent.sectors).toEqual(SECTOR_LIST_DELETED);
    })

});
