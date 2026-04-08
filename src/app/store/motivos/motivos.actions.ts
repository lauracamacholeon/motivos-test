import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Motivo, DropdownOption } from '../../core/models/motivo.model';

export const MotivosActions = createActionGroup({
  source: 'Motivos',
  events: {
    // ── Load ──────────────────────────────────────────────
    'Load Motivos': emptyProps(),
    'Load Motivos Success': props<{ motivos: Motivo[] }>(),
    'Load Motivos Failure': props<{ error: string }>(),

    // ── Create ────────────────────────────────────────────
    'Create Motivo': props<{ motivo: Motivo }>(),
    'Create Motivo Success': props<{ motivo: Motivo }>(),
    'Create Motivo Failure': props<{ error: string }>(),

    // ── Update ────────────────────────────────────────────
    'Update Motivo': props<{ motivo: Motivo }>(),
    'Update Motivo Success': props<{ motivo: Motivo }>(),
    'Update Motivo Failure': props<{ error: string }>(),

    // ── Delete ────────────────────────────────────────────
    'Delete Motivo': props<{ codigo: string }>(),
    'Delete Motivo Success': props<{ codigo: string }>(),
    'Delete Motivo Failure': props<{ error: string }>(),

    // ── Catalogs ──────────────────────────────────────────
    'Load Catalogs': emptyProps(),
    'Load Catalogs Success': props<{
      tipos: DropdownOption[];
      tiposMotivo: DropdownOption[];
    }>(),
    'Load Catalogs Failure': props<{ error: string }>(),
  },
});
