import express from 'express';
const cors = require('cors');

import routes from './routes';

const app = express();

const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.use(routes);

function launcher(delay: number): Promise<Function> {
  return new Promise(function launcherPromise(resolve) {
    setTimeout(resolve, delay);
  });
}

const startMessages = async () => {
  console.clear();
  for (let i = 1; i > 0; i -= 1) {
    console.log(`⏰${i}`);
    await launcher(1000);
  }
  console.log('🔥 IGNITION 🔥');
  setTimeout(() => {
    console.log(`🚀🚀 LAUNCH 🚀🚀`);
    console.log(`🚪 PORT 3333  🚪`);
  }, 1000);
};
app.listen(port, startMessages);