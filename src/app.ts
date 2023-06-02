import express, { Application } from "express";
import cors from "cors"
const app: Application = express()

//<------------------ All Router Import-------------->
// import UserRouter from "./apps/modules/users/user.routes";

// cors use
app.use(cors())

// parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User router
// app.use('/api/v1', UserRouter)

/* 
01. step- src/ file serveces Or app create to connected database
02. step- modules system folder Mantains modules-> users -> all file like model, router, controller, service
03. step- run system
*/

export default app;