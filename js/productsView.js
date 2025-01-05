import { conectApi } from "./conect.js";

const list = document.querySelector('.content__products');

export default function createBox(title, price, image, description, id) {
    
    const formattedPrice = price.toLocaleString('es-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    
    const product = document.createElement('div');
    product.className = 'box__product';
    product.innerHTML = `
        <div>
            <h3>${title}</h3>
            <p>${formattedPrice}</p>
        </div>
        <img src="${image}" alt="">
        <div> 
            <p>${description}</p>
            <i class="fa-solid fa-trash-can fa-xl delete-btn" data-id="${id}""></i>
        </div>
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
                product.description,
                product.id
            );
            list.appendChild(productCard);
        });
    }catch (error){
        console.error("Error listing products:", error)
        list.innerHTML=`<h2 class="mensaje__titulo">A problem with the connection has occurred.<h2>`;
    }

    function deleteProduct(productId) {
        // Obtener los productos del LocalStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        // Filtrar los productos que no tengan el ID del producto a eliminar
        const updatedProducts = products.filter(product => product.id !== productId);
        // Actualizar el LocalStorage
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        
        list.innerHTML = '';updatedProducts.forEach(product => {
            list.appendChild(createBox(product.title, product.price, product.image, product.description, product.id));
        });

        location.reload();
    }
    
    // Escuchar eventos en el contenedor de productos
    list.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const productId = parseInt(event.target.dataset.id); // Leer el id desde data-id
            deleteProduct(productId); // Llamar a la función para eliminar
        }
    });

}

listProducts();