import { of, throwError } from 'rxjs';
import { Technology } from '../../model/Technology';
import { TechnologyEditComponent } from './technology-edit.component';

describe('TechnologyEditComponent', () => {

    let technologyEditComponent: TechnologyEditComponent;
    let mockDynamicDialogRef: any;
    let mockDynamicDialogConfig: any;
    let mockTechnologyService: any;
    let mockMessageService: any;

    beforeEach(() => {

        mockTechnologyService = jasmine.createSpyObj(['saveTechnology']);
        mockMessageService = jasmine.createSpyObj(["add"]);
        mockDynamicDialogConfig = jasmine.createSpyObj(['']);
        mockDynamicDialogRef = jasmine.createSpyObj(['close']);

        technologyEditComponent = new TechnologyEditComponent(
            mockDynamicDialogRef,
            mockDynamicDialogConfig,
            mockTechnologyService,
            mockMessageService
        );
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
        technologyEditComponent.saveChanges(editTechnology);
        expect(technologyEditComponent.saveChanges(editTechnology)).not.toBeNull;
    });
});
