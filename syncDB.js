const Viewed = require('./models/viewed');
const Crystal = require('./models/crystals');

Viewed.sync({force: true});
Crystal.sync({ force: true });
