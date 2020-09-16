
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mariadb://root:juanseromo1208@localhost:3306/delilah-db', {
  dialect: 'mariadb',
  dialectOptions: {useUTC: false,
    timezone: process.env.db_timezone
  },
  define: {
    timestamps: false // true by default
  }
})

module.exports = exports = sequelize
//module.exports = router;
