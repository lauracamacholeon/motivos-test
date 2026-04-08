import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  ApiResponse,
  CatalogRequest,
  DropdownOption,
  Motivo,
  MotivoRequest,
} from '../models/motivo.model';

@Injectable({ providedIn: 'root' })
export class MotivosService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // ── List ─────────────────────────────────────────────────────────────
  getMotivos(): Observable<ApiResponse<Motivo[]>> {
    const body: MotivoRequest = {
      que: 4,
      tope: '999',
      cmd: '',
      codigo: '0',
      tipo: '',
      descripcion: '',
      tipo_motivo: '',
      iIdioma: 0,
    };

    return this.http.post<ApiResponse<Motivo[]>>(
      `${this.base}/Motivos/MotivosList`,
      body
    );
  }

  // ── Create ───────────────────────────────────────────────────────────
  createMotivo(m: Motivo): Observable<ApiResponse<boolean>> {
    const body: MotivoRequest = {
      que: 1,
      tope: '100',
      cmd: '',
      codigo: m.motivo,
      tipo: m.tipo,
      descripcion: m.descripcion,
      tipo_motivo: m.tipo_motivo,
      iIdioma: 0,
    };

    return this.http.post<ApiResponse<boolean>>(
      `${this.base}/Motivos/MotivosAdd`,
      body
    );
  }

  // ── Update ───────────────────────────────────────────────────────────
  updateMotivo(m: Motivo): Observable<ApiResponse<boolean>> {
    const body: MotivoRequest = {
      que: 2,
      tope: '',
      cmd: '',
      codigo: m.motivo,
      tipo: m.tipo,
      descripcion: m.descripcion,
      tipo_motivo: m.tipo_motivo,
      iIdioma: 0,
    };

    return this.http.post<ApiResponse<boolean>>(
      `${this.base}/Motivos/MotivosUpd`,
      body
    );
  }

  // ── Delete ───────────────────────────────────────────────────────────
  deleteMotivo(codigo: string): Observable<ApiResponse<boolean>> {
    const body: MotivoRequest = {
      que: 3,
      tope: '',
      cmd: '',
      codigo,
      tipo: '',
      descripcion: '',
      tipo_motivo: '',
      iIdioma: 0,
    };

    return this.http.post<ApiResponse<boolean>>(
      `${this.base}/Motivos/MotivosDelete`,
      body
    );
  }

  // ── Catalogs ─────────────────────────────────────────────────────────
  getTipos(): Observable<ApiResponse<DropdownOption[]>> {
    const body: CatalogRequest = {
      sTabla: 'motivos',
      sCampo: 'tipo',
      iIdioma: 0,
    };

    return this.http.post<ApiResponse<DropdownOption[]>>(
      `${this.base}/OpcionesSolicitud/GetOpcionesVariables`,
      body
    );
  }

  getTiposMotivo(): Observable<ApiResponse<DropdownOption[]>> {
    const body: CatalogRequest = {
      sTabla: 'motivos',
      sCampo: 'Tipo_Motivo',
      iIdioma: 0,
    };

    return this.http.post<ApiResponse<DropdownOption[]>>(
      `${this.base}/OpcionesSolicitud/GetOpcionesVariables`,
      body
    );
  }
}
