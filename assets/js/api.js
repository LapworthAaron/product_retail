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
        container.classList.add('prod_container')
        container.setAttribute('id',item.id);
        prodList.append(container);

        let title = document.createElement('h2');
        title.innerText = item.title;
        let price = document.createElement('h3');
        price.innerText = item.price;
        let cat = document.createElement('h3');
        cat.innerText = item.category;
        let rating = document.createElement('h3');
        rating.innerText = item.rating.rate;
        let reviews = document.createElement('h3');
        reviews.innerText = item.rating.count;
        let desc = document.createElement('p');
        desc.innerText = item.description;
        let image = document.createElement('img');
        image.src = item.image;
        image.setAttribute('width','200px');
        container.append(title, price, rating, reviews, cat, desc, image);
    })
}