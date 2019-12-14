import { Injectable } from '@angular/core';
import { Global } from './global';
import { sharedStylesheetJitUrl } from '@angular/compiler';

@Injectable()
export class UpLoadService {
    public url: string;

    constructor() {
        this.url = Global.url;
    }
    // permite hacer petición ajax clasica para adjuntar un archivo para subir
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
        return new Promise(function (resolve, reject) {
            // simular un formulario clasico
            var formData: any = new FormData();
            // Objeto de peticiones asincronas de js
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append(name,files[i], files[i].name);
            }
            // petición ajax
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            // petición por post
            xhr.open('POST',url,true);
            xhr.send(formData);
        });
    }
}