import {Link, useNavigate} from 'react-router-dom'
import { Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../store/slices/cartSlice'

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const addToCartHandler = async(product, qty)=>{
        dispatch(addToCart({...product,qty}));
        navigate("/cart");
    }
    const removeFromCartHandler = async(id)=>{
        dispatch(removeFromCart(id));
        navigate("/cart");
    }
    const checkoutHandler = ()=>{
        navigate("/login?redirect=shipping"); //if not logged in then redirect to login page else redirect to shipping page
    }

  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <h2>
                    Your cart is empty <Link to="/">Go Back</Link>
                </h2>
            ) : (
                <ListGroup variant="flush">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <img src={item.image} alt={item.name} className="img-fluid rounded" />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                {/* for quantity: */}
                                <Col md={2}>
                                    <Form.Control as="select" value={item.qty} onChange={(e)=>addToCartHandler(item,Number(e.target.value))}>
                                    {/* similar concept to that in productScreen */}
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                {/* delete button: */}
                                <Col md={2}>
                                    <Button type="button" variant="light" onClick={(e) => removeFromCartHandler(item._id)}>
                                        <FaTrash />
                                    </Button>
                                </Col>       
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                    {/* subtotal: */}
                                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                            Proceed To Checkout
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>

    </Row>
  )
}

export default CartScreen