import { AuthenticationData } from "./tokenGenerator";
import * as jwt from "jsonwebtoken"

export class GetData {
  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
    };
    return result;
  }
}
