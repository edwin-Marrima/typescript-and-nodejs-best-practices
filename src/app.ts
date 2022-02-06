import express, { Application } from "express";
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';

class App{
    public express:Application;
    public port:number;

    constructor(controllers:Controller[],port:number){
        this.express = express();
        this.port = port;
        
        this.initializeDatabaseConnection();
        this.initializeMiddleware()
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware():void{
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:false}));
        this.express.use(compression());
    }
    private initializeControllers(controllers:Controller[]):void{
        controllers.forEach((controller:Controller)=>{
            this.express.use('/api',controller.router)
        })
    }
    private initializeErrorHandling():void{
        this.express.use(ErrorMiddleware)
    }
    private async initializeDatabaseConnection():Promise<void>{
        const {MONGO_PATH} = process.env;
        try{
            const connection = await mongoose.connect(MONGO_PATH as string);
            console.log('Connected to database');
        }catch(error){
            console.log(error);
        }
    }
    public listen():void{
        this.express.listen(8080,()=>{
            console.log(`Listen to https://localhost:${this.port}`);
        })
    }
    
}

export default App;