import {useState, useEffect} from "react";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function Products() {
  const [query, setQuery] = useState("products");
  const [stock, setStock] = useState([]);
  const [cart, setCart] = useState({});

  const fetchData = () => {
    console.log("fetched data")
    axios.get(`http://localhost:1337/${query}`)
        .then((resp) => {
          return resp.data
        })
        .then((data) => {
          setStock(data)
        })
        .catch((err) => console.log(`error fetching data: ${err}`));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (e) => {
    e.preventDefault();
    // event returns item id
    const itemId = Number(e.target.id);
    const cartContent = Object.keys(cart);
    const itemCount = 1;

    // find the stock object in the array
    // calculate new instock value
    const stockEntry = stock.filter((s) => s.id === itemId)[0];
    const itemName = stockEntry.name;
    const stockIndex = stock.findIndex((obj) => obj.id === stockEntry.id);
    const newStockCount = stockEntry.instock - itemCount;

    if (cartContent.includes(itemName)) {
      // if the item is already in the cart
      if (itemCount <= stockEntry.instock) {
        const newVal = cart[itemName] + 1;

        setCart({...cart, [itemName]: newVal});

        stock[stockIndex] = {...stockEntry, instock: newStockCount};
        setStock(stock);
      }

    } else {
      // if the item is not in the cart
      setCart({...cart, [itemName]: 1});

      stock[stockIndex] = {...stockEntry, instock: newStockCount};
      setStock(stock);
    };
  };

  return (
      <Container>
        <Row>
          <Col>
            <h3>Offered Products</h3>
            {stock.map((s, i) =>
                (
                  <Card
                    className="products-card"
                    key={i}
                  >
                    <Card.Img variant="top" src="https://via.placeholder.com/150x100" />
                    <Card.Header>{s.name}</Card.Header>
                    <Card.Body>
                      <form
                          onSubmit={addToCart}
                          id={s.id}
                      >
                        Stock: {s.instock}<br />
                        <Button type="submit">+</Button>
                      </form>
                    </Card.Body>
                  </Card>
                )
            )}
          </Col>
          <Col>
            <h3>Cart Content</h3>
            {Object.keys(cart).map((key, i) => (
                <p key={i}>{key}: {cart[key]}</p>
            ))}
          </Col>
          <Col>
            <h3>Check Out</h3>
          </Col>
        </Row>
      </Container>
  );
}

export default Products;
