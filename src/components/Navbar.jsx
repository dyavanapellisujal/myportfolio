import logo from "../assets/kevinRushLogo.png";
import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-8 lg:mb-20 flex flex-col lg:flex-row items-center justify-between py-6">
      <div className="flex items-center justify-center lg:justify-start">
        <img className="h-16" src={logo} alt="logo" />
      </div>
      <div className="flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
        <a href="https://www.linkedin.com/in/dyavanapelli-sujal-409766249/" target="_blank" rel="noopener noreferrer" className="text-2xl mr-4 lg:mr-8"><FaLinkedin /></a>
        <a href="https://medium.com/@dyavanapellisujal7" target="_blank" rel="noopener noreferrer" className="text-2xl mr-4 lg:mr-8"><FaMedium /></a>
        <a href="https://github.com/dyavanapellisujal" target="_blank" rel="noopener noreferrer" className="text-2xl"><FaGithub /></a>
      </div>
    </nav>
  );
};

export default Navbar;
