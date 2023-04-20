// @ts-nocheck
import { User } from "../models/User"
import { Cat } from "../models/Cat"
import { Product } from "../models/Product"
import { Category } from "../models/Category"
import { Order } from "../models/Order"
import bcrypt from 'bcrypt'

const cats = [
    {
        name:"Tom",
        gender:"macho",
        age:1,
        state:"albergue",
        status:true,
        sponsorId: [1],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://www.huellascallejeras.com/wp-content/uploads/2020/10/jose-gato-adulto-en-adopcion-1-580x460.jpg"],
        arrived:"2023-01-02",
        chip:true,
        updatedAt:"2023-02-20"
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
    },
    {
        name:"Kolke",
        gender:"macho",
        age:14,
        state:"albergue",
        status:true,
        sponsorId: [2],
        description:`Hola, mi nombre es Kolke y tengo 14 años.He estado lidiando con algunos problemas de salud últimamente, y aunque me siento un poco asustado y confundido, estoy agradecido por el amor y la dedicación que están mostrando mis Humanos.
        Necesito apadrinadores para ayudar con mis gastos médicos y cuidados especiales. 
        Espero que puedan encontrar algunas personas amables que quieran ayudarme en este difícil momento.
        Aunque me siento un poco débil en este momento, sigo siendo el mismo gato amoroso y curioso que solía ser. 
        Me gusta pasar tiempo explorando mi entorno y jugando con mis juguetes favoritos. Siempre he sido un gato sociable y disfruto la compañía de las personas, así como de otros gatos.
        Espero que pronto pueda recuperar mi salud y volver a mi vida normal. Agradezco todo el amor y la atención que estoy recibiendo y sé que con el tiempo, volveré a ser un gato feliz y saludable.`,
        image:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSNZKQG-inPO3Xhj5--RM22VhmUfJpb8XcpL2rNNr74-rTUwrmQiNWlj4bTfY-1--5jc&usqp=CAU"],
        arrived:"2023-01-02",
    },
{
        name:"Esponjosin",
        gender:"macho",
        age:10,
        state:"adoptado",
        status:false,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCiVMc59UpwcpPXrQq3ZdRawNHjCxKGHvddQ&usqp=CAU"],
        arrived:"2022-01-02",
        updatedAt:"2023-02-20"
    },
{
        name:"Polvoron",
        gender:"macho",
        age:2,
        state:"adoptado",
        status:false,
        sponsorId: [],
        description:"Ronroneaba en la calle, cuando una familia me adoptó. Ahora duermo en una cama caliente, tengo comida y amor. Soy el gato Polvorón y mi vida ha cambiado para siempre. ¡Miau!",
        image:["https://viapais.com.ar/resizer/QZ8Edfz8zjFntSGysQopdzhitFI=/980x640/smart/filters:quality(75):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/IGTS4BKBYBD7NKLZOLJ7BBKJUA.png"],
        arrived:"2022-05-02",
        updatedAt:"2022-06-15"
    },
{
        name:"Gruñon",
        gender:"macho",
        age:6,
        state:"adoptado",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://apollo-virginia.akamaized.net/v1/files/kkf6kwc5tq6g1-CO/image;s=272x0"],
        arrived:"2021-01-02",
        updatedAt:"2022-02-20"
    },
{
        name:"Nube",
        gender:"hembra",
        age:9,
        state:"adoptado",
        status:false,
        sponsorId: [],
        description:"Abandonada en la calle, Nube buscaba cariño. Una familia la rescató, dándole amor y un hogar. Ahora ronronea feliz, agradecida por la segunda oportunidad que la vida le brindó.Miau!! ",
        image:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAdaWi3fy6jP1yg0cEcx5ImajTTaNQGSoM-aKyAn6QGFDs9d_Mo0470txoZLUxuJxwcQ&usqp=CAU"],
        arrived:"2022-01-02",
        updatedAt:"2022-02-20"
    },
{
        name:"Luna",
        gender:"hembra",
        age:1,
        state:"adoptado",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://img.miwuki.com/a/H2LGYL/250"],
        arrived:"2022-01-02",
        updatedAt:"2023-02-20"
    },
{
        name:"Garfield",
        gender:"macho",
        age:7,
        state:"adoptado",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://bogota.gov.co/sites/default/files/styles/1050px/public/2022-11/adopcion-de-gatos.jpg"],
        arrived:"2022-01-02",
        updatedAt:"2023-02-20"
    },
{
        name:"Bella",
        gender:"hembra",
        age:10,
        state:"adoptado",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://pbs.twimg.com/media/FrjEWgXWYAE-0zJ?format=jpg&name=large"],
        arrived:"2021-01-02",
        updatedAt:"2022-08-20"
    },
{
        name:"Felix",
        gender:"macho",
        age:11,
        state:"adoptado",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://static.wixstatic.com/media/6c94ec_5be1e29a0c784ea08ff416491b1be7d0~mv2.jpeg/v1/fill/w_560,h_498,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6c94ec_5be1e29a0c784ea08ff416491b1be7d0~mv2.jpeg"],
        arrived:"2019-01-02",
        updatedAt:"2023-03-20"
    },
{
        name:"Shadow",
        gender:"macho",
        age:0,
        state:"albergue",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://www.purina.es/sites/default/files/2021-12/que-saber-antes-de-adoptar-un-gato_0T.jpg"],
        arrived:"2023-03-02",
        updatedAt:"2023-03-20"
    },
{
        name:"Ginger",
        gender:"macho",
        age:13,
        state:"adoptado",
        status:true,
        sponsorId: [2],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://www.terapiafelina.com/wp-content/uploads/2021/12/Ani_Togor-13-scaled.jpg"],
        arrived:"2018-01-02",
        updatedAt:"2022-10-10"
    },
{
        name:"Tigger",
        gender:"macho",
        age:3,
        state:"adoptado",
        status:true,
        sponsorId: [2],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://img.miwuki.com/a/M9KC7/250"],
        arrived:"2022-01-02",
        updatedAt:"2022-10-10"
    },
{
        name:"Misty",
        gender:"hembra",
        age:16,
        state:"adoptado",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://tecolotito.elsiglodetorreon.com.mx/i/2022/12/1625603.jpeg"],
        arrived:"2020-01-02",
        updatedAt:"2023-04-10"
    },
{
        name:"Muffin",
        gender:"hembra",
        age:1,
        state:"albergue",
        status:true,
        sponsorId: [4],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://lanoticia.com/wp-content/uploads/2022/03/quieres-adoptar-gato-como.jpg"],
        arrived:"2020-01-02",
    },
{
        name:"Salem",
        gender:"macho",
        age:8,
        state:"albergue",
        status:true,
        sponsorId: [4],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://www.huellascallejeras.com/wp-content/uploads/2020/10/jose-gato-adulto-en-adopcion-1-580x460.jpg"],
        arrived:"2019-01-02",
    },
{
        name:"Mittens",
        gender:"macho",
        age:9,
        state:"albergue",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://static.wixstatic.com/media/6c94ec_402dc2854a6146dabe33cebf07df6f21~mv2.jpeg/v1/fill/w_560,h_498,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6c94ec_402dc2854a6146dabe33cebf07df6f21~mv2.jpeg"],
        arrived:"2015-01-02",
    },
{
        name:"Nala",
        gender:"hembra",
        age:4,
        state:"albergue",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://fundaciontrifolium.org/wp-content/uploads/2019/04/03745-ARITZ-PPAL-min.jpg"],
        arrived:"2022-12-02",
    },
{
        name:"Midnight",
        gender:"macho",
        age:6,
        state:"albergue",
        status:true,
        sponsorId: [5],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://static.wixstatic.com/media/6c94ec_2811c2006379418eb12db20f8afe7c87~mv2.jpg/v1/fill/w_560,h_498,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6c94ec_2811c2006379418eb12db20f8afe7c87~mv2.jpg"],
        arrived:"2020-12-20",
    },
{
        name:"Puddles",
        gender:"macho",
        age:12,
        state:"albergue",
        status:true,
        sponsorId: [6],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://fundaciontrifolium.org/wp-content/uploads/2019/04/03742-AMELIE-PPAL-min.jpg"],
        arrived:"2022-8-25",
    },
{
        name:"Michineitor",
        gender:"macho",
        age:2,
        state:"albergue",
        status:true,
        sponsorId: [],
        description:"Este gato es un verdadero caballero. Con su pelaje brillante y su porte elegante, sabe cómo atraer todas las miradas. Es un gato de raza mixta con una personalidad única. Le encanta jugar con su pelota de lana y ronronea muy fuerte cuando lo acarician detrás de las orejas. Es un compañero leal y amigable que siempre estará a tu lado.",
        image:["https://static.wixstatic.com/media/6c94ec_3a13390cf7444c979ba6b834aa758505~mv2.jpeg/v1/fill/w_560,h_498,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6c94ec_3a13390cf7444c979ba6b834aa758505~mv2.jpeg"],
        arrived:"2023-04-12",
    },
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
        },categoryId: [4]
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
    },
    {
        name:"Pipeta Antipulgas Dominal",
        summary:"Pipeta Antipulgas Dominal Gato Mas De 4kg, para que no se te llene de pulgas el crustaceo",
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_727307-MLU28469499811_102018-F.webp"],
        stock:281,
        price:231,
        discount:{
            value:0,
            active:false,
        },categoryId:[4]
    },
    {
        name:"Dispensador De Alimento",
        summary:"Producto: Dispensador De Alimento Para Mascotas Gatos Perros Descripción:Dispensador de comida para mascotas.Capacidad: 3,5 Litros.Material plástico.Sistema de alimentación por gravedad.Fácil de limpiar.Gran capacidad para almacenar el alimento.Con tapa para mayor practicidad.Medidas: Alto 32 cm x Ancho 17 cm.¡Idal para que tu mascota coma a sus horas!",
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_986875-MLU53664019094_022023-F.webp"],
        stock:10,
        price:399,
        discount:{
            value:5,
            active:true,
        },categoryId:[1]
    },
    {
        name:"Eliminador De Olores",
        summary:`ELIMINADOR DE OLORES PARA EL HOGAR

        PERROS &GATOS
        Ideal para limpieza de pisos y superficies en contactos con su mascota.
        Desinfecta y elimina hongos, virus, bacterias, y malos olores, dejando una delicada fragancia.
        Se diluye el producto en 2 partes de agua y no necesita enjuague.
        Marca PERFUMOL
        Botella de 1.5 lit.`,
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_747391-MLU42826251187_072020-F.webp"],
        stock:50,
        price:290,
        discount:{
            value:0,
            active:false,
        },categoryId:[4]
    },
    {
        name:"Localizador Rastreador Gps",
        summary:`Especificaciones:
        - Tamaño: 70mm*20mm*37mm
        - Batería de Litio recargable
        - Aplicación gratuita para Android y iPhone
        
        Funciones:
        - Localización en tiempo real por celular (SMS), aplicación gratuita (Smartphone) y plataforma WEB. La ubicació es dada por satélites (GPS) por triangulación de antena (LBS), el cual dará una ubicación aproximada o por WIFI.
        - Guarda el histórico de ruta
        - Geofence; delimita un perímetro, si es atravesado, envía SMS con la alerta.
        - Alarma de baja batería.`,
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_823183-MLU51883654908_102022-F.webp"],
        stock:5,
        price:3900,
        discount:{
            value:7,
            active:true,
        },categoryId:[6]
    },
    {
        name:"Bolas Mágicas Para Pelo",
        summary:`6 BOLAS DE VELCRO RÍGIDO QUE CON LA FRICCION DEL LAVARROPAS RECOGE PELO Y PELUSA QUE ESTÉ A SU ALCANCE DENTRO DE CADA LAVADO.
        Especificaciones:
        Material De Nylon + plástico
        La cantidad de 6 uds
        Color del artículo Rosa + verde
        Tamaño 3,7x3,7x3,7 cm
        Peso neto 0.036kg/1,3 oz
        Paquete incluye: 6 bolas para la lavadora`,
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_643722-MLU43331640034_092020-F.webp"],
        stock:200,
        price:349,
        discount:{
            value:0,
            active:false,
        },categoryId:[6]
    },
    {
        name:"Pate Hill's",
        summary:`6 Latas de 156 g
        Pate recetado y recomendado por veterinarios exclusivamente.
        
        Para el apoyo nutricional de las mascotas que se recuperan de una enfermedad grave, accidente y cirugía. Los
        gatos y los perros pueden sufrir cambios metabólicos significativos cuando se recuperan de una enfermedad, lesión o cirugía graves. Durante estas condiciones estresantes, el cuerpo tiene el desafío de mantener fuertes defensas naturales y una masa corporal magra de repuesto, lo que hace que sea aún más importante alimentar los alimentos adecuados. Los gatos y los perros necesitan energía y nutrientes adicionales, en una forma apetitosa, para alentar el proceso de recuperación.` ,
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_735218-MLU32903825732_112019-F.webp"],
        stock:930,
        price:2135,
        discount:{
            value:5,
            active:true,
        },categoryId:[1]
    },
    {
        name:"Fuente Bebedero",
        summary:`Fuente dispensadora de agua para gatos con filtro de carbón

        Fomentar una buena hidratación en tu gato es fundamental para mantener una buena salud.`,
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_802220-MLU49295653029_032022-F.webp","https://http2.mlstatic.com/D_NQ_NP_2X_976822-MLU49295489978_032022-F.webp"],
        stock:20,
        price:2999,
        discount:{
            value:4,
            active:true,
        },categoryId:[1]
    },
    {
        name:"Colchoneta Almohadón Ferplast",
        summary:"la mejor colchoneta para tus gatos o perros para que duerman comodos y puedan descansar ",
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_903688-MLU50628870444_072022-F.webp"],
        stock:3,
        price:644,
        discount:{
            value:0,
            active:false,
        },categoryId:[6]
    },
    {
        name:"Alimento Frost Super Premium",
        summary:`La selección de un alimento adecuado para tu mascota es muy importante para garantizar su crecimiento, desarrollo y salud. Con esta opción de Frost podrás cubrir las necesidades nutricionales y energéticas de tu gato. contenido de 8.5KG
        Recomendado para gato adulto.
        Comida seca.
        Sabor: mix.
        Sabor y nutrición completa para tu mascota.`,
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_863077-MLA53969785209_022023-F.webp"],
        stock:43,
        price:1970,
        discount:{
            value:0,
            active:false,
        },categoryId:[1]
    },
    {
        name:"Dispensador De Bolsas Para Desechos",
        summary:"Rollos de 15 bolsas cada uno",
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_825532-MLU43231144827_082020-F.webp"],
        stock:100,
        price:149,
        discount:{
            value:0,
            active:false,
        },categoryId:[4]
    },
    {
        name:"Plato Doble Con Portabotella",
        summary:"Un plato doble con portabotella, entrada de portabotella standar",
        image:["https://http2.mlstatic.com/D_NQ_NP_2X_640610-MLU49995468789_052022-F.webp","https://http2.mlstatic.com/D_NQ_NP_2X_958000-MLU49995485696_052022-F.webp","https://http2.mlstatic.com/D_NQ_NP_2X_932163-MLU49995572263_052022-F.webp"],
        stock:4000,
        price:199,
        discount:{
            value:2,
            active:true,
        },categoryId:[1]
    },
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
     },
     {
        name:"accesorios"
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
        order : [],
        address: "asdasd",
        status : "superAdmin" 
    },
    {
        name: "Juan",
        password: "superAdmin",
        lastName: "Pérez",
        email: "juan@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "María",
        password: "superAdmin",
        lastName: "Gómez",
        email: "maria@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "Pedro",
        password: "superAdmin",
        lastName: "López",
        email: "pedro@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "Luisa",
        password: "superAdmin",
        lastName: "Fernández",
        email: "luisa@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "Miguel",
        password: "superAdmin",
        lastName: "García",
        email: "miguel@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "Ana",
        password: "superAdmin",
        lastName: "Martínez",
        email: "ana@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "José",
        password: "superAdmin",
        lastName: "Díaz",
        email: "jose@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "Lucía",
        password: "superAdmin",
        lastName: "Ruiz",
        email: "lucia@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "Jorge",
        password: "superAdmin",
        lastName: "González",
        email: "jorge@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "Carla",
        password: "superAdmin",
        lastName: "Sánchez",
        email: "carla@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "user"
      },
      {
        name: "Ana",
        password: "superAdmin",
        lastName: "Martínez",
        email: "anaa@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "admin"
      },
      {
        name: "José",
        password: "superAdmin",
        lastName: "Díaz",
        email: "josee@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "admin"
      },
      {
        name: "Lucía",
        password: "superAdmin",
        lastName: "Ruiz",
        email: "luciaa@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "admin"
      },
      {
        name: "Jorge",
        password: "superAdmin",
        lastName: "González",
        email: "jorgee@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "admin"
      },
      {
        name: "Carla",
        password: "superAdmin",
        lastName: "Sánchez",
        email: "carlaa@gmail.com",
        phoneNumber: 598097493998,
        active: true,
        sponsor: [],
        order: [],
        status: "admin"
      },

]
/* const entries = [] */

export const createData = async () => {
    try {

        for (const user of users) {
            const password = user.password;
            const passHash = await bcrypt.hash(password, 10);
            await User.create({ ...user, password: passHash });
          }
     
     
      await Cat.bulkCreate(cats)
      await Category.bulkCreate(categories)
      await Product.bulkCreate(products)
      await Order.bulkCreate(orders)
  
      
    } catch (error) {
      console.error(error.message);
    }
  };