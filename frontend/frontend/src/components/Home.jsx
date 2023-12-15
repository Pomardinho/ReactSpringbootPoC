import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

function Home() {
    document.title = "Home"

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="d-grid gap-2 col-4 mx-auto">
                <Link to="/bbc" className="btn btn-primary">BBC</Link>
                <Link to="/bild" className="btn btn-primary">Bild</Link>
            </div>
        </div>
    )
}

export default Home