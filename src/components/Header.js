import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, showSent, onAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showSent ? "green" : "red"}
        text={showSent ? "Received" : "Sent"}
        onClick={onAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Chumba Logger",
};

Header.propTypes = {
  title: PropTypes.string.isRequired, // makes sure title prop is a string
};

export default Header;
