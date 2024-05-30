
// eslint-disable-next-line react/prop-types
const SamplePrevArrow = ({ className, style, onClick }) => {
  return (
    <div  className={className}
    style={{ ...style, display: "block", background: "green" }}
    onClick={onClick}>
    </div>
  )
}

export default SamplePrevArrow
