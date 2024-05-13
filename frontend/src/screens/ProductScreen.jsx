import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating.jsx";
import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from "../store/slices/productsApiSlice.js";
import { addToCart } from "../store/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Meta from "../components/Meta.jsx";

const ProductScreen = () => {
  const [qty, setQty] = useState(1); //default qty is 1
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // renaming id to productId
  const { id: productId } = useParams();

  const {
    data: product,
    error,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty })); //passing the product and also passing the quantity
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setComment("");
    setRating(0);
  };

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
      ) :
          <div>
            <Meta title={product.name} />
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
                            {/* if we have 5 in stock, then allow selection upto 5 */}
                            {[...Array(product.countInStock).keys()].map(
                              //creates an array of length = no of stock
                              //keys() creates an array of indexes i.e [0,1,2,3,4]
                              //but index starts from 0, so we add 1 to each index, so that we get [1,2,3,4,5] as options
                              (x) => (
                                <option key={x + 1} value={x + 1}>
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

          {/* row for reviews */}
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <h6>No Reviews</h6>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <h6>Loading...</h6>}

                  {userInfo ? (
                    // if logged in show form else show "sign in" text
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <h6>
                      Please <Link to="/login">sign in</Link> to write a review
                    </h6>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      }
    </div>
  );
};

export default ProductScreen;
