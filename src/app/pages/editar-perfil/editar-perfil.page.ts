import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Router} from "@angular/router"
import { Usuario } from 'src/app/interfaces/usuario';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  private id_sesion = this.authService.sessionId
  perfil: Usuario;

  editPerfilForm: FormGroup;

  constructor(
    private dataService: DataService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.editPerfilForm = this.formBuilder.group({
      nombre: '',
      apellido: '',
      celular: '',
      carrera: '',
      email: '',
      push_id: ''
    }); 

    this.dataService.getUsuarioById(this.id_sesion).subscribe(
      result => {
        this.perfil = result.data();
        this.editPerfilForm.get('nombre').setValue(this.perfil.nombre);
        this.editPerfilForm.get('apellido').setValue(this.perfil.apellido);
        this.editPerfilForm.get('celular').setValue(this.perfil.celular);
        this.editPerfilForm.get('carrera').setValue(this.perfil.carrera);
        this.editPerfilForm.get('email').setValue(this.perfil.email);
        this.editPerfilForm.get('push_id').setValue(this.perfil.push_id);
        console.log('perfil: ', this.perfil);
      }
    )
  }

  editPerfil(){
    const formData = this.editPerfilForm.value;
    this.dataService.update('usuarios', this.id_sesion, formData);
    this.router.navigateByUrl('/mi-perfil');
    console.log('perfilEditado', formData);
  }
}
