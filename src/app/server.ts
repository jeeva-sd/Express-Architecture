import application from './app';
import 'dotenv/config'

const port   = process?.env?.PORT || 3000;

const app = application.instance;
app.listen(port, () => console.log(`Server at port:${port}`));