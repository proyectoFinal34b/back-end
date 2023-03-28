import { Model, DataTypes, Sequelize  } from "sequelize";
import config from "../../lib/config"

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.host,
    dialect: "postgres",
  });

class Order extends Model {
  public id!: string;
  public idUser!: string;
  public state!: string;
  public list!: string[]

}

Order.init(
    {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,
        },
        idUser: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        state:{
            type:DataTypes.STRING,
            allowNull: false
        },
        list:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        }
    },
    {
        sequelize
    }
)

export default Order;