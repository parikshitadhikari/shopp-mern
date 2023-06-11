import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {  Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductByIdQuery } from "../store/slices/productsApiSlice.js";
import { addToCart } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const [qty, setQty] = useState(1); //default qty is 1
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: productId } = useParams();
  //const product = products.find((p) => p._id === productId); //maps through the array and finds the product i.e if product._id matches with id of the url

  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);


  const addToCartHandler=()=>{
    dispatch(addToCart({...product, qty})); //passing the product and also passing the quantity
    navigate("/cart");
  }

  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
      {/* check for loading and error */}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error?.data?.message || error.error}</h2>
      ) : (
        <>
          <Row>
            <Col md={5}>
              {/* fluid allows image to get smaller so that its responsive */}
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* show this only if product is in stock */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {/* if we have 5 in stock, the allow selection upto 5 */}
                            {[...Array(product.countInStock).keys()].map( //creates an array of length = no of stock
                            //keys() creates an array of indexes i.e [0,1,2,3,4]
                            //but index starts from 0, so we add 1 to each index, so that we get [1,2,3,4,5] as options
                              (x) => (
                                <option key={x + 1} value={x +1}>
                                  {/* we want to show 1,2,3,4,5 */}
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    {/* if no stock, then btn is disabled */}
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
