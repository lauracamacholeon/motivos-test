import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Motivo } from '../../../core/models/motivo.model';
import { MotivosActions } from '../../../store/motivos/motivos.actions';
import {
  selectError,
  selectLoading,
  selectTipos,
  selectTiposMotivo,
} from '../../../store/motivos/motivos.selectors';

@Component({
  selector: 'app-motivo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './motivo-form.component.html',
})
export class MotivoFormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  // ── Inputs / Outputs ─────────────────────────────────────────────────
  motivo = input<Motivo | null>(null);
  close = output<void>();

  // ── Selectors ────────────────────────────────────────────────────────
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  tipos$ = this.store.select(selectTipos);
  tiposMotivo$ = this.store.select(selectTiposMotivo);

  // ── Form ─────────────────────────────────────────────────────────────
  form = this.fb.group({
    motivo: ['', Validators.required],
    descripcion: ['', Validators.required],
    tipo: ['', Validators.required],
    tipo_motivo: ['', Validators.required],
  });

  get isEditing(): boolean {
    return !!this.motivo();
  }

  // ── Lifecycle ────────────────────────────────────────────────────────
  ngOnInit(): void {
    const m = this.motivo();
    if (m) {
      this.form.patchValue(m);
      this.form.get('motivo')?.disable();
    }
  }

  // ── Actions ──────────────────────────────────────────────────────────
  submit(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue() as Motivo;

    if (this.isEditing) {
      this.store.dispatch(MotivosActions.updateMotivo({ motivo: value }));
    } else {
      this.store.dispatch(MotivosActions.createMotivo({ motivo: value }));
    }

    this.close.emit();
  }

  cancel(): void {
    this.close.emit();
  }

  // ── Field helpers ────────────────────────────────────────────────────
  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && control.touched;
  }
}
