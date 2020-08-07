const { default: ShortUniqueId } = require('short-unique-id');

module.exports = generateToken = () => {
    const uid = new ShortUniqueId();
    return uid();
};