import "./footer.css";

function Footer() {
    var date = new Date();
    return (
        <footer>
            <div className="container">
                <p id="copyright">
                    &copy; {date.getFullYear()} Yi Guo - All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
