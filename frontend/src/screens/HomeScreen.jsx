import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { useGetProductsQuery } from "../store/slices/productsApiSlice.js";
import { useParams, Link } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import Meta from "../components/Meta.jsx";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  // data consists of products, page and pages
  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
  }); // this query require pageNumber

  return (
    <div>
      {/* if there is keyword (product is searched) then showing the backbutton */}
      {keyword ? (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {/* check for loading and error */}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error?.data?.message || error.error}</h2>
      ) : 
        <div>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      }
    </div>
  );
};

export default HomeScreen;
