export default function Header() {
    return (
        <div>
            <h1>Quick Actions Section</h1>
            <button className="quick-button">
                <span className="button-icon">+</span> Add Bathroom
            </button>
            <button className="quick-button">
                <span className="button-icon"></span> Browse Bathrooms
            </button>
            <button className="quick-button">
                <span className="button-icon"></span> Top Rated Bathrooms
            </button>
            <button className="quick-button">
                <span className="button-icon"></span> Report Bathroom
            </button>
        </div>
    );
}