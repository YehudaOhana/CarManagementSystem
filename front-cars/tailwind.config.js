const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    backgroundImage: {
      'pack-train':
        "url('https://images.unsplash.com/photo-1494481524892-b1bf38423fd1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhciUyMHJvYWR8ZW58MHx8MHx8fDA%3D')",
    },
  },
  plugins: [],
};
