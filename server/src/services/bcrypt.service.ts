import { IBcryptService } from '../IServices/IBcryptService';
import * as bcrypt from 'bcrypt';
import { SaltAndPass } from '../models';
import constant from '../constant';

class BcryptService implements IBcryptService {
    private static instance: BcryptService;
    private constructor() {

    }
    static getInstance() {
        if (!BcryptService.instance) {
            BcryptService.instance = new BcryptService();
        }
        return BcryptService.instance;
    }
    getSaltAndHashpass(password: String): Promise<SaltAndPass> {
        return bcrypt.genSalt(constant.SALTROUNDS).then(salt => {
            return bcrypt.hash(password, salt).then(hassPass => {
                return Promise.resolve({
                    hashPass: hassPass,
                    salt: salt
                });
            });
        });
    }
    comparePass(otherPass: String, password: String): Promise<boolean> {
        return bcrypt.compare(otherPass, password).then(res => {
            if (res) {
                return Promise.resolve(true);
            } else {
                return Promise.reject(false);
            }
        });
    }

}
export const BcryptServiceInstance = BcryptService.getInstance();
