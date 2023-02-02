import "../css/circle.css";

function Circle({ height, width, color, x, y }) {

    let circle_style = {
        height: height + "px",
        width: width + "px",
        top: y + "px",
        left: x + "px",
        backgroundColor: color
    } // parameters of the circle



    return (
        <>
            <div className="circle" style={circle_style}>
            </div>
        </>
    )
}

export default Circle;