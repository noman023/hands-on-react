import { useState } from "react";

const ProductsList = [
  {
    id: "001",
    productName: "Keyboard",
    stock: 10,
    price: 2000,
  },
  {
    id: "002",
    productName: "Mouse",
    stock: 12,
    price: 1500,
  },
  {
    id: "003",
    productName: "Headphone",
    stock: 15,
    price: 2500,
  },
];

const TabelRow = ({
  id,
  productName,
  stock,
  price,
  quantity,
  total,
  increment,
  decrement,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{productName}</td>
      <td>{stock}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td>
        <button
          onClick={() => {
            increment(id);
          }}
          disabled={quantity === stock}
        >
          +
        </button>

        <button
          onClick={() => {
            decrement(id);
          }}
          disabled={quantity === 0}
        >
          -
        </button>
      </td>
    </tr>
  );
};

const App = () => {
  const [products, setProducts] = useState(
    ProductsList.map((item) => ({
      ...item,
      quantity: 0,
      total: 0,
    }))
  );

  const incrementQuantity = (id) => {
    setProducts(
      products.map((product) => {
        if (id === product.id && product.stock > product.quantity) {
          product.quantity++;
          product.total = product.quantity * product.price;
        }

        return product;
      })
    );
  };

  const decrementQuantity = (id) => {
    setProducts(
      products.map((product) => {
        if (id === product.id && product.quantity > 0) {
          product.quantity--;
          product.total = product.quantity * product.price;
        }

        return product;
      })
    );
  };

  const total = products.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div>
      <h1>Product List</h1>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <TabelRow
              key={product.id}
              {...product}
              increment={incrementQuantity}
              decrement={decrementQuantity}
            />
          ))}
        </tbody>
      </table>

      {total > 0 && <p>Total: {total} BDT</p>}
    </div>
  );
};

export default App;
