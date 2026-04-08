import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Motivo, DropdownOption } from '../../core/models/motivo.model';

export interface MotivosState extends EntityState<Motivo> {
  loading: boolean;
  error: string | null;
  tipos: DropdownOption[];
  tiposMotivo: DropdownOption[];
}

export const motivosAdapter = createEntityAdapter<Motivo>({
  selectId: (m) => m.motivo,
});

export const initialState: MotivosState = motivosAdapter.getInitialState({
  loading: false,
  error: null,
  tipos: [],
  tiposMotivo: [],
});
