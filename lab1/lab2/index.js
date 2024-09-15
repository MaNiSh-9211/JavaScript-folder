// Define an array of items with their original prices and discount percentages
const items = [
    { name: 'Item 1', price: 100, discount: 20 }, // 20% discount
    { name: 'Item 2', price: 150, discount: 10 }, // 10% discount
    { name: 'Item 3', price: 200, discount: 25 }, // 25% discount
    { name: 'Item 4', price: 250, discount: 5 }   // 5% discount
];
function calculateDiscountedPrice(price, discount) {
    return price - (price * (discount / 100));
}
function displayItems(items) {
    const itemList = document.getElementById('item-list');

    items.forEach(item => {
        const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
        
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}: Original Price $${item.price.toFixed(2)}, Discount ${item.discount}%, Discounted Price $${discountedPrice.toFixed(2)}`;

        itemList.appendChild(listItem);
    });
}

displayItems(items);
