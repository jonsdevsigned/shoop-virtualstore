async function listProducts() {
    const conectApi = await fetch('https://fakestoreapi.com/products?limit=5');
    const apiProducts = await conectApi.json();
   
    const localProducts = JSON.parse(localStorage.getItem('products')) || [];

    return [...apiProducts, ...localProducts];
}

async function addProduct(title, price, image, description, id) {
    try {
        const newProduct = {title, price, image, description, id};
    
        const conect = await fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(newProduct)
        });

        if(!conect.ok){
            throw new Error('An error occurred while sending the video');
        }
        
        const createdProduct = await conect.json();
        console.log('Add product:', createdProduct);

        return createdProduct;
    } catch(error) {
        console.error('Error adding product:', error)
    }
    
}

export const conectApi = {
    listProducts, addProduct
}