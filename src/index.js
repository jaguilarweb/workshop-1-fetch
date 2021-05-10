/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const urlBase = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');

const formatPrice = (price) => {

  // API Internationalization
  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: "USD",
  }).format(price)

  return newPrice
}; 

//web api fetch

/* Pasos para usar fetch:
1.- Conectarnos al servidor
2.- Procesar la respuesta y convertirla en Json
3.- JSON -> Data --> renderizar info al browser */

//*TODO pasar este código a async/await
fetch(`${urlBase}/api/avo`)
.then(respuesta => respuesta.json())
.then((responseJson) => {
  //Agregar este arreglo en la memoria de Js no en el DOM
  const todosLosItems = [];
  responseJson.data.forEach((item) => {

    //Crear Imagen, titulo y precio
    const imagen = document.createElement("img");
    imagen.src = `${urlBase}${item.image}`;

    const title = document.createElement("h2");
    title.textContent = item.name;
    //title.style = 'font-size: 2rem';
    //title.style.fontSize = "3rem";
    title.className = "text-2xl text-green-600";

    const price = document.createElement("div");
    //price.textContent = item.price;
    price.textContent = formatPrice(item.price);
    price.className = "text-xl";
    

    const container = document.createElement('div');
    container.append(imagen, title, price);
    
    todosLosItems.push(container);
  });

  // Se manipula el DOM solo una vez por todos los items
  appNode.className = "mt-10 grid grid-cols-2 gap2";
  appNode.append(...todosLosItems);

});



