import adminWhitelist from './whitelist.js';

export const validateRole = (req, res, next) => {
    const { email, role } = req.body;

    if (!role) {
        req.body.role = 'investigator';
    } else if (role === 'admin') {
        if (!adminWhitelist.includes(email)) {
            return res.status(403).json({ error: 'Email is not whitelisted for admin role' });
        }
    } else if (role !== 'investigator') {
        return res.status(400).json({ error: 'Invalid role specified' });
    }

    next();
};

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            res.status(401).json({ message: 'Invalid Token' });
        });
};

export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
};
