import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // plugins: ['import'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // External libraries (npm packages)
            'internal', // Internal modules (alias paths)
            'parent', // Parent imports (`../`)
            'sibling', // Sibling imports (`./`)
            'index', // Index file imports (`./`)
            'object', // Object imports
            'type', // Type imports (TypeScript)
          ],
          'newlines-between': 'always', // Enforce new lines between groups
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
