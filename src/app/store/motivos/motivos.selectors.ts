import { createFeatureSelector, createSelector } from '@ngrx/store';
import { motivosAdapter, MotivosState } from './motivos.state';

const selectMotivosState = createFeatureSelector<MotivosState>('motivos');

const { selectAll } = motivosAdapter.getSelectors();

export const selectAllMotivos = createSelector(selectMotivosState, selectAll);

export const selectLoading = createSelector(
  selectMotivosState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectMotivosState,
  (state) => state.error
);

export const selectTipos = createSelector(
  selectMotivosState,
  (state) => state.tipos
);

export const selectTiposMotivo = createSelector(
  selectMotivosState,
  (state) => state.tiposMotivo
);

export const selectFilteredMotivos = (filter: string) =>
  createSelector(selectAllMotivos, (motivos) => {
    const term = filter.trim().toLowerCase();
    if (!term) return motivos;
    return motivos.filter(
      (m) =>
        m.motivo.toLowerCase().includes(term) ||
        m.descripcion.toLowerCase().includes(term)
    );
  });
