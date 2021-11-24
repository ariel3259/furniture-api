const usersSql = {
    register : "INSERT INTO `users`(`name`, `last_name`,  `email`, `password`) VALUES (?, ?, ?, ?)",
    auth : "SELECT `name`, `password` FROM `users` WHERE `email` LIKE ?"
};

module.exports = usersSql;