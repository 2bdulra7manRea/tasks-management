export default () => ({
  port: parseInt(process.env.NODE_SERVER_PORT, 10) || 3000,
  database: {
    host: '172.19.0.3',
    port: 3306,
    username: 'root',
    password: '123',
    database: 'tasks',
  },
});
