import { assets } from "../../assets/assets";

export const Navbar = () => {
  return (
    <nav className="topbar">
      <div className="history-buttons">
        <button aria-label="Go back" type="button">
          <img src={assets.arrow_left} alt="" />
        </button>
        <button aria-label="Go forward" type="button">
          <img src={assets.arrow_right} alt="" />
        </button>
      </div>

      <div className="topbar-actions">
        <button className="premium-button" type="button">
          Explore Premium
        </button>
        <button className="install-button" type="button">
          Install App
        </button>
        <button aria-label="Notifications" className="icon-button" type="button">
          <img src={assets.bell_icon} alt="" />
        </button>
        <button aria-label="Profile" className="profile-button" type="button">
          S
        </button>
      </div>
    </nav>
  );
};
