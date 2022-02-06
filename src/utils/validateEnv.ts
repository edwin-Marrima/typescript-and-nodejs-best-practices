import { cleanEnv,str,port } from "envalid";

const validateEnv = ():void =>{
    cleanEnv(process.env,{
        NODE_ENV:str({
            choices:['development','production','staging','test']
        }),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        PORT: port({default:8080})
    })
}

export default validateEnv