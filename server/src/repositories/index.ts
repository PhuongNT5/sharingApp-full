export * from '../repositories/user.repository';
import { IUserRepository} from '../IRepositories'
import { UserRepository} from '../repositories'

class DBContext {
    private static instance: DBContext;
    private user: IUserRepository;
    constructor() {
        this.user = new UserRepository();
    }

    public static getInstance() {
        if (!DBContext.instance) {
            DBContext.instance = new DBContext();
        }
        return DBContext.instance;
    }
    public getUser() {
        return this.user;
    }
}
export const DBContextSingleton = DBContext.getInstance();
