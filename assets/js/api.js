//call api then invoke loading the website
fetch('https://fakestoreapi.com/products').then((response) => {
    return response.json();
}).then(data => {
    console.log(data);
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
        container.setAttribute('id',item.id);
        prodList.append(container);

        let imageHolder = document.createElement('figure');
        imageHolder.classList.add('prodImageContainer')
        let image = document.createElement('img');
        image.src = item.image;
        imageHolder.append(image);

        let titleHolder = document.createElement('div');
        titleHolder.classList.add('titleContainer')
        let title = document.createElement('h3');
        title.innerText = item.title;
        titleHolder.append(title);

        let priceHolder = document.createElement('div');
        priceHolder.classList.add('priceContainer')
        let price = document.createElement('h3');
        price.innerText = '£' + item.price;
        priceHolder.append(price);
        
        // let cat = document.createElement('h3');
        // cat.innerText = item.category;
        // let rating = document.createElement('h3');
        // rating.innerText = item.rating.rate;
        // let reviews = document.createElement('h3');
        // reviews.innerText = item.rating.count;
        // let desc = document.createElement('p');
        // desc.innerText = item.description;

        
        // image.setAttribute('width','200px');
        container.append(imageHolder, titleHolder, priceHolder);
    })
}