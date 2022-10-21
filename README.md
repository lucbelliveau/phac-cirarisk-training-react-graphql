# GraphQL Example app
## Peer training session

### Quickstart

```bash
npm run start
```
Navigate to http://localhost:3000


### Steps taken to create this app from scratch:

1. Generate the app using `create-react-app`

   ```bash
   npx create-react-app --template typescript  graphql-example
   cd graphql-example
   ```

1. Open up `package.json`, create a new key called `devDependencies` and move
   development dependencies to it.

   ```json
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "web-vitals": "^2.1.4"
    },
    "devDependencies": {
        "@testing-library/jest-dom": "^5.16.5",
        "@testing-library/react": "^13.4.0",
        "@testing-library/user-event": "^13.5.0",
        "@types/jest": "^27.5.2",
        "@types/node": "^16.11.62",
        "@types/react": "^18.0.21",
        "@types/react-dom": "^18.0.6",
        "react-scripts": "5.0.1",
        "typescript": "^4.8.4"
    },
   ```

   > `npm audit` may report vulnerabilities related to `react-scripts`, but
   > _typically_ only the output of `npm audit --production` should be cause
   > for concern.

1. Install apollo client
   ```bash
   npm install @apollo/client graphql
   ```


---
> The folowing is the default README provided with `create-react-app`.
---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
