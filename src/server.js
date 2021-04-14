const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/app-log-preventsenior'));
app.get('/!*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/app-log-preventsenior/index.html'));
});
app.listen(process.env.PORT || 4200, () => {
  console.log('Server running');
});
