import jwt from 'jsonwebtoken';

//user wants to like a post
// click like button => auth middleware (next) => like controller

const auth = async (req, res, next) => {
    try {
        //console.log(req.headers)
        const token = req.headers.authorization.split(" ")[1]; //debug here
        const isCustomAuth = token.length < 500; //our own JWT token

        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'mysupersecretkey'); //return username and id of loggedd in user
            req.userId = decodedData?.id; //?. optional chaining to check if data is available or not
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth;