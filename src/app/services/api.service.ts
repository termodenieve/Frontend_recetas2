import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  url = environment.backend;

  //usuario
  login(user: string, pass: string) {
    return this.http.post(this.url + '/login', {
      username: user,
      password: pass,
    });
  }
  register(username: string, email: string, password: string, name: string) {
    return this.http.post(this.url + '/users', {
      username: username,
      password: password,
      name: name,
      email: email,
    });
  }
  obtenerUserPorId(iduser: string) {
    return this.http.get(this.url + '/users/' + iduser);
  }
  
  actualizarUser(name: string, username: string, email: string, password: string, iduser: string) {
    console.log('ID del usuario enviado:', iduser);
    return this.http.put(this.url + '/users/' + iduser, {
      name: name,
      username: username,
      email: email,
      password: password,
    });
  }
  

  obtenerUsuarioPorId(iduser: string) {
    return this.http.get(this.url + '/users/' + iduser);
  }
  
  
  borrarUser(iduser: number) {
    return this.http.delete(this.url + '/users/' + iduser);
  }

  getUser(iduser: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}/users/${iduser}`, { headers });
  }
  
  
  //recetas
  crearReceta(titulo: string, descripcion: string, ingredientes: string, instrucciones: string, tiempo_coccion: string,
    imagen: string,
    id_categoria: string,
    id_user: string,
    token: string
  ) {
    const headers = new HttpHeaders().set('Authorization', token);
    const body = {
      titulo : titulo,
      descripcion : descripcion,
      ingredientes : ingredientes,
      instrucciones : instrucciones,
      tiempo_coccion: tiempo_coccion,
      imagen : imagen,
      id_categoria: id_categoria,
      id_user: id_user
    };
    console.log(body)
    return this.http.post(this.url + '/recetas', body, { headers });
  }
  actualizarReceta(
    titulo: string,
    descripcion: string,
    ingredientes: string,
    instrucciones: string,
    tiempo_coccion: string,
    imagen: string,
    id_categoria: string,
    token: string){
      const headers = new HttpHeaders().set('Authorization', token);
      const body = {
        titulo: titulo,
        descripcion: descripcion,
        ingredientes: ingredientes,
        instrucciones: instrucciones,
        tiempo_coccion: tiempo_coccion,
        imagen: imagen,
        id_categoria: id_categoria
      };
    return this.http.put(this.url + '/recetas', body, {headers});
  }

  borrarReceta(idreceta: number) {
    return this.http.delete(this.url + '/recetas/' + idreceta);
  }
  getReceta(id_user: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('id_user', id_user);
    return this.http.get(`${this.url}/recetas`, { headers, params });
  }
  


  //categorias
  crearCategoria(nombre: string, descripcion: string, id_user: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', token);
    const body = {
      nombre: nombre,
      descripcion: descripcion,
      id_user: id_user
    };
    return this.http.post(this.url + '/categorias', body, { headers });
  }
  
  actualizarCate(nombre: string, descripcion: string, id_categoria: string) {
    return this.http.put(this.url + '/categorias', {
      nombre: nombre,
      descripcion: descripcion,
      id_categoria: id_categoria
    });
  }
  

  borrarCate(id_categoria: number) {
    return this.http.delete(this.url + '/categorias/' + id_categoria);
    
  }
  getCate(idUser: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.url}/categorias?id_user=${idUser}`, { headers });
  }
  
  
  getRecetaById(idReceta: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.url}/recetas/${idReceta}`, { headers });
  }

  getCategorias(id_user: number): Observable<any> {
    return this.http.get(`${this.url}categorias/names?id_user=${id_user}`);
  }
  

}
