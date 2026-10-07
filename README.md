# Bordeaux Mobility

Real-time bike station explorer for Bordeaux Métropole built with Angular and TypeScript.

[Live Demo](https://bordeaux-mobility-m-a.vercel.app/)

---

## Preview

<p align="center">
  <img
    src="docs/screenshots/bordeaux-mobility-mobile.png"
    alt="Bordeaux Mobility mobile view"
    width="220"
  >
  &nbsp;&nbsp;&nbsp;
  <img
    src="docs/screenshots/bordeaux-mobility-desktop.png"
    alt="Bordeaux Mobility desktop view"
    width="520"
  >
</p>

---

## About the Project

Angular application using Bordeaux Métropole Open Data to explore bike stations and their real-time availability.
The project focuses on modern Angular practices, RxJS, Signals, Reactive Forms and a mobile-first approach, with layouts progressively adapted for larger screens.

---



## Features

- Real-time bike station availability
- Search and availability filters
- Station details with bike types, status and last update
- Favorite stations persisted with localStorage
- Station address with reverse geocoding
- Direct link to the station location on Google Maps
- Manual data refresh
- Mobile-first responsive interface with dedicated desktop layouts

---

## Built With

![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat&logo=reactivex&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565?style=flat&logo=lucide&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)

---

## Quality

- Unit and component tests with Vitest and Angular TestBed
- ESLint code quality checks
- GitHub Actions CI running lint, tests and production build

---

## Data Sources

Station availability data comes from Bordeaux Métropole Open Data.

Station addresses are resolved from their coordinates using the French national geocoding service provided by the IGN Géoplateforme.

---

## Installation

```bash
git clone https://github.com/m-amroune/bordeaux-mobility.git
cd bordeaux-mobility
npm install
npm start
```

Open `http://localhost:4200`.