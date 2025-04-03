# Calculator

## How to run the app
- **Initialize Git (if not already initialized):**  
  Run `git init` in the project root.
- Clone the repository.
- Run `npm install` to install dependencies.
- Run `npm run build` to generate the production build in the `dist` folder.
- Open `dist/index.html` in your browser.

## Deployment
[Deploy the application](https://matsiyakainnowise.tiiny.site)

## Folder Structure
- **src/**  
  Contains source files:
  - `index.html`: HTML template.
  - `index.js`: Main JavaScript file with application logic.
  - `styles.css`: Stylesheet.
  - `adjustFontSize.js`: Utility to adjust the display font size.
- **dist/**  
  Contains production build output (generated by Webpack).
- **.husky/**  
  Contains Git hooks (pre-commit hook) for code quality checks.
- **package.json**  
  NPM configuration and scripts.
- **webpack.config.js**  
  Webpack configuration file.
- **README.md**  
  Project documentation.
