# Angular Scout Dashboard

An Angular-based dashboard for viewing and exploring Near-Earth Object (NEO) candidates identified by NASA/JPL Scout.

## Tech Stack

- **Angular 22** – Standalone components and Angular Router
- **TypeScript** – Application development
- **NgRx SignalStore** – State management
- **RxJS** – Asynchronous data handling
- **PrimeNG** – UI components and dialog
- **AG Grid Community** – Data grid with sorting, filtering and pagination
- **SCSS** – Component styling

## Features

### NASA Scout Dashboard

- Displays NASA Scout candidate data in an AG Grid table.
- Supports column sorting, filtering and quick search.
- Provides pagination for navigating candidate records.
- Provides detailed information for a selected candidate.
- Supports refreshing data through the same store flow.
- Handles loading, error and empty states.
- Includes a derived **Highest Risk Indicator**, calculated using the maximum of PHA Score and NEO Score.
- Uses NgRx SignalStore to manage application data, loading state and error handling.

### Contact

- A separate Contact page is available through Angular routing.
- Includes a responsive contact form with reactive validation.
- Provides simulated form submission with loading, success and error feedback.

## Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Run the application

```bash
ng serve
```

Open the application at:

`http://localhost:4200`

### Production Build

To generate a production build:

```bash
ng build
```

The generated build output is available in:

`dist/angular-scout-app`

## Data Source and API Integration

The dashboard is designed to support the NASA/JPL Scout API:

`https://ssd-api.jpl.nasa.gov/scout.api`

During development, a browser request to the NASA endpoint was blocked by its CORS policy. Rather than bypassing the restriction using a public proxy or browser security workaround, the application uses a configurable integration endpoint:

`/api/scout`

The data service first attempts to retrieve data from this endpoint. If the request fails, it loads the local JSON fixture:

`src/assets/mock-data/scout-response.json`

The fixture contains a saved NASA Scout API response with 52 candidate records, allowing the dashboard to work consistently during local development and demonstrations.

For production live integration, `/api/scout` should be connected to an approved backend or server-side integration that retrieves the NASA data.

**Note:** The application currently uses a simulated contact form submission. No actual email or backend form submission is performed.

## Project Structure

```text
src/app/
├── core/
│   ├── constants/
│   ├── interceptors/
│   └── services/
├── shared/
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   └── models/
├── features/
│   ├── nasa-scout/
│   │   ├── components/
│   │   ├── models/
│   │   ├── services/
│   │   ├── store/
│   │   └── pages/
│   └── contact/
│       ├── components/
│       ├── models/
│       ├── services/
│       ├── store/
│       └── pages/
├── app.config.ts
├── app.routes.ts
└── app.ts
```

**Project structure note:** Some directories are intentionally kept empty to illustrate the proposed feature-based and layered folder organization. They represent logical locations for future application concerns such as shared directives, pipes, models, core services and interceptors. This provides a scalable organizational structure without introducing unnecessary files or implementations into the current assessment scope.

## Implementation Trade-offs

- **API integration:** A configurable backend endpoint is used instead of calling the NASA API directly from the browser because of the observed CORS restriction.
- **Fallback data:** A local JSON fixture provides a reliable development and demonstration experience when the backend endpoint is unavailable.
- **State management:** NgRx SignalStore centralizes candidate data, loading state and error handling, keeping the page and grid components focused on presentation.
- **Data grid:** AG Grid Community provides sorting, filtering, pagination and quick search without requiring a custom table implementation.
- **Candidate details:** PrimeNG Dialog displays additional candidate information without navigating away from the dashboard.
- **Derived field:** Highest Risk Indicator is calculated from the maximum of PHA Score and NEO Score for convenient comparison. It is an application-derived value, not an official NASA risk classification.
- **Nullable API fields:** Optional values such as close approach distance and V-infinity are handled gracefully when unavailable.
- **Contact form:** Submission is simulated to demonstrate form validation, loading and feedback states without requiring a backend service.
