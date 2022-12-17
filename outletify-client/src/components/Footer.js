const Footer = () => {
  return (
    <div className="wrapper">
      <div className="button">
        <div className="icon">
          <i className="fab fa-facebook-f"></i>
        </div>
        <a className="footer-fb" target="_blank">
          Facebook
        </a>
      </div>
      <div className="button">
        <div className="icon">
          <i className="fab fa-github"></i>
        </div>
        <a className="footer-github" target="_blank">
          Github
        </a>
      </div>
      <div className="button">
        <div className="icon">
          <i className="fab fa-linkedin"></i>
        </div>
        <a className="footer-linkedin" target="_blank">
          LinkedIn
        </a>
      </div>
      <div className="button">
        <div className="icon">
          <i className="fab fa-codepen"></i>
        </div>
        <a className="footer-codepen" target="_blank">
          Codepen
        </a>
      </div>
      <div className="button">
        <div className="icon">
          <i className="fab fa-slack"></i>
        </div>
        <a className="footer-slack" target="_blank">
          Slack
        </a>
      </div>
    </div>
  );
};

export default Footer;
