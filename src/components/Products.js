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
    const item = e.target.id;
    const cartContent = Object.keys(cart);

    if (cartContent.includes(item)) {
      console.log("not included")
      const newVal = cart[item] + 1;
      setCart({...cart, [item]: newVal});
    };

    if (!cartContent.includes(item)) {
      setCart({...cart, [item]: 1});
    };

    console.log("cart content: ", cart)
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
                          id={s.name}
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
          </Col>
          <Col>
            <h3>Check Out</h3>
          </Col>
        </Row>
      </Container>
  );
}

export default Products;
