import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import axios from "axios";

const HomeScreen = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      //data = await axios.get("/api/products").data;
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []); //[] means it will run only once i.e when page loads
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
