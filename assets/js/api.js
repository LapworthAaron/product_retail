//call api then invoke loading the website
// Get the modal
var modal = document.getElementById("modal_container");

// Get the <span> element that closes the modal
var span = document.getElementById("modal_close");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

document.addEventListener('keyup', (event) => {
    if (event.key === "Escape") modal.style.display = "none";
})
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

fetch('https://fakestoreapi.com/products').then((response) => {
    return response.json();
}).then(data => {
    loadPage(data);
}).catch((err) => {
    console.log('api call failed', err);
});

//load the api data to the page
const loadPage = (data) => {
    let prodList = document.getElementById('product_list');
    data.forEach(item => {
        let container = document.createElement('div');
        container.classList.add('prod_container');
        container.setAttribute('data_id', item.id);
        prodList.append(container);
        container.addEventListener('click', (event) => {
            loadModal(event.target.attributes.data_id.value, data);
            modal.style.display = "block";    
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

const loadModal = (prodId, apiData) => {
    let modalImage = document.getElementById("modal_image");
    modalImage.src = apiData[apiData.findIndex(item => item.id == prodId)].image;


     // let cat = document.createElement('h3');
    // cat.innerText = item.category;
    // let rating = document.createElement('h3');
    // rating.innerText = item.rating.rate;
    // let reviews = document.createElement('h3');
    // reviews.innerText = item.rating.count;
    // let desc = document.createElement('p');
    // desc.innerText = item.description;
}

