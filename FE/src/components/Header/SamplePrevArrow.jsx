// eslint-disable-next-line react/prop-types
const SamplePrevArrow = ({ className, style, onClick }) => {
  const arrowStyle = {
    ...style,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    width: "40px",
    height: "40px",
    borderRadius: "50%", // Circular shape
    cursor: "pointer",
    zIndex: "2", // Ensure it's above slider content
    transition: "background-color 0.3s ease",
  };


  const handleClick = () => {
    onClick(); // Call onClick prop passed from Slider component
  };

  return (
    <div
      className={`sample-arrow prev-arrow ${className} absolute left-4 bottom-4`}
      style={arrowStyle}
      onClick={handleClick}
    >

    </div>
  );
};

export default SamplePrevArrow;
