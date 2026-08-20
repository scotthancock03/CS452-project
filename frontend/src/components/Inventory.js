const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 25,
    price: 19.99
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Electronics",
    quantity: 12,
    price: 74.99
  },
  {
    id: 3,
    name: "Office Chair",
    category: "Furniture",
    quantity: 8,
    price: 149.99
  },
  {
    id: 4,
    name: "Notebook",
    category: "Office Supplies",
    quantity: 50,
    price: 4.99
  },
  {
    id: 5,
    name: "Desk Lamp",
    category: "Furniture",
    quantity: 6,
    price: 29.99
  },
  {
    id: 6,
    name: "USB-C Cable",
    category: "Electronics",
    quantity: 3,
    price: 12.99
  },
  {
    id: 7,
    name: "Water Bottle",
    category: "Accessories",
    quantity: 32,
    price: 15.99
  },
  {
    id: 8,
    name: "Backpack",
    category: "Accessories",
    quantity: 10,
    price: 49.99
  }
];

// The list of Products Currently In Stock.
function Inventory() {
    return (
        <div className='inventory'>
        {products.map((product) => {
          const id = product.id
          const name = product.name
          const category = product.category
          const quantity = product.quantity
          const price = product.price
          
          return (
            // Representing one item in inventory to make an entire list of items
              <div className='product-card' key={id}>
                <h4>{name}</h4>
                <p>Category: {category}</p>
                <p>Quantity: {quantity}</p>
                <p>Price: {price}</p>
              </div> 
          )
        })}
        </div>
    )
}

export default Inventory