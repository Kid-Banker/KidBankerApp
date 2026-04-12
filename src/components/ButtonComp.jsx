import { Link } from "react-router-dom";

function ButtonComp({ to, className = "", onClick, children, ...props }) {
  if (to) {
    return (
      <Link to={to}>
        <button
          onClick={onClick}
          className={`cursor-pointer rounded-md text-white text-md text-center px-4 py-2 m-2 bg-[#2785FF] ${className}`}
          {...props}
        >
          {children}
        </button>
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-md text-white text-md text-center px-4 py-2 m-2 bg-[#2785FF] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonComp;
