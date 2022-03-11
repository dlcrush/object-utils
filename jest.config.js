const ignorePaths = [
	'/node_modules/'
];

module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'node',
	roots: [
		'<rootDir>/src/'
	],
	testPathIgnorePatterns: ignorePaths,
	coveragePathIgnorePatterns: ignorePaths,
	transformIgnorePatterns: ['^.+\\.js$']
};
