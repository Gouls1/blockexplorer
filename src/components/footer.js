import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  const gitHub = "https://github.com/Gouls1/"
    return (
        <div className="footer">
            <footer>
            <Link className="links" to={gitHub}>{gitHub}</Link>
            </footer>
        </div>
    )
}
export default Footer