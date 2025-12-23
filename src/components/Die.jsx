export default function Die(props) {
    return (
        <button 
            onClick={props.hold}
            aria-label={`Die of ${props.value} - ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}
            style={{backgroundColor: `${props.isHeld ? "#59E391" : ""}`}}
            >{props.value}
        </button>
    )
}