# DCDB Project

### [ Try it online on GitHub pages! 🔗](https://sakiskarakasiliotis.github.io/)

## Overview

The DCDB (Disney Character Data Base) project is an application designed to display and catalog all the available Disney Characters provided from the Disney [API Service](https://disneyapi.dev/)

The project has kept components simple on purpose. Since everything is used exactly once and in order to keep it clean and straight forward every component made is kept tied to the business logic of the application.

## Features

- **Technologies**: Developed using Vite, React, Redux (RTK + RTKQuery), Typescript, Styled Components.
- **Libraries**: Highcharts, Font awesome.
- **Custom Components**: Chart, Dialog, ExportXlsx, Pagination, Search, Table, Tabs, Toast

## Data management

The API is handled utilizing RTKQuery `createApi` utility. While developing I realized that some results would return an object instead of a table when only a single result was available. So I decided on adding a transformation on the response so that a table is always returned.

## Styling

The App was designed with a mobile first approach.
Styled components were used for the convenience of passing props (admittedly on only one component).
A small but practical collection of CSS variables is used to achieve uniformity on colors and spacings through the app.

## Component Breakdown

> I decided to utilize native components to the best of my ability because of the accessibility, performance and mobile friendliness of them. Specifically the select component is kept native on 2 occurrences where I believe a custom solution would be overkill (also the mobile experience is superior with the native select in my opinion)

### Chart

Simply uses the Highchart library to display a pie chart with each character on each page of the API response and a list of movies for said characters.
Also contains a download button for an XLSX file that contains the same data.

### Dialog

Displays all the available info about one character. Uses the native HTML Dialog element in order to take advantage of its great accessibility and ready-made functionality.

### Pagination

Simple components that provide basic navigation functionality both on pages and results per page configuration.

### Search

A component that allows the user to search base on the type of search (name, film, TV show, video game) and a specific keyword. I decided against fetching for results as the user types and added a button (as well as the enter key) as it is in my opinion better for the UX and also better for the server resources (less unnecessary requests). The same could be achieved through the use of a debounce mechanism, but I decided against it to keep this simple.

### Table

Displays all the available info of each character and allows sorting for each relevant column. Has a subtle loading animation on the opacity of the table and each row is clickable and triggers the Dialog component with more info for this character.

### Tabs

Allows for space efficient division of the 2 modes of displaying the data between the Table and the Chart component.
Accepts indefinite number of tabs.

### Toast

A small message that gets displayed in case of an error and gets dismissed on its own. Could be easily expanded to get theme support.

## Installation

To get started with the DCDB project, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies:

```bash
yarn
```

4. Start the local dev server (Utilizing Vite)

```bash
yarn dev
```
