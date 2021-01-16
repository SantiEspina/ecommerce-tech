//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
const force = false;
conn.sync({ force }).then(() => {
  if(force) {
    insert(conn)
  }
  server.listen(process.env.PORT, () => {
    console.log('%s listening at = ', process.env.PORT); // eslint-disable-line no-console
  });
});

function insert (data) {
  data.query(`
INSERT INTO "categories" ("name", "createdAt", "updatedAt")
VALUES ('laptop', '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('desktop', '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('peripherals', '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('monitor', '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('sound', '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00');


INSERT INTO "products" ("name", "description", "image", "price", "stock", "createdAt", "updatedAt")
VALUES ('Notebook Lenovo S145', 'Notebook Lenovo S145 Intel Celeron N4000 15.6 4gb 1tb', 'https://http2.mlstatic.com/D_NQ_NP_677579-MLA43915970146_102020-O.webp', 48999 , 20 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('Notebook Cx Cloudbook', 'Notebook Cx Cloudbook 4gb 64gb 14 Pulgadas Windows 10 Ips', 'https://http2.mlstatic.com/D_NQ_NP_730258-MLA42306517708_062020-O.webp', 31999 , 10 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('Notebook Asus Vivobook', 'Notebook Asus Vivobook Amd Ryzen 5 8gb 512gb Ssd 15.6 Win10x', 'https://http2.mlstatic.com/D_NQ_NP_974918-MLA43636732460_092020-O.webp', 113999 , 5 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('NOTEBOOK ACER ASPIRE 3', 'CORE I5 1035G1 8GB SSD PIE 256GB 15,6" FREE DOS', 'https://http2.mlstatic.com/D_NQ_NP_965853-MLA43274311241_082020-V.webp', 99500 , 5, '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('Notebook ACER Aspire 3', 'Intel® Core® - i3-1005G1 - 4GB - 1TB - 15,6"', 'https://http2.mlstatic.com/D_NQ_NP_820610-MLA43684986003_102020-V.webp', 80100 , 8 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),



('PC AMD Athlon 3000G A320 8GB 1TB HDD GAB' , 'Procesador CPU AMD Athlon™ 3000G 3.5GHz,Motherboard: ASUS A320M-K,Disco: HDD 1TB SEAGATE BARRACUDA,Memorias: MEM DDR4 8GB 2666MHZ PNY,Gabinete: Gabinete Kit + fuente 500w' , 'https://http2.mlstatic.com/D_NQ_NP_965693-MLA44319657206_122020-W.webp' , 27781 , 5 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('PC Gamer Intel Core G5420 DDR4 8GB 1TB GeForce VGA GEFORCE GT730 2GB DDR3 MSI' , 'Microprocesador: CPU INTEL 1151 Pentium G5420 Motherboard: ASUS PRIME H310M-R R2.0 Disco Rigido: 1TB Seagate Barracuda Placa de video: VGA GEFORCE GT730 2GB DDR3 MSI Gabinete: ATX KIT Overtech + Teclado, Mouse y Parlantes Fuente: 500W ATX Over' , 'https://http2.mlstatic.com/D_NQ_NP_699322-MLA31054286103_062019-V.webp' , 36495 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('PC GAMERBOX™ Ryzen 5 3600XT B550 8GB 1TB + SSD 120GB VGA RADEON RX 5600 XT 6GB EVO GAMING ASUS TUF' , 'Procesador: CPU AMD AM4 Ryzen 5 3600XT 3gen AM4 , Motherboard: MB ASUS PRIME B550M-A/CSM , Disco: SSD 120GB + 1TB HDD , Memoria: 8GB DDR4 2666 MHZ , Placa de Video: VGA RADEON RX 5600 XT 6GB EVO GAMING ASUS TUF ,  Gabinete & fuente: Gabinete ATX Thermaltake H200 Black Tempered Glass RGB C/Fan + FUENTE AEROCOOL CYLON 700W RGB 80 PLUS BRONZE' , 'https://http2.mlstatic.com/D_NQ_NP_728284-MLA44115086005_112020-W.webp' , 120538 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00' ),
('PC Gamer AMD Destroyer Ryzen 7 3700x 16GB 3000 mhz SSD 256GB + HDD 1TB RTX 3060 ti 8GB PNY', 'Procesador CPU AMD AM4 Ryzen 7 3700X  Motherboard: MB ASUS AM4 PRIME X570  Memoria DDR4 16GB MEM DDR4 3000 MHZ XPG ADATA SPECTRIX (2x8GB)  Disco Ssd Gigabyte NVME SSD 256GB M2 , Disco Rigido: HDD 1TB , Placa de video: RTX 3060 ti 8GB GDDR6 DUAL FAN PNY ,Gabinete & Fuente: Gabinete ATX Thermaltake H330 TG Tempered Glass + 700W Cylon 80', 'https://http2.mlstatic.com/D_NQ_NP_867157-MLA43680091706_102020-V.webp', 181452 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('PC Gamer Master Piece Intel i7 10700k Z490 16GB HDD 1TB+120GB SSD RTX 3070 8GB EpiC PNY' , 'Procesador: CPU INTEL 1200 CORE I7 10700K 10 GEN , Cooler: COOLER AEROCOOL CYLON 4F -ARGB, PWM 4P , Motherboard: MB ASUS ROG STRIX Z490-F GAMING , Memoria: DDR4 16GB 2666MHZ PNY(2x8), Disco Rigido: Seagate Barracuda 1TB, Disco Solido: 120GB Gigabyte, Placa de video: VGA GEFORCE RTX 3070 8GB XLR8 EPIC-X RGB PNY , Gabinete: GABINETE ATX MSI MAG FORGE 100R + FUENTE AEROCOOL CYLON 700W' , 'https://http2.mlstatic.com/D_NQ_NP_935440-MLA44152813928_112020-W.webp' , 240094 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),


('TECLADO LOGITECH K120', 'teclado estandar ', 'https://http2.mlstatic.com/D_NQ_NP_636128-MLA31115688885_062019-V.webp', 1000 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('Teclado Gamer Trust Ziva Led Multicolor Media ES', 'Teclado de formato completo con iluminacion LED,Iluminacion LED multicolor con efecto de respiracion y fijo,Disenio robusto y contra el derrame de liquidos,12 teclas multimedia de acceso directo para un control rapido', 'https://http2.mlstatic.com/D_NQ_NP_658871-MLA44171021998_112020-V.webp', 2000, 100, '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('MOUSE LOGITECH M280 Wireless Negro', 'mouse estandar negro', 'https://http2.mlstatic.com/D_NQ_NP_823415-MLA31049555087_062019-V.webp', 2000 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('MOUSE REDRAGON M908 Impact', 'Botones Programables: 18,TIpo de agarre: Palm, Claw,Orientacion: Derecho,Cable: mallado de 1.8 m,Conexion: cableado USB,Modelo Sensor: Pixart 3327 optico,Switches: Omron/20 millones de clicks,Retroiluminacion: Si, RGB Chroma,DPI Minimo: 100,DPI Maximo: 12400,Frecuencia de respuesta: 125 Hz / 1000 Hz', 'https://http2.mlstatic.com/D_NQ_NP_607979-MLA32146296906_092019-V.webp', 4000, 100, '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('MOUSE REDRAGON M909 Impact', 'Botones Programables: 18,TIpo de agarre: Palm, Claw,Orientacion: Derecho,Cable: mallado de 1.8 m,Conexion: cableado USB,Modelo Sensor: Pixart 3327 optico,Switches: Omron/20 millones de clicks,Retroiluminacion: Si, RGB Chroma,DPI Minimo: 100,DPI Maximo: 12400,Frecuencia de respuesta: 125 Hz / 1000 Hz', 'https://http2.mlstatic.com/D_NQ_NP_660742-MLA32148991377_092019-V.webp', 4000, 100, '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),

('MONITOR PHILIPS LED 22 VGA HDMI 223V5LHSB2/55 FULL HD' , 'Tipo de panel LCD: LCD TFT, Tamanio de panel: 21,5 pulgadas / 54,6 cm , Resolucion optima: 1920 x 1080 a 60 Hz ' , 'https://http2.mlstatic.com/D_NQ_NP_842060-MLA33042651198_112019-W.webp' , 19420 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('MONITOR SAMSUNG LED 24" F350H' , '1920 x 1080 (Full HD)Resolucion , 16:09 Relacion de aspecto , 200cd/m2Brillo (Normal) , 1000:01:00 Relacion de contraste estatico , 5 msTiempo de Respuesta , 60HzRefresco' , 'https://http2.mlstatic.com/D_NQ_NP_693764-MLA31042351103_062019-W.webp' , 24699, 100, '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('MONITOR SAMSUNG LED 27" F350H' , 'Resolucion de la pantalla: 1920 x 1080 Pixeles, Tiempo de respuesta: 4 ms , Formatos graficos soportados: 1920 x 1080 , Razon de contraste (tipica): 1000:1 ' , 'https://http2.mlstatic.com/D_NQ_NP_761386-MLA41510486783_042020-W.webp' , 29599 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('MONITOR GAMER MSI 24 "OPTIX G24C4 144HZ 1MS' , 'Pantalla de juego curva (1500R) , Tasa de actualizacion de 144Hz , Tiempo de respuesta rapido de 1 ms , Tecnologia AMD FreeSync ™ Premium , angulo de vision amplio de 178 °' , 'https://http2.mlstatic.com/D_NQ_NP_943306-MLA43834563342_102020-W.webp', 52999, 100, '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),
('MONITOR SENTEY 27 MS-2711 HDMI DP Audio 165hz Curvo' , 'Tasa de refresco de 165 Hz , Pantalla anti Glare , CURBATURA R1800 , TIEMPO DE RESPUESTA  1 MS ,  REACCION AL CONTRASTE 1000:1' , 'https://http2.mlstatic.com/D_NQ_NP_950351-MLA42245242822_062020-W.webp' , 61499 , 100 , '2020-12-10 00:00:00 -3:00', '2020-12-10 00:00:00 -3:00'),


('HEADSET REDRAGON H901 SCYLLA', 'Conectores: 3.5mmm enchapados en oro,Largo del cable: 2 m,Frecuencia de respuesta: 20 – 20000 Hz,Diametro del auricular: 40 mm,Sensibilidad: 113 dB,Dimetro del driver de vibracion: 30 mm' , 'https://http2.mlstatic.com/D_NQ_NP_861715-MLA40862930598_022020-V.webp', 5000 , 100 , '2020-12-10 00:00:00 -3:00' , '2020-12-10 00:00:00 -3:00'),
('Auriculares Bluetooth Xiaomi MI True Wireless Earbuds Black' , 'Los auriculares inalambricos Xiaomi Airdots poseen microfono integrado y podes conectarlos mediante Bluetooth a un celular o a una Notebook.Poseen un estuche para transportarlos que a su vez funciona como cargador. El tiempo de carga estimado es de 2 horas y la autonomia ronda entre 4 y 5 horas,dependiendo de si estamos usando uno o dos auriculares, asi como la musica o volumen reproducidos.' , 'https://http2.mlstatic.com/D_NQ_NP_727256-MLA44122806178_112020-V.webp' , 5000 , 100 , '2020-12-10 00:00:00 -3:00' , '2020-12-10 00:00:00 -3:00'),
('Minicomponente Philco SAP500' , 'El minicomponente SAP500 de Philco posee una potencia total de 1500W PMPO (Peak Music Power Output) distribuida entre 2 parlantes.Cuenta con reproductor de CD con capacidad para 1 disco a la vez y reproduce dos tipos de formatos: CD y CD-MP3. Inclusive cuenta con radio AM/FM estereo.Con el modelo SAP500 podras conectar y reproducir toda tu musica en forma inalambrica gracias a la conexion Bluetooth. Ademas, cuenta con entrada auxiliar jack de 3,5 mm, salida para auriculares y puerto USB.' , 'https://http2.mlstatic.com/D_NQ_NP_767471-MLA43148372113_082020-V.webp' , 30000 , 100 , '2020-12-10 00:00:00 -3:00' , '2020-12-10 00:00:00 -3:00'),
('Sistema de Audio LG OK99 1800W RMS' , 'Este equipo de audio posee una potencia de 1800 watts.El LG XBOOM OK99 bombea el sonido de manera punzante y estrenduosa, a traves de sus parlantes potentes de 12 pulgadas para bajos que puedas sentir y escuchar. Hace que tu reunion familiar sea muy especial con LG XBOOM OK99. Con luces coloridas y funciones de karaoke, la fiesta estara llena de risas y alegria. Completa tu fiesta con los parlantes de Multi Color Lighting que cambian al ritmo de la musica.' , 'https://http2.mlstatic.com/D_NQ_NP_826680-MLA44233980775_122020-V.webp' , 100000, 100 , '2020-12-10 00:00:00 -3:00' , '2020-12-10 00:00:00 -3:00'),
('Sistema De Sonido Genius Gx Gaming Sw-g2.1 3000 70w' , 'Potencia total (watts): 70watts , Subwoofer: 40 W , Subwoofer: 6.5 pulgadas; 8 , Frecuencia: 35 Hz – 20K Hz  , Satelites: 15 W x 2 Satelites: 99 x 143 x 115 mm , Satelites: 60 x 170 x 154 mm' , 'https://www.codigo-binario.com.ar/wp-content/uploads/2020/09/924806-MLA43463080885_092020-150x150.jpg' , 38000 , 100 , '2020-12-10 00:00:00 -3:00' , '2020-12-10 00:00:00 -3:00');


INSERT INTO "users" ("name", "username", "email", "isAdmin", "createdAt" , "updatedAt")
VALUES ('admin', 'admin', 'santi.espina14@gmail.com', true, '2020-12-10 00:00:00 -3:00' , '2020-12-10 00:00:00 -3:00')

`);
};