# c2gin

[![Actions Status](https://github.com/TheBoringDude/c2gin/workflows/Test/badge.svg)](https://github.com/TheBoringDude/c2gin/actions)

a simple app for managing projects

## Usage

### Screenshot

- Light
  ![screenshot (light-version)](./screenshot.png)

- Dark
  ![screenshot (dark-version)](./screenshot-dark.png)

### Implemented Shortcuts

- **`ctrl + p`** - triggers `New Project Modal`
- **`ctrl + alt + p`** - `New Work Group` (works only if there is a selected project)
- **`ctrl + s`** - save the selected project
- **`ctrl + d`** - remove the selected project
- **`ctrl + b`** - toggles the sidebar
- **`ctrl + f`** - shows the search input
- **`alt + {project_number}`** - select a current project from the sidebar (starts at 1)

## Build

```
yarn package
```

- If you want to build for multiple os. Try running the following.
  ```
  yarn package-all
  ```

## Development

- After installing all dependencies, start the development setup.

```
yarn start
```

### TODO:

- migrate to `@lowdb-v2`
- improve ui design
- make projects savable for future updates
- fix github automatic release publish `actions` (`electron-builder`)

### Primary Used Libraries

- electron
- react
- tailwindcss
- @heroicons/react
- @headlessui/react
- lowdb
- etc...

## Thanks

### Boilerplate Used: [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

- Setting Up **Tailwind**
  - https://rodpadev.medium.com/add-tailwind-css-to-the-popular-electron-react-boilerplate-erb-f1286b5b04f
