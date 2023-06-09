module.exports = function (api) {
	api.cache(true)
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"nativewind/babel",
			[
				"module:react-native-dotenv",
				{
					moduleName: "@env",
					path: ".env",
					blacklist: null,
					whitelist: null,
					safe: false,
					allowUndefined: true,
				},
			],
			[
				"module-resolver",
				{
					root: ["."],
					extensions: [".js", "ts", ".jsx", "tsx"],
					alias: {
						"@firebaseAPI": "./firebase.js",
						"@assets": "./src/assets",
						"@components": "./src/components",
						"@constants": "./src/constants",
						"@contexts": "./src/contexts",
						"@hooks": "./src/hooks",
						"@reducers": "./src/reducers",
						"@screens": "./src/screens",
						"@stacks": "./src/stacks",
						"@utils": "./src/utils",
					},
				},
			],
		],
		env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
	}
}
