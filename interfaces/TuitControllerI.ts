import {Request, Response} from "express";

/**
 * @file Declares Interface for Tuits object controller methods
 */
export default interface TuitController {
   findAllTuits(req: Request, res: Response): void;
   findTuitById(req: Request, res: Response): void;
   findTuitsByUser(req: Request, res: Response): void;
   createTuit(req: Request, res: Response): void;
   updateTuit(req: Request, res: Response): void;
   deleteTuit(req: Request, res: Response): void;
}
