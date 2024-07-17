module.exports = {
  apps: [
    {
      name: 'calidad',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
