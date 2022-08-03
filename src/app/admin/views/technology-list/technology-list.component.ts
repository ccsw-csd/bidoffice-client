import { Component, OnInit } from '@angular/core';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})

export class TechnologyListComponent implements OnInit {

    technologies: Technology[];

    constructor(
        private technologyService: TechnologyService
    ) { }

    ngOnInit(): void {
        this.findAll();
    }

    /**
     * Recupera el listado de tecnologías del servicio
     * y los carga en el vector.
     */
    findAll() {
        this.technologyService.getDataTechnologies().subscribe(
            results => this.technologies = results
        );
    }
}
