const app = require('./src/app');
const config = require('./src/config/config');

const PORT = config.port;

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Properly close server on unhandled rejection
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});