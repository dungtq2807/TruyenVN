

// eslint-disable-next-line react/prop-types
const SampleNextArrow = ({ className, style, onClick }) => {
  return (
    
      <div  className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}>
      </div>
 
  )
}

export default SampleNextArrow
