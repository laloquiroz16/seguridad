module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: "3.25"
      }
    ],
    "@babel/typescript"
  ];
  const plugins = [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/proposal-class-properties",
      {
        loose: true
      }
    ],
    "@babel/proposal-object-rest-spread",
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    "@babel/plugin-syntax-dynamic-import",
    [
      "angularjs-annotate",
      {
        explicitOnly: true
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
