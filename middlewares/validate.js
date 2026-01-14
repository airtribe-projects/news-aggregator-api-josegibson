function validateSignup(req, res, next) {
    const { name, email, password, preferences } = req.body;
    if (!name || !email || !password || !preferences) {
        return res.status(400).json({ message: 'All fields (name, email, password, preferences) are required for signup.' });
    }
    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required for login.' });
    }
    next();
}

module.exports = { validateSignup, validateLogin };
