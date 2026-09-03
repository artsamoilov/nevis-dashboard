import express from 'express';
import cors from 'cors';
import {companyRouter} from "./routes/company";

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', companyRouter);