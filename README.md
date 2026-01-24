# Smart Home UI (Part 3)

This is a web application for managing a Smart Home system, 
built as part of the RSSchool Angular course. It features device management, 
room control, and real-time monitoring.

[Here you can find the task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular-smart-home-ui/smart-home-part-3.md)

## Key Features

- **Dashboard:** Overview of smart home status.
- **Device Management:** Real-time control and monitoring of connected devices.
- **State Management:** Efficient data handling using `@ngrx/signals`.
- **Responsive Design:** Optimized for various screen sizes using Angular Material.

## Tech Stack

- **Angular 21** (Standalone components, Signals)
- **NgRx Signal Store** (State management)
- **Angular Material** (UI components)
- **RxJS** (Reactive streams)
- **Prettier & ESLint** (Code quality)

## Getting Started

### Requirements

- **Node.js**: Version 20 or higher

### Scripts
- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint for static analysis.
- `npm run format`: Formats code according to Prettier config.

### Frontend Setup
- Clone this repository.
- Install dependencies: `npm install`
- Start the app: `npm start`

### Backend Setup
To run the backend server locally:

- Clone: [Backend Repository](https://github.com/pavelrazuvalau/smart-home-json-server).
- Install Dependencies: `npm install`
- Start the Server: `npm start`

The server will be available at http://localhost:3004.

*Once the local server is running, the deployed application on 
Netlify will automatically start receiving data from your local machine. 
If you see any connection errors, ensure that port 3004 is not 
being used by another process*

***Use one of the following credentials to access the app:***

| User   | Login | Password |
|:-------| :--- | :--- |
| User 1 | `Sparks` | `consectetur` |
| User 2 | `Blackburn` | `consectetur` |
| User 3 | `Lolita` | `ullamco` |

