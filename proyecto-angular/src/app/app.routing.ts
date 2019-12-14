import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

// define las rutas
const appRoutes: Routes = [
    //deine cada ruta
    // la primera es la home
    { path: '', component: AboutComponent },
    { path: 'sobre-mi', component: AboutComponent },
    { path: 'proyectos', component: ProjectsComponent },
    { path: 'crear-proyecto', component: CreateComponent },
    { path: 'contacto', component: ContactComponent },
    { path: 'proyecto/:id', component: DetailComponent },
    { path: 'editar-proyecto/:id', component: EditComponent },
    // ruta 404 cuando no cargue carga about
    { path: '**', component:ErrorComponent }
];

// exportamos la configuración de las rutas
export const appRoutingProviders: any[] = [];
// exportamos el routing, llama al RouterModule y forRoot carga la configuración de rutas en el router de Angular
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
