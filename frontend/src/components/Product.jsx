// this is card for individual product
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-2">
      <Link to={`/product/${product._id}`}>
        {/* variant is positioning */}
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          {/* making this a div using as, product-title provides ... if title exceeds 1 line */}
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
    product: PropTypes.object.isRequired
}


export default Product;
