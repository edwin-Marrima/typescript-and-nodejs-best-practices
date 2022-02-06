import 'dotenv/config' //put all .env configurations inside process.env
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';


validateEnv();  //this function validate enviroment variables 
const app = new App([new PostController()],Number(process.env.PORT));
app.listen()