module.exports = {
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = 'Coma Physics Demos'
			return args
		})
	},
}
