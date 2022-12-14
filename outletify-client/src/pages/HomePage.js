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

      <div id="about">
        <div className="about-text">
          <h2>About Our Coding Book Ecommerce Store</h2>
          <span>
            Welcome to our coding book ecommerce store, where you can find a
            wide selection of books to help you learn and improve your coding
            skills. From beginner guides to advanced technical manuals, we have
            something for everyone looking to level up their coding abilities.
            Browse our collection and start your journey to becoming a master
            coder today! From popular programming languages like Python and
            Javascript to specialized topics like machine learning and data
            science, our collection has something for every coder.
          </span>
        </div>
        <div className="about-pic">
          <img src="altumcode-PNbDkQ2DDgM-unsplash.jpg" alt="pic"></img>
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
