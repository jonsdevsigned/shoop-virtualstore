const form = document.querySelector('.form__addProduct');

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const price = `$${parseFloat(document.querySelector('#price').value)}`;
    const image = document.querySelector('#image').value;

    const newProduct = {
        id: Date.now(),
        title,
        price,
        image,
        description
    };
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    console.log('Producto agregado:', newProduct);
    alert('Producto agregado exitosamente!');

    form.reset();
    window.location.href= '/index.html';
});