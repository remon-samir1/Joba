import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav>
      <ul className="breadcrumbs">
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className={isLast ? "active" : ""}>
              {isLast ? (
                <span>
                  {decodeURIComponent(value)
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              ) : (
                <Link to={to}>{decodeURIComponent(value)}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
