import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceAngry, faSadTear, faSmile } from "@fortawesome/free-solid-svg-icons";

const Smileys = ({ value }) => {
  return (
    <FontAwesomeIcon 
        icon={value >= 50 ? faSmile : (value > 30 ? faFaceAngry : faSadTear)}
        className={`h-20 w-20 ${value >= 50 ? "text-green-500" : (value > 30 ? "text-yellow-500" : "text-red-500")}`}
    />
  )
}
export default Smileys