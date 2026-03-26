const https = require('https');
https.get('https://disaffectedly-vibrative-rafael.ngrok-free.dev', (res) => {
  console.log('STATUS:', res.statusCode);
}).on('error', (e) => {
  console.error(e);
});
