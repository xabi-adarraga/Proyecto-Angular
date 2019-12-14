import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { UpLoadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  // reutilizamos la vista create component
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UpLoadService]
})
export class EditComponent implements OnInit {
  public title: string;
  // objeto que modifica el formulario
  public project: Project;
  public year: number;
  // si el envio de form ha ido bien ok 
  public status:string;
  // Archivos para subir
  public filesToUpLoad: Array<File>;
  // valor para la ruta de pincha para ver el proyecto
  public saveProject;
  public url: string;
  constructor(
    // propiedades del servicio
    private _projectService: ProjectService,
    private _uploadService: UpLoadService,
    private _route: ActivatedRoute,
    private _router: Router,

    ) {
    this.title = "Editar proyecto";
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }
  getProject(id) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(<any>error)
      }
      )
    }
    onSubmit() {
      this._projectService.updateProject(this.project).subscribe(
              response => {
                if (response.project) {
                  // Subir las imagenes
                  if(this.filesToUpLoad) {
                    this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpLoad, 'image')
                      .then((result: any) => {
                        this.saveProject = result.project;
                        this.status = 'succes';
                      });
                    }else {
                      this.saveProject = response.project;
                      this.status = 'succes';    
                  }
        
                } else {
                  this.status = 'failed';
                }
              },
              error => {
                console.log(<any>error)
              }
    );
  }
  fileChangeEvent(fileInput: any) {
    // Preparar todos los archivos que seleccionamos con target del input
    this.filesToUpLoad = <Array<File>>fileInput.target.files;
    console.log(fileInput);
  }
}
