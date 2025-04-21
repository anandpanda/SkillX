// middleware/requireAuth.js
const { ClerkExpressWithAuth } = require("@clerk/express");

const requireAuth = ClerkExpressWithAuth({
    unauthorized: (req, res) => {
        res.status(401).json({ error: "Unauthorized" });
    },
});

module.exports = requireAuth;
