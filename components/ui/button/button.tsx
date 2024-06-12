import "./button.scss"

const Button = ({ className, children, ...props }: any) => {
  return (
    <button className={`btn${className ? " " + className : ""}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
