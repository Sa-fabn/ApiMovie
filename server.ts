import express, {Request, Response} from "express";
import { MovieController } from "./controllers/movieController";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';
import { swaggerOptions } from "./swaggerOptions";


const app = express();
const API_KEY = "d2a2d89adba48213c77756af3ad264a6";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;


const movieController = new MovieController(API_KEY);

app.get("/test", (req: Request, res: Response) => {
    res.send("coucou, le serveur fonctionne :)");
})

//creer la route qui va utiliser le controlleur movie pour faire la request
app.get("/movie/:movieID", async (req: Request, res: Response) => {
    await movieController.getMovie(req, res);
})

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
  });