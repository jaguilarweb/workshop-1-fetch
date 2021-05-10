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
    const image = document.createElement("img");
    image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
    image.src = `${urlBase}${item.image}`;

    const title = document.createElement("h2");
    title.textContent = item.name;
    //title.style = 'font-size: 2rem';
    //title.style.fontSize = "3rem";
    title.className = "text-lg text-green-700";

    const price = document.createElement("div");
    //price.textContent = item.price;
    price.textContent = formatPrice(item.price);
    price.className = "text-gray-600";
    
    const priceAndTitle = document.createElement("div");
    priceAndTitle.className = "text-center md:text-left";
    priceAndTitle.appendChild(title);
    priceAndTitle.appendChild(price);

    const container = document.createElement('div');
    container.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
    container.append(image, priceAndTitle);
    
    todosLosItems.push(container);
  });

  // Se manipula el DOM solo una vez por todos los items
  appNode.className = "mt-10 grid grid-cols-2 gap2";
  appNode.append(...todosLosItems);

});



