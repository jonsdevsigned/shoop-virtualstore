import { conectApi } from "./conect.js";

const form = document.querySelector('.form__addProduct');

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const price = `$${document.querySelector('#price').value}`;
    const image = document.querySelector('#image').value;

    try {

        const newProduct = await conectApi.addProduct(title, price, image, description);

        if(newProduct){
            window.location.href= '../index.html';
            form.reset();
        }

    } catch(error) {

        console.error('Error adding product:', error);
        alert('Could not add the product');

    }
});