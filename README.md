# bamazon-Store (Customer)

This is a store app similiar to an Amazon store and includes 15 items to start with.

When the app is started, it first displays all items which are available (stock_quantity > 0) in a table and then prompts the user what they would like to purchase by providing a list of those available items to scroll through. After the item is selected, it then prompts the user for a quantity they would like to purchase. 
![1-display-available-items](https://user-images.githubusercontent.com/29190130/39024718-f61b1a60-43ff-11e8-8a75-7ee7f6e2efe0.PNG)

Once the user has selected an item and quantity, they will be prompted to see if they want to purchase anything else. In the background, the selected items and quantities are stored in a cart.
![2-shop-more](https://user-images.githubusercontent.com/29190130/39024719-f62edba4-43ff-11e8-8882-3169b760c8b0.PNG)

If the user selected yes to shopping more, the available items will be displayed again and then the user will be promted again with what they would like to purchase then what quantity.
![3-display-again](https://user-images.githubusercontent.com/29190130/39024701-d2d77a1c-43ff-11e8-8b7e-5108e65935ac.PNG)

If the user selects an item and places a quantity higher than the available stock, it will give back this error that there are not enough available and what quantity can be purchased.
![4-insufficient-qty](https://user-images.githubusercontent.com/29190130/39024723-f8d0a52c-43ff-11e8-8b4f-1b26d930a7f8.PNG)

Once the user selects no on shopping more, they will be provided a total of all items purchased along with an itemized receipt with the total for each item.
![5-receipt](https://user-images.githubusercontent.com/29190130/39024724-f8e547b6-43ff-11e8-861c-5e70eade993e.PNG)

If an item has no available stock left, it will not be displayed in the available items list when the app is started or the user selects yes on shopping for more.
![6-oos](https://user-images.githubusercontent.com/29190130/39024725-f8f81c56-43ff-11e8-9362-3c3805255986.PNG)
