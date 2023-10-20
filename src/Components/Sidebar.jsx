import logo from "../images/logo.png";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
 
function Sidebar({user, signout, setmodal, modal}) {
  return (
    <div className="sidebar">
      <div className="slogo-wrap">
        <img className="sidebar-logo" src={logo} alt="" />
      </div>
      <div className="li-wrap">
        <div className="sidebar-li">
          <NavLink
            to="/for-you"
            className="s-li click"
            activeclassname="activate"
          >
            <div className="sidebar-active"></div>
            <AiOutlineHome className="li-ico"></AiOutlineHome>
            For you
          </NavLink>
          <NavLink
            to="/Library"
            className="s-li click"
            activeclassname="activate"
         >
            <div className="sidebar-active"></div>
            <BsBookmark className="li-ico"></BsBookmark>
            My Library
          </NavLink>
          <Link className="s-li" href="">
            <div className="sidebar-active"></div>
            <RiBallPenLine className="li-ico"></RiBallPenLine>
            Highlights
          </Link>
          <Link className="s-li" href="">
            <div className="sidebar-active"></div>
            <AiOutlineSearch className="li-ico"></AiOutlineSearch>
            Search
          </Link>
        </div>
        <div className="sidebar-li ">
          <NavLink
           to="/settings"
           className="s-li click"
           activeclassname="activate"
          >
            <div className="sidebar-active"></div>
            <AiOutlineSetting className="li-ico"></AiOutlineSetting>
            Settings
          </NavLink>
          <Link className="s-li" href="">
            <div className="sidebar-active"></div>
            <BiHelpCircle className="li-ico"></BiHelpCircle>
            Help & Support
          </Link>

          {user ? <Link onClick={()=>{signout()}} className="s-li" href="">
            <div className="sidebar-active"></div>
            <FiLogOut className="li-ico"></FiLogOut>
            Logout
          </Link>:
          <Link onClick={()=>{setmodal(true)}} className="s-li" href="">
          <div className="sidebar-active"></div>
          <FiLogOut className="li-ico"></FiLogOut>
          Login
        </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
