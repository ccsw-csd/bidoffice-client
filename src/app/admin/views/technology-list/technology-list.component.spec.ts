import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';
import { TechnologyListComponent } from './technology-list.component';

describe('TechnologyListComponent', () => {

    let technologyListComponent: TechnologyListComponent;
    let mockTechnologyService;

    beforeEach (() => {
        mockTechnologyService = jasmine.createSpyObj(["findAll"]);
        technologyListComponent = new TechnologyListComponent(mockTechnologyService);
    });

    it('findAllShouldReturnTechnologies', () => {

        let technologyList: Technology[];

        mockTechnologyService.findAll.and.returnValue(of(technologyList));
        technologyListComponent.findAll();

        expect(technologyListComponent.technologies).toEqual(technologyList);

    });
});
