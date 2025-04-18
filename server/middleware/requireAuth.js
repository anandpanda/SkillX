const { requireAuth } = require("@clerk/express");

module.exports = requireAuth({
    unauthorized: (req, res) => {
        res.status(401).json({ error: "Unauthorized" });
    },
});
