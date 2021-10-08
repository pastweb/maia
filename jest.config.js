const { resolve, join } = require('path');
const { lstatSync, readdirSync } = require('fs');

const PACKAGES_DIR_NAME = 'packages';
const WEB_REGEX = `${PACKAGES_DIR_NAME}/.*/src/.*\\.web\\.test\\.(j|t)s(x)?$`;
const NODE_REGEX = `${PACKAGES_DIR_NAME}/.*/src/.*\\.node\\.test\\.(j|t)s(x)?$`;

const packagesPath = resolve(__dirname, PACKAGES_DIR_NAME);
const packages = readdirSync(packagesPath).filter(name =>
    lstatSync(join(packagesPath, name)).isDirectory()
);

const common = {
    verbose: true,
    setupFiles: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    transform: { '^.+\\.(j|t)s(x)?$': 'ts-jest' },
    coveragePathIgnorePatterns: [ 'node_modules', WEB_REGEX, NODE_REGEX ],
    collectCoverageFrom: [ `${PACKAGES_DIR_NAME}/**/*.{js,jsx,ts,tsx}` ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 5,
            lines: 5,
            statements: 5
        }
    },
    moduleNameMapper: packages.reduce((acc, name) => ({
        ...acc,
        [`@maia/${name}(.*)$`]: `<rootDir>/${PACKAGES_DIR_NAME}/./${name}/src/$1`
    }),
    { ['@test/util']: '<rootDir>/test/util' }),
};

module.exports = {
    projects: [
      {
        ...common,
        displayName: 'dom',
        testEnvironment: 'jsdom',
        testRegex: WEB_REGEX,
      },
      {
        ...common,
        displayName: 'node',
        testEnvironment: 'node',
        testRegex: NODE_REGEX,
      },
    ],
};
