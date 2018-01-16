import {SaltAndPass } from '../models';
export interface IBcryptService {
    getSaltAndHashpass(password: String): Promise<SaltAndPass>;
    comparePass(otherPass: String, password: String): Promise<boolean>;
}
