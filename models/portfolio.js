// Creating our Portfolio model
module.exports = function (sequelize, DataTypes) {
  const Portfolio = sequelize.define("Portfolio", {
    // The email cannot be null, and must be a proper email before creation
    portfolio_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    portfolio_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    stock_1: {
      type: DataTypes.STRING,
    },
    stock_2: {
      type: DataTypes.STRING,
    },
    stock_3: {
      type: DataTypes.STRING,
    },

  });


  return Portfolio;
};
