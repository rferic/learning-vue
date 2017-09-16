module.exports = {
    decodeToken: function(req, res) {
        var token = null;
        var authorization = req.headers.authorization.split(" ");
        if (authorization.length === 2) {
            var key = authorization[0];
            var val = authorization[1];
            if (/^Bearer$/i.test(key)) {
                token = val.replace(/"/g, "");
                return token;
            }
            return false;
        }
        return false;
    },
    secret: 'random-key'
}