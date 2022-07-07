const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_item_tracker_db');

const { VIRTUAL, STRING, INTEGER } = Sequelize;

const User = conn.define('user', {
  name: {
    type: STRING 
  }
});

const Thing = conn.define('thing', {
  name: {
    type: STRING 
  },
  highRanked: {
    type: VIRTUAL,
    get: function(){
      return this.ranking > 5;
    }
  },
  ranking: {
    type: INTEGER,
    defaultValue: 1
  }
});


module.exports = {
  conn,
  User,
  Thing
};
