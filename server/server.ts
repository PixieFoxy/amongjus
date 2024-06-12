import express from 'express';
import session from 'express-session'
import dotenv from 'dotenv';
import type { Request, Response } from "express";
import { userRouter } from "./routes/userRouter";
import { passport } from "./middlewares/auth/passport"

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.SERVER_PORT

app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SECRET ? process.env.SECRET : "c*4!n'buyL[(~0lPM&bID)=vZS{r`7",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 60 * 60 * 1000, // 1 hour = 60 minutes * 60 seconds * 1000 ms
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);

app.get('/', function(req: Request, res: Response) {
  res.send('<h1>Hello World!</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})