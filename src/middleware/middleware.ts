import { Injectable, NestMiddleware , UnauthorizedException} from "@nestjs/common";
import {Request, Response} from "express";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class PlMiddleware implements NestMiddleware {

    use(req: Request , res: Response, next: () => void){

      const authJwtToken = req.headers.authorization?.split(' ')[1];

      console.log(authJwtToken)
     try {
       const user =  jwt.verify(authJwtToken, 'secretkey123');

        if (user) {

   console.log('userid',user.sub)
            req["userID"] = user.sub;
            
        }


     } catch (error) {


     throw new UnauthorizedException('Invalid token');

    }
    next();

    }

}
