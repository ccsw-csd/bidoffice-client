import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';
import { TechnologyListComponent } from './technology-list.component';

describe('TechnologyListComponent', () => {

    let technologyListComponent: TechnologyListComponent;
    let mockTechnologyService;
    let mockConfirmationService;
    let mockMessageService;

    let TECHNOLOGY_LIST = [
        new Technology({id:1, name: "Quantum++", priority:1}),
        new Technology({id:2, name: "Common LISP", priority:3})
    ]

    let TECHNOLOGY_LIST_DELETED = [
        new Technology({id:1, name: "Quantum++", priority:1})
    ]

    beforeEach (() => {
        mockTechnologyService = jasmine.createSpyObj(["findAll","deleteTechnology"]);
        mockConfirmationService = jasmine.createSpyObj(["confirm"]);
        mockMessageService = jasmine.createSpyObj(["add"]);
        technologyListComponent = new TechnologyListComponent(
            mockTechnologyService,
            mockConfirmationService,
            mockMessageService
            );
    });

    it('findAllShouldReturnTechnologies', () => {

        let technologyList: Technology[];

        mockTechnologyService.findAll.and.returnValue(of(technologyList));
        technologyListComponent.findAll();

        expect(technologyListComponent.technologies).toEqual(technologyList);

    });

    /**
     * Borra una tecnología de la base de datos.
     * Realiza el borrado simple de una tecnología, ya que
     * la validación de si existe o no la tecnología, se
     * realiza en backend.
     */
    it('deleteIfNotUsingTechnologyShouldDelete', () => {
        mockTechnologyService.findAll.and.returnValue(of(TECHNOLOGY_LIST_DELETED));
        mockTechnologyService.deleteTechnology.and.returnValue(of(technologyListComponent.findAll()));
        technologyListComponent.deleteTechnology(TECHNOLOGY_LIST[1]);
        expect(technologyListComponent.technologies).toEqual(TECHNOLOGY_LIST_DELETED);
    })
});
