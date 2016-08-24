# js-react-catch-the-lion
"Let's catch the Lion" clone implemented in React (with Flow for type checking).


## to build from sources
1. `npm install`
2. `cd modules/block-optimization/`
3. `npm install`
4. `npm run build`
5. `cd ../..`
6. `npm run build`
7. `npm run dev`
8. connect to http://localhost:8090

## node for using Flow
The main project depends on some non npm-published modules that live
in the [modules/] directory.
Type-testing these modules with Flow can happen seperately.
That is, the individual modules the project depends on can be type-checked
separately and the main project can also be type-checked (including, this time,
all modules it depends on). This required some non-intuitive tweaking in the respective
[.flowconfig] files particularly with respect to the use or not of the  <PROJECT_ROOT>
placeholder.

So, to type-check seperately both the constituent modules and the main project:

    cd modules/block-optimization/ && npm run flow && cd - && npm run flow

The above gives redundant type-checking messages and you normally wouldn't do it
this way.


