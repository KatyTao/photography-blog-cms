module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2a92fa1fca5b826bc95c849f2b1504d4'),
  },
});
