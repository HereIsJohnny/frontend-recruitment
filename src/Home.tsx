import { Link } from "react-router-dom";

export const Home = () => {
    return <main>
        <h1>Frontend Recruitment</h1>
        <p>Click to navigate to the tasks.</p>
        <ol>
            <li>
                <Link to="/pills">Pills</Link>
            </li>
            <li>
                <Link to="/widget">Widget</Link>
            </li>
        </ol>
    </main>
};