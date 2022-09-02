import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Sector } from '../../model/Sector';
import { SectorService } from '../../services/sector.service';
import { SectorListComponent } from './sector-list.component';


describe('SectorListComponent', () => {
  
    let sectorListComponent: SectorListComponent;
    let mockSectorService;

     beforeEach(() => {
        mockSectorService = jasmine.createSpyObj(["findAll"]);
        sectorListComponent = new SectorListComponent (
            mockSectorService
        );
        
    });

    it('findAllShouldReturnSectors', () => {

        let sectorList: Sector[];

        mockSectorService.findAll.and.returnValue(of(sectorList));
        sectorListComponent.findAll();

        expect(sectorListComponent.sectors).toEqual(sectorList);

    });
});
