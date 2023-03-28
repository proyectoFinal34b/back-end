import { Model, DataTypes, Sequelize  } from "sequelize";
import config from "../../lib/config"

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.host,
    dialect: "postgres",
  });

class Cat extends Model {
  public id!: string;
  public name!: string;
  public summary!: string;
  public age!: number;
  public arrived!:string;
  public state!: string;
  public images!: string[]
  public apadrinadores!:Array<{id:string}>
}

Cat.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age:{
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        arrived:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apadrinadores:{
            type: DataTypes.ARRAY(DataTypes.JSONB)
        }
        
    },{ sequelize }
)


export default Cat;