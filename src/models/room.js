"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      room_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "room",
      timestamps: false,
    }
  );
  return Room;
};
