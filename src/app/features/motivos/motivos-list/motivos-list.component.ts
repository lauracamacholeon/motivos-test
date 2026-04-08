import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MotivosActions } from '../../../store/motivos/motivos.actions';
import {
  selectAllMotivos,
  selectError,
  selectFilteredMotivos,
  selectLoading,
} from '../../../store/motivos/motivos.selectors';
import { Motivo } from '../../../core/models/motivo.model';
import { MotivoFormComponent } from '../motivo-form/motivo-form.component';

@Component({
  selector: 'app-motivos-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MotivoFormComponent],
  templateUrl: './motivos-list.component.html',
})
export class MotivosListComponent implements OnInit {
  private readonly store = inject(Store);

  // ── State ────────────────────────────────────────────────────────────
  filter = signal('');
  showForm = signal(false);
  selectedMotivo = signal<Motivo | null>(null);
  showConfirm = signal<string | null>(null);

  // ── Selectors ────────────────────────────────────────────────────────
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  get motivos$() {
    return this.store.select(selectFilteredMotivos(this.filter()));
  }

  // ── Lifecycle ────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.store.dispatch(MotivosActions.loadMotivos());
    this.store.dispatch(MotivosActions.loadCatalogs());
  }

  // ── Actions ──────────────────────────────────────────────────────────
  openCreate(): void {
    this.selectedMotivo.set(null);
    this.showForm.set(true);
  }

  openEdit(motivo: Motivo): void {
    this.selectedMotivo.set(motivo);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.selectedMotivo.set(null);
  }

  confirmDelete(codigo: string): void {
    this.showConfirm.set(codigo);
  }

  cancelDelete(): void {
    this.showConfirm.set(null);
  }

  deleteMotivo(): void {
    const codigo = this.showConfirm();
    if (!codigo) return;
    this.store.dispatch(MotivosActions.deleteMotivo({ codigo }));
    this.showConfirm.set(null);
  }

  onFilterChange(value: string): void {
    this.filter.set(value);
  }
}
