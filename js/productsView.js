import { conectApi } from "./conect.js";

const list = document.querySelector('.content__products');

export default function createBox(title, price, image, description) {
    
    const formattedPrice = price.toLocaleString('es-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    
    const product = document.createElement('div');
    product.className = 'box__product';
    product.innerHTML = `
        <div>
            <h3>${title}</h3>
            <p>${formattedPrice}</p>
        </div>
        <img src="${image}" alt="">
        <p>${description}</p>
    `;

    return product;
}

async function listProducts() {
    try {
        const listApi = await conectApi.listProducts();
        
        listApi.forEach(product => {
            const productCard = createBox (
                product.title,
                product.price,
                product.image,
                product.description
            );
            list.appendChild(productCard);
        });
    }catch (error){
        console.error("Error listing products:", error)
        list.innerHTML=`<h2 class="mensaje__titulo">A problem with the connection has occurred.<h2>`;
    }

}

listProducts();