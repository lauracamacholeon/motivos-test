import { createReducer, on } from '@ngrx/store';
import { MotivosActions } from './motivos.actions';
import { initialState, motivosAdapter } from './motivos.state';

export const motivosReducer = createReducer(
  initialState,

  // ── Load ──────────────────────────────────────────────────────────────
  on(MotivosActions.loadMotivos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MotivosActions.loadMotivosSuccess, (state, { motivos }) =>
    motivosAdapter.setAll(motivos, { ...state, loading: false })
  ),

  on(MotivosActions.loadMotivosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ── Create ────────────────────────────────────────────────────────────
  on(MotivosActions.createMotivo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MotivosActions.createMotivoSuccess, (state, { motivo }) =>
    motivosAdapter.addOne(motivo, { ...state, loading: false })
  ),

  on(MotivosActions.createMotivoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ── Update ────────────────────────────────────────────────────────────
  on(MotivosActions.updateMotivo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MotivosActions.updateMotivoSuccess, (state, { motivo }) =>
    motivosAdapter.updateOne(
      { id: motivo.motivo, changes: motivo },
      { ...state, loading: false }
    )
  ),

  on(MotivosActions.updateMotivoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ── Delete ────────────────────────────────────────────────────────────
  on(MotivosActions.deleteMotivo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MotivosActions.deleteMotivoSuccess, (state, { codigo }) =>
    motivosAdapter.removeOne(codigo, { ...state, loading: false })
  ),

  on(MotivosActions.deleteMotivoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ── Catalogs ──────────────────────────────────────────────────────────
  on(MotivosActions.loadCatalogsSuccess, (state, { tipos, tiposMotivo }) => ({
    ...state,
    tipos,
    tiposMotivo,
  }))
);
