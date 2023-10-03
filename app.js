import { createServer } from './src/configs/server.config.js';
import { connect } from './src/configs/database.config.js';

const app = createServer()

const PORT = 5000;

app.listen(PORT, async () => {
    console.log(`Running on PORT ${PORT}`);
    await connect()
})