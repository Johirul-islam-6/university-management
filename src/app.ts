import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

//<------------------ All Router Import-------------->

import { globalErrorHandeler } from './apps/middlewares/globalErrorHandelar';
// import { ApiError } from './errors/ApiError'

// cors use
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// <=============== Application All Routers ==================>

// // User router
// app.use('/api/v1/users', UserRoutes);
// // academic semester route
// app.use('/api/v1/academic-semester', SemesterRoute)

// app.get('/', async (req: Request, res: Response) => {
// //   throw new ApiError( 200,'hall dek', 'TWT')

// //  console.log(x)
// })

//global Error Handelar
app.use(globalErrorHandeler);

export default app;
