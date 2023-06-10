import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { useGetProductsQuery } from "../store/slices/productsApiSlice.js";

const HomeScreen = () => {
  //rename data to products
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <div>
      {/* check for loading and error */}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error?.data?.message || error.error}</h2>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
