import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div className="container">
            <h1>Assessment</h1>
            <ul>
                <li className="option"><Link to={'/AT'}>AT</Link></li>
            </ul>
        </div>
    );
};