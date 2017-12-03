# `gxa-exercise`

See the number of publications that match the given query in Europe PMC for a given year range. If year range is not provided, data for the last 10 years is fetched.

## Prerequisites
The following dependencies need to be downloaded and installed.

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- [Grunt](https://gruntjs.com/getting-started)

## Development

To run the project, do this:

```
git https://github.com/riverspirit/gxa-exercise.git
cd gxa-exercise
yarn start
```

To lint the code using JSHint before committing:

```
yarn run lint
```

## Testing
To be added

## Deployment
Run the build command to create a build. Once the script finishes, a build will be created in a `dist` directory.
```
yarn run build
```

The `dist` directory is excluded from `.gitignore` so that it can be committed and deployed in Github Pages. To deploy to Github Pages, do this:

```
 # Create build
yarn run build

# Commit the dist folder and push it to gh-pages
git add dist && git commit -m "Create new dist"
git subtree push --prefix dist origin gh-pages
```

## Demo
A demo hosted using Github Pages is available at [riverspirit.github.io/gxa-exercise](https://riverspirit.github.io/gxa-exercise/)

## To Do
- Tests
- ESLint/Airbnb styleguide