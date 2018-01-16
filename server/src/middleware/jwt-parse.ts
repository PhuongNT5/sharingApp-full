import * as jwt from 'jsonwebtoken';
import constant from '../constant';
export const parser = function (roleArray: String[]) {
    const role = Array.prototype.slice.call(roleArray);

    return (req, res, next) => {
        // const token = req.header['x-access-token'];
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, constant.JWTsecrect, (err, decodedData) => {
                if (err) {
                    res.status(401);
                    res.json({
                        message: 'Invalid User or Token'
                    });
                } else {
                    if (decodedData.role === constant.ROLE.USER && role.indexOf(constant.ROLE.USER) > -1) {
                        req.user = decodedData;
                        next();
                    } else if (decodedData.role === constant.ROLE.ADMIN && role.indexOf(constant.ROLE.ADMIN) > -1) {
                        req.user = decodedData;
                        next();
                    } else {
                        res.status(405);
                        res.json({
                            message: 'Permission'
                        });
                    }
                }
            });
        }
    };
};
