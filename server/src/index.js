import app from './app';
import './database';

app.listen(app.get("port"), () => {
	console.log("\x1b[34m", `Server on port: ${app.get("port")}`);
});
