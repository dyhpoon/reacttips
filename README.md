This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# How to speed up react component
1. use shouldComponentUpdate to avoid unnecessary re-render

```
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.text !== this.props.text  
}
```

2. Move to functional component?

[faster react functional components](https://medium.com/missive-app/45-faster-react-functional-components-now-3509a668e69f)

If you think moving to functional component from stateful component would improve performance,
then you'd be wrong! It is incorrect that functional components would avoid mounting/unmounting
as well as lifecycle event overhead.

Stateful component is actually wrapped in a class internally. Therefore, its the same code path. (from Dan)

The original React 0.14 release notes
```
This pattern is designed to encourage the creation of these simple components that should comprise large portions of your apps. In the future, we’ll also be able to make performance optimizations specific to these components by avoiding unnecessary checks and memory allocations.

```

However, there is a hacky way to skip these overheads.
Simply eliminate React.createElement call.
```
ReactDOM.render(
   <div>
-    <Avatar url={avatarUrl} />
+    {Avatar({ url: avatarUrl })}
     <div>{commentBody}</div>
   </div>,
   mountNode
 );

 // Compiled JavaScript
 ReactDOM.render(React.createElement(
   'div',
   null,
-  React.createElement(Avatar, { url: avatarUrl }),
+  Avatar({ url: avatarUrl }),
   React.createElement(
     'div',
     null,
     commentBody
   )
 ), mountNode);
```

If you think it makes your code unpleasant, you can use transform-react-inline-elements
Simply add
```
// webpack.js
{
  test: /\.(js|jsx)$/,
  include: paths.appSrc,
  loader: 'babel',
  query: {
    plugins: ['transform-react-inline-elements'], // Add this

    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true
  }
},
// or .babelrc
{
  "plugins": ["transform-react-inline-elements"]
}
```