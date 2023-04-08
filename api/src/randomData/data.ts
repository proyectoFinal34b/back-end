// @ts-nocheck
import { Request, Response, NextFunction } from 'express';
import { User } from "../models/User"
import { Cat } from "../models/Cat"
import { Product } from "../models/Product"
import { Category } from "../models/Category"
import { Order } from "../models/Order"

const cats = [
    {
        name:"Tom",
        gender:"macho",
        age:1,
        state:"albergue",
        status:false,
        sponsorId: [1],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://www.huellascallejeras.com/wp-content/uploads/2020/10/jose-gato-adulto-en-adopcion-1-580x460.jpg"],
        arrived:"2023-01-02",
    },
    {
        name:"ShereKhan",
        gender:"macho",
        age:4,
        state:"albergue",
        description:"Si buscas un gato que te haga reír, este es tu gato ideal. Con sus payasadas y su gran personalidad, no hay momento aburrido a su lado. Es un gato activo y juguetón, que siempre está listo para una buena sesión de juegos. Tiene una cola muy larga y suave que siempre está moviéndose. Es un gato de tamaño mediano con un pelaje hermoso y brillante.",
        image: ["https://adopt-a-pet.s3.amazonaws.com/pet_pictures/assets/000/108/606/home/uploads_2F2f1640ad-6a9b-4410-b208-91fe9529cad2_2Fuploads_2Fda5c5d0f-c818-4a93-9042-48ea556b7903_2FIMG-20230119-WA0036_7E3_7E2.jpg"],
        arrived:"2022-02-12",
    },
    {
        name:"Luna",
        gender:"hembra",
        age:3,
        state:"adoptado",
        description:"Si lo que buscas es un gato tranquilo y relajado, este gato es perfecto para ti. Es un gato de raza pura, con un pelaje suave y sedoso que parece una nube. Es muy dulce y cariñoso, y le encanta dormir largas siestas en su cama. Le gusta que lo acaricien suavemente y ronronea muy suavemente cuando está contento. Es el compañero perfecto para alguien que busca tranquilidad y calma.",
        image:["https://img.miwuki.com/a/97G26C/250"],
        arrived:"2021-05-04",
    },
    {
        name:"Titan",
        gender:"macho",
        age:4,
        state:"albergue",
        description:"Este gato es todo un aventurero. Siempre está buscando nuevas emociones y explorando su entorno. Es un gato grande y musculoso, con un pelaje corto y brillante que lo hace lucir como un tigre. Le encanta trepar y saltar, y siempre está dispuesto a jugar. Es un gato muy activo y enérgico que siempre está listo para la acción.",
        image:["https://img.miwuki.com/a/NM9QDH/250"],
        arrived:"2022-08-11",
    },
    {
        name:"Violeta",
        gender:"hembra",
        age:1,
        state:"albergue",
        description:"Este gato es un verdadero misterio. Con su pelaje oscuro y sus ojos profundos, parece estar siempre en su propio mundo. Es tímido al principio, pero si le das tiempo y paciencia, te sorprenderá con su dulzura y afecto. Es el compañero perfecto para alguien que busca un poco de misterio en su vida.",
        image:["https://www.hogarmania.com/archivos/202010/adopcion-gatos-negros-octubre-portada-1280x720x80xX.jpg"],
        arrived:"2023-02-03",
    },
    {
        name:"Mate",
        gender:"macho",
        age:7,
        state:"albergue",
        description:"Si buscas un gato que sea el alma de la fiesta, ¡no busques más! Este gato es una bola de energía constante, siempre jugando y corriendo por todas partes. Es muy cariñoso y le encanta estar en compañía. Su pelaje suave y brillante hace que sea imposible no querer acurrucarse con él.",
        image:["https://www.huellascallejeras.com/wp-content/uploads/2023/01/Calamar-gato-en-adpcion-1-580x460.jpg"], 
        arrived:"2022-01-11",
    },
    {
        name:"Moises",
        gender:"macho",
        age:8,
        state:"albergue",
        description:"Si lo que buscas es un gato inteligente y astuto, este es el gato que necesitas. Es un gato de raza mixta con un pelaje muy llamativo. Es muy curioso y siempre está buscando nuevos desafíos. Es muy hábil y puede abrir puertas y cajones con facilidad. Es un gato muy independiente que necesita mucho espacio para moverse y explorar.",
        image:["https://adopt-a-pet.s3.amazonaws.com/pet_pictures/assets/000/105/986/home/uploads_2F92028c24-331c-480c-acd4-2a785a1fde51_2FIMG-20230210-WA0020.jpg"],
        arrived:"2023-01-01",
    },
    {
        name:"Pepe",
        gender:"macho",
        age:1,
        state:"apadrinado",
        description:"Este gato tiene una personalidad única. Es inteligente y curioso, y siempre está en busca de aventuras. Le encanta explorar cada rincón de su hogar, pero también es muy cariñoso y disfruta de los mimos. Con su pelaje suave y sus ojos brillantes, es imposible resistirse a su encanto.",
        image: ["https://www.adanabadajoz.com/wp-content/uploads/2019/01/thumbnail_P1030772-250x200.jpg"],
        arrived:"2023-01-11",
    }
]
const products = [
    {
        name:"Arenero",
        summary:"Arenero practico para comodidad de tu gato y facilidad de limpieza",
        image:["https://m.media-amazon.com/images/I/51wizNhNTuL._AC_SX466_.jpg"],
        stock:20,
        price:1200,
        discount:{
            value:10,
            active:true,
        },
        categoryId: 4
    },
    {
        name:"Caña de pescar para gatos",
        summary:"Tu michi va a amara su nuevo juguete!",
        image:["https://http2.mlstatic.com/D_NQ_NP_812449-MLA49434006019_032022-V.jpg"],
        stock:15,
        price:400,
        discount:{
            value:5,
            active:true,
        },
        categoryId: 2
    },
    {
        name:"Rascador",
        summary:"Un rascador para que tu michi se entretenga",
        image:["https://m.media-amazon.com/images/I/51zHIanNmRL.jpg"],
        stock:20,
        price:1100,
        discount:{
            value:0,
            active:false,
        },
        categoryId: 3
    },
    {
        name:"Juguete interactivo",
        summary:"Para que tu gato se mantenga activo y feliz",
        image:["https://cdn.manomano.com/juguete-interactivo-para-gatos-de-interior-con-resorte-giratorio-electrico-360-e-inteligencia-de-bola-de-campana-con-zumbador-P-24577527-67692783_1.jpg"],
        stock:10,
        price:950,
        discount:{
            value:0,
            active:false,
        },
        categoryId: 2
    },
    {
        name:"Comedero dispenser",
        summary:"Mantiene el agua y la comida justa para que tu michi tenga siempre a disposición",
        image:["https://http2.mlstatic.com/D_NQ_NP_705094-MLU53245119194_012023-O.jpg"],
        stock:5,
        price:1190,
        discount:{
            value:0,
            active:false,
        },
        categoryId: 1
    },
    {
        name:"Mochila transportadora",
        summary:`Increíble bolsa de transporte para tus mascotas, es útil en variedad de mascotas pequeñas como perros, gatos, conejos, aves, hurones, etc.

        Medidas: Altura: 42cm, Largo 31cm y 18cm de ancho, Peso Maximo: 9kg`,
        image:["https://http2.mlstatic.com/D_NQ_NP_652040-MLU51693564798_092022-O.webp"],
        stock:10,
        price:1750,
        discount:{
            value:5,
            active:true,
        },
        categoryId: 1
    },
    {
        name:"Pretal arnes",
        summary:`INCLUYE CORREA

        VARIOS COLORES DISPONIBLES
        
        TALLE S - MEDIDA DE PECHO 35cm. - MEDIDA CORREA 1,5 mts.`,
        image:["https://http2.mlstatic.com/D_NQ_NP_757485-MLU50364959629_062022-O.webp"],
        stock:25,
        price:395,
        discount:{
            value:0,
            active:false,
        },categoryId: 2
    },
    {
        name:"Kit bandeja + plato + palita",
        summary:`KIT DE ARENERO + PALA + 2 PLATOS (AGUA Y COMIDA) PARA GATO

        COLORES DISPONIBLES: AZUL - ROJO
        
        MEDIDAS:
        *BANDEJA: 41 x 33 cm
        *2 PLATPS DE 11 x 3 cm
        `,
        image:["https://http2.mlstatic.com/D_NQ_NP_780167-MLU50364706146_062022-O.webp"],
        stock:15,
        price:450,
        discount:{
            value:0,
            active:false,
        },categoryId: 4
    },
    {
        name:"Piedritas sanitarias",
        summary:`Golden Breeze, bolsa de 20 kg`,
        image:["https://http2.mlstatic.com/D_NQ_NP_952647-MLU41111544000_032020-O.webp"],
        stock:10,
        price:740,
        discount:{
            value:0,
            active:false,
        },categoryId: 4
    },
    {
        name:"Equilibrio gato adulto",
        summary:`Alimento balanceado para gatos adultos con regalo especial`,
        image:["https://http2.mlstatic.com/D_NQ_NP_705495-MLU51178845096_082022-O.webp"],
        stock:5,
        price:1980,
        discount:{
            value:0,
            active:false,
        },categoryId: 5
    },
    {
        name:"Collar antipulgas",
        summary:`Mantene a tu michi libre de pulgas durante 3 meses con Dominal`,
        image:["https://http2.mlstatic.com/D_NQ_NP_686936-MLU31245705044_062019-O.webp"],
        stock:25,
        price:475,
        discount:{
            value:2,
            active:true,
        },categoryId: 4
    },
    {
        name:"Rascador de 5 niveles",
        summary:"El castillo para los reyes de la casa",
        image:["https://http2.mlstatic.com/D_NQ_NP_999829-MLU50818890633_072022-O.webp"],
        stock:3,
        price:3499,
        discount:{
            value:5,
            active:true,
        },categoryId:[3]
    }
]
const categories = [
    {
       name: "alimento"
    },
    {
        name: "juguetes"
     },
     {
        name: "rascadores"
     },
     {
        name: "higiene"
     },
     {
        name: "piedritas"
     }
]
const orders = [
    {
        list:[1,5,9],
        delivery:"entregado",
        status:"activo",
    },
    {
        list:[2,4,3],
        delivery:"proceso",
        status:"activo",
    },
    {
        list:[10,7,9],
        delivery:"entregado",
        status:"activo",
    },
    {
        list:[4,5,6],
        delivery:"proceso",
        status:"activo",
    },
    {
        list:[6,7],
        delivery:"entregado",
        status:"activo",
    },
    {
        list:[2,8,12],
        delivery:"proceso",
        status:"activo",
    },
    {
        list:[1,9,4],
        delivery:"entregado",
        status:"activo",
    },
    {
        list:[1],
        delivery:"cancelado",
        status:"cancelado",
    },
    {
        list:[2],
        delivery:"entregado",
        status:"activo",
    },
    {
        list:[6,1,7,5,9],
        delivery:"entregado",
        status:"activo",
    }
]
const users = [
    {
        name: "Super",
        password: "superAdmin",
        lastName: "Adminstrador",
        email : "superadmin@gmail.com",
        phoneNumber : 598097493998,
        active:true,
        sponsor: [],
        image: "",
        order : [],
        status : "superAdmin" 
    }
]
/* const entries = [] */

export const createData = async () => {
    try {
      await User.create(users[0]);
      await Cat.bulkCreate(cats)
      await Category.bulkCreate(categories)
      await Product.bulkCreate(products)
      await Order.bulkCreate(orders)
  
      
    } catch (error) {
      console.error(error.message);
    }
  };