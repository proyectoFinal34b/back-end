import { Model, DataTypes, Sequelize  } from "sequelize";
import config from "../../lib/config"

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.host,
    dialect: "postgres",
  });
  interface Discount {
    isActive: boolean;
    value: number;
  }
class Product extends Model {
  public id!: string;
  public name!: string;
  public summary!: string;
  public stock!: number;
  public price!: number;
  public discount!: Discount;
  public rating!: Array<{ idUser: string, rating: number, review: string }>;

}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue:{
        isActive:false,
        value:0
      }
    },
    rating:{
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true
    },
    images:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
    }
  },
  { sequelize }
);

export default Product;