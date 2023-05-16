//call api then invoke loading the website
// Get the modal
var modal = document.getElementById("modal_container");

// Get the <span> element that closes the modal
var span = document.getElementById("modal_close");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    closeModal();
}

document.addEventListener('keyup', (event) => {
    if (event.key === "Escape") closeModal();
})
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

fetch('https://fakestoreapi.com/products').then((response) => {
    return response.json();
}).then(data => {
    loadPage(data);
}).catch((err) => {
    console.log('api call failed', err);
});

//load the api data to the page in a flex format
const loadPage = (data) => {
    let prodList = document.getElementById('product_list');
    data.forEach(item => {
        let container = document.createElement('div');
        container.classList.add('prod_container');
        container.setAttribute('data_id', item.id);
        prodList.append(container);
        container.addEventListener('click', (event) => {
            loadModal(event.target.attributes.data_id.value, data);
            modal.style.visibility = "visible";    
        }, false);

        let imageHolder = document.createElement('figure');
        imageHolder.classList.add('prodImageContainer')
        let image = document.createElement('img');
        image.src = item.image;
        image.setAttribute('data_id', item.id);
        imageHolder.append(image);

        let titleHolder = document.createElement('div');
        titleHolder.classList.add('titleContainer')
        let title = document.createElement('h3');
        title.innerText = item.title;
        title.setAttribute('data_id', item.id);
        titleHolder.append(title);

        let priceHolder = document.createElement('div');
        priceHolder.classList.add('priceContainer')
        let price = document.createElement('h3');
        price.innerText = '£' + item.price;
        price.setAttribute('data_id', item.id);
        priceHolder.append(price);

        container.append(imageHolder, titleHolder, priceHolder);
    })
}

//get the api data for the product clicked and load into modal
//using grid format
const loadModal = (prodId, apiData) => {
    let modalImage = document.getElementById("modal_image");
    const product = apiData[apiData.findIndex(item => item.id == prodId)];
    modalImage.src = product.image;

    let modalTitleContainer = document.getElementById("modal_heading");

    let modalTitle = document.createElement('h3');
    modalTitle.innerText = product.title;
    modalTitle.setAttribute('id', 'product_title');

    let secondLine = document.createElement('div');
    secondLine.setAttribute('id', 'product_price_rating');
    let price = document.createElement('h4');
    price.innerText = '£' + product.price;

    let rating = document.createElement('h4');
    rating.innerText = `${product.rating.rate} (${product.rating.count})`;
    secondLine.append(price, rating);

    modalTitleContainer.append(modalTitle, secondLine);

    let modalDesceContainer = document.getElementById('modal_footer');

    let desc = document.createElement('p');
    desc.innerText = product.description;
    desc.setAttribute('id', 'product_desc');

    modalDesceContainer.append(desc);
}

//function to delete modal elements so the modal starts afresh each time
//this gets called 3 times, so more efficient this way
const closeModal = () => {
    const modalList = ['product_title','product_price_rating','product_desc']
    modalList.forEach(item => {
        let element = document.getElementById(item);
        element.remove();
    });
    modal.style.visibility = "hidden";
}

