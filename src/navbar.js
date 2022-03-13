import "./navbar.css";

function Navbar() {
    return (
        <nav>
            <div className="container">
                <div id="name-block">
                    <a href="#home">
                        <div id="name">Yi Guo</div>
                        <div id="affiliation">PhD Student, UC San Diego</div>
                    </a>
                </div>
                <div id="menu-block">
                    <ul>
                        <li>
                            <a href="#research">Research</a>
                        </li>
                        <li>
                            <a href="#interest">Interest</a>
                        </li>
                        <li>
                            <a href="#history">History</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
