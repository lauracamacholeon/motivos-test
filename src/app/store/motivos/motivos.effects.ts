import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MotivosService } from '../../core/services/motivos.service';
import { MotivosActions } from './motivos.actions';

@Injectable()
export class MotivosEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(MotivosService);

  // ── Load ────────────────────────────────────────────────────────────────
  loadMotivos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotivosActions.loadMotivos),
      switchMap(() =>
        this.service.getMotivos().pipe(
          map(({ data }) =>
            MotivosActions.loadMotivosSuccess({ motivos: data })
          ),
          catchError((error) =>
            of(MotivosActions.loadMotivosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // ── Create ──────────────────────────────────────────────────────────────
  createMotivo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotivosActions.createMotivo),
      switchMap(({ motivo }) =>
        this.service.createMotivo(motivo).pipe(
          map(({ data }) =>
            data
              ? MotivosActions.createMotivoSuccess({ motivo })
              : MotivosActions.createMotivoFailure({
                  error: 'Reason code already exists.',
                })
          ),
          catchError((error) =>
            of(MotivosActions.createMotivoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // ── Update ──────────────────────────────────────────────────────────────
  updateMotivo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotivosActions.updateMotivo),
      switchMap(({ motivo }) =>
        this.service.updateMotivo(motivo).pipe(
          map(({ data }) =>
            data
              ? MotivosActions.updateMotivoSuccess({ motivo })
              : MotivosActions.updateMotivoFailure({
                  error: 'Could not update reason.',
                })
          ),
          catchError((error) =>
            of(MotivosActions.updateMotivoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // ── Delete ──────────────────────────────────────────────────────────────
  deleteMotivo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotivosActions.deleteMotivo),
      switchMap(({ codigo }) =>
        this.service.deleteMotivo(codigo).pipe(
          map(({ data }) =>
            data
              ? MotivosActions.deleteMotivoSuccess({ codigo })
              : MotivosActions.deleteMotivoFailure({
                  error: 'Could not delete reason. It may be in use.',
                })
          ),
          catchError((error) =>
            of(MotivosActions.deleteMotivoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // ── Catalogs ────────────────────────────────────────────────────────────
  loadCatalogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MotivosActions.loadCatalogs),
      switchMap(() =>
        forkJoin({
          tipos: this.service.getTipos(),
          tiposMotivo: this.service.getTiposMotivo(),
        }).pipe(
          map(({ tipos, tiposMotivo }) =>
            MotivosActions.loadCatalogsSuccess({
              tipos: tipos.data,
              tiposMotivo: tiposMotivo.data,
            })
          ),
          catchError((error) =>
            of(MotivosActions.loadCatalogsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
