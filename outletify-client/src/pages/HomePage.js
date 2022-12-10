import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <div className="home-welcome-pic">
        <div className="category">
          <ul className="ul-category">
            <li>
              <Link to="/python">Python</Link>
            </li>
            <li>
              <Link to="/javascript">Javascript</Link>
            </li>
            <li>
              <Link to="/java">Java</Link>
            </li>
            <li>
              <Link to="/ruby">Ruby</Link>
            </li>
          </ul>
        </div>

        <div className="content-vision-mission">
          <h5>CODE BOOKS</h5>
          <p>
            The simplest and cheapest path to becoming a coding expert. Choose a
            language and begin your programming journey today.
          </p>
        </div>
      </div>
      <div className="home-pic-container">
        <div className="home-pic1">
          <div className="overlay"></div>
          <div className="content">TEST</div>
        </div>
        <Link to="/shop">
          <div className="home-pic2">
            <div className="overlay"></div>
            <div className="content">Shop Now</div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
