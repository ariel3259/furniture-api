const furnitureSql = {
    read : "SELECT `id`, `name`, `brand`, `furniture_type`, `price`, `stock` FROM `furniture` WHERE `state` LIKE 0",
    create : "INSERT INTO `furniture`(`name`, `brand`, `furniture_type`, `price`, `stock`, `state`) VALUES (?, ?, ?, ?, ?, 0)",
    update : "UPDATE `furniture` SET `name` = ?, `brand` = ?, `furniture_type` = ?, `price` = ?, `stock` = ? WHERE `id` LIKE ?",
    delete : "UPDATE `furniture` SET `state` = 1 WHERE `id` LIKE ?"
};

module.exports = furnitureSql;