import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

const RouterLink = forwardRef(
  ({ href, ...other }: { href: string }, ref: any) => (
    <Link ref={ref} to={href} {...other} />
  )
);

RouterLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default RouterLink;
