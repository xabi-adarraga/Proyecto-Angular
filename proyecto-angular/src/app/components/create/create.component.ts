import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { UpLoadService } from '../../services/upload.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UpLoadService]
})

export class CreateComponent implements OnInit {
  public title: string;
  // objeto que modifica el formulario
  public project: Project;
  public year: number;
  // si el envio de form ha ido bien ok 
  public status: string;
  // Archivos para subir
  public filesToUpLoad: Array<File>;
  // valor para la ruta de pincha para ver el proyecto
  public saveProject;
  constructor(
    // propiedades del servicio
    private _projectService: ProjectService,
    private _uploadService: UpLoadService
  ) {
    this.title = "Crear proyecto";
    this.year = Global.year;
    this.project = new Project('', '', '', '', this.year, '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    // Guardar datos básicos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
          // Subir las imagenes
          if (this.filesToUpLoad) {
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpLoad, 'image')
              .then((result: any) => {
                this.saveProject = result.project;
                this.status = 'succes';
                form.reset();
              });
          } else {
            this.saveProject = response.project;
            this.status = 'succes';
            form.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    // Preparar todos los archivos que seleccionamos con target del input
    this.filesToUpLoad = <Array<File>>fileInput.target.files;
    console.log(fileInput);
  }
}
