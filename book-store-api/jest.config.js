module.exports = {
    // Indicates which test environment to use
    testEnvironment: 'node',
  
    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',
  
    // An array of file extensions your modules use
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
  
    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>', '<rootDir>/tests'],
  
    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  
    // Transform files before running tests
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  
    // Ignore specific files or directories
    // For example, to ignore the build directory
    // modulePathIgnorePatterns: ['<rootDir>/build/'],
  };
  