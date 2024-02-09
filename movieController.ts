import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";


export class MovieController {
  private API_KEY: string;

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

/**
 * @swagger
 * /movie/{movieID}:
 *   get:
 *     summary: Obtient les informations d'un film par son ID.
 *     description: Récupère les informations d'un film en fonction de son ID.
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: Succès. Retourne les données du film correspondant à l'ID spécifié.
 *       400:
 *         description: Requête incorrecte. Vérifiez l'ID du film.
 */





  public async getMovie(req: Request, res: Response): Promise<void> {
    const movieID: number = parseInt(req.params.movieID);
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.API_KEY}&language=fr`
      );
  

      const minimalData : MinimalMovieData = {
        id: response.data.id
       }
       res.json(minimalData);
      }catch(error){
      res.status(500).json({ error: "Erreur" });
    }
  }
}
