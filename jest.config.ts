import type { Config } from 'jest';
import nextJest from 'next/jest.js';

// o caminho para a aplicação Next.js para carregar next.config.js e .env no ambiente de teste
const createJestConfig = nextJest({
  dir: './',
});

// add qualquer configuração personalizada do Jest a ser passada para o Jest
const customJestConfig: Config = {  
  coverageProvider: 'v8',

  // define o ambiente de teste como 'jest-environment-jsdom', que simula um ambiente de navegador
  // importante para testar componentes React que interagem com o DOM
  testEnvironment: 'jest-environment-jsdom',
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  moduleNameMapper: {    
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/context/(.*)$': '<rootDir>/app/context/$1',
    '^@/data/(.*)$': '<rootDir>/app/data/$1',
    '^@/hooks/(.*)$': '<rootDir>/app/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/app/types/$1',
    '^@/wallpapers/(.*)$': '<rootDir>/app/wallpapers/$1',
    // se for um alias genérico para a pasta app
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
 
};

// createJestConfig é exportado desta forma para garantir que next/jest possa carregar a configuração do Next.js corretamente
export default createJestConfig(customJestConfig);