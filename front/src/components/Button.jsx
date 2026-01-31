const Button = ( {borderColor, bgColor, textColor, text} ) => {
  return (
    <button className={`rounded mx-2 my-2 ${color} ${textColor} px-4 py-2`}>
      {text}
    </button>
  );
};
// example usage: <Button color="blue" text="Click me" />
export default Button;