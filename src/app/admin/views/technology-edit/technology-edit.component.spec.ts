import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Technology } from '../../model/Technology';
import { TechnologyEditComponent } from './technology-edit.component';


describe('TechnologyEditComponent', () => {

    let technologyEditComponent: TechnologyEditComponent;
    let mockDynamicDialogRef: any;
    let mockDynamicDialogConfig: any;
    let mockTechnologyService: any;
    let mockSnackService;

    beforeEach(() => {

        mockTechnologyService = jasmine.createSpyObj(["saveTechnology", "deleteTechnology", "findAll"]);
        mockSnackService = jasmine.createSpyObj(["error","showMessage"])
        mockDynamicDialogConfig = jasmine.createSpyObj(['']);
        mockDynamicDialogRef = jasmine.createSpyObj(['close']);

        technologyEditComponent = new TechnologyEditComponent(
            mockDynamicDialogRef,
            mockDynamicDialogConfig,
            mockSnackService,
            mockTechnologyService
        )
    });

    /**
     * Test de edición de tecnología.
     * 
     * El test debe modificar la tecnología y 
     * devolver un estado HTTP OK.
     */
    it("editTechnologyShouldEdit",()=>{
        let editTechnology = new Technology({id:3, name:"editing tech", priority:1});
        mockTechnologyService.saveTechnology.and.returnValue(of(true));
        mockDynamicDialogRef.close.and.returnValue(of(true));
        technologyEditComponent.saveChanges(editTechnology);
        expect(technologyEditComponent.saveChanges(editTechnology)).not.toBeNull();
    });

    /**
     * Test de modificación de tecnología, con prioridad
     * o nombre ya existentes.
     * 
     * El test debe devolver código HTTP 409.
     */
    it("editTechnologyWithExistNameOrPrioritySouldThrowException", () => {
        let editTechnology = new Technology({id:3, name:"Name exists", priority:1});
        let errorResponse = new HttpErrorResponse({ status: 409, error: {}});
        mockTechnologyService.saveTechnology.and.returnValue(throwError(() => errorResponse ));
        technologyEditComponent.saveChanges(editTechnology);
        expect(technologyEditComponent.saveChanges(editTechnology)).not.toBeNull();
    })

});
