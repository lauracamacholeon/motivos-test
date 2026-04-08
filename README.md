# Motivos Manager

> Angular 18 application to manage Reasons (Motivos) via REST API — built with NgRx, Tailwind CSS and Standalone Components.

---

## Tech Stack

| Layer            | Technology                                 |
| ---------------- | ------------------------------------------ |
| Framework        | Angular 18 (Standalone)                    |
| State Management | NgRx 18 (Store, Effects, Entity, Devtools) |
| Styling          | Tailwind CSS 3                             |
| Forms            | Angular Reactive Forms                     |
| Language         | TypeScript 5.5                             |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/lauracamacholeon/motivos-test.git
npm install
```

### Run

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200)

### Build

```bash
npm run build
```

---

## Project Structure

```
src/app/
├── core/
│   ├── models/
│   │   └── motivo.model.ts          # Interfaces and types
│   └── services/
│       └── motivos.service.ts       # HTTP calls to the API
├── store/
│   └── motivos/
│       ├── motivos.actions.ts       # NgRx actions
│       ├── motivos.reducer.ts       # State transitions
│       ├── motivos.effects.ts       # Side effects (HTTP)
│       ├── motivos.selectors.ts     # Memoized selectors
│       └── motivos.state.ts         # State shape + adapter
└── features/
    └── motivos/
        ├── motivos-list/            # Main table view
        └── motivo-form/             # Create / edit modal
```

---

## Features

- List all motivos with search by reason code or description
- Create new motivo with form validation
- Edit existing motivo — reason code is locked on edit
- Delete motivo with confirmation dialog
- Loading indicators on all async operations
- Error messages for failed requests
- Empty state when no data is found

---

## Technical Decisions

**NgRx Entity**
Manages the motivos collection with built-in `addOne`, `updateOne`, `removeOne` and `selectAll` — no manual array manipulation anywhere.

**Standalone Components**
No NgModules. Simpler dependency graph and better tree-shaking out of the box.

**Signals for UI State**
Filter text, modal visibility and selected motivo live in Angular signals instead of the store. This keeps a clear boundary between server state (NgRx) and ephemeral UI state (signals).

**Lazy Loading**
The motivos feature loads on demand via `loadComponent` in the router — no eager loading of feature code on app start.

**forkJoin for Catalogs**
The `tipo` and `tipo_motivo` dropdowns are fetched in parallel in a single `loadCatalogs` effect using `forkJoin`, reducing waterfall requests to one round trip.

**Single Environment File**
No `fileReplacements` needed since both dev and prod point to the same API base URL. Can be split when a local mock server is introduced.

---

## API Reference

Base URL: `https://desarrolloaws.datascoring.co:9995`

| Action   | Endpoint                                     | que |
| -------- | -------------------------------------------- | --- |
| List     | POST /Motivos/MotivosList                    | 4   |
| Create   | POST /Motivos/MotivosAdd                     | 1   |
| Update   | POST /Motivos/MotivosUpd                     | 2   |
| Delete   | POST /Motivos/MotivosDelete                  | 3   |
| Catalogs | POST /OpcionesSolicitud/GetOpcionesVariables | —   |

---

## Assumptions

- The API does not require authentication headers
- `data: false` on create means the reason code already exists
- `data: false` on delete means the motivo is currently in use
- The `motivo` field acts as the unique primary key
- API field names (`motivo`, `descripcion`, `tipo`, `tipo_motivo`) are kept as-is since they are part of the API contract and cannot be renamed

---

## Pending Improvements

- Toast notifications instead of inline error messages
- Pagination for large datasets
- HTTP interceptor for centralized error handling
- Skeleton loaders instead of spinner
- Unit tests for reducer, effects and selectors
- E2E tests with Cypress or Playwright
- Local mock server to decouple dev environment from production API
