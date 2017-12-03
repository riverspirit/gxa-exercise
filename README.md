# `gxa-exercise`

See the number of publications that match the given query in Europe PMC for a given year range. If year range is not provided, data for the last 10 years is fetched.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)

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

## To Do
- Tests
- ESLint/Airbnb styleguide