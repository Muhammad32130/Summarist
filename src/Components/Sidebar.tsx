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
import {VscCaseSensitive} from "react-icons/vsc"
import {useRef, useEffect, useState} from 'react'



type SidebarProps = {
  user: any; 
  textsize: any; 
  setsize: any; 
  signout: any; 
  setmodal: any; 
  modal: any; 
  id: any; 
  sidebar: boolean,
  setsidebar: any,
};
declare module 'react-router-dom' {
  interface NavLinkProps {
    activeClassName?: string;
  }
}
const Sidebar: React.FC<SidebarProps> = ({
  user,
  sidebar,
  setsidebar,
  textsize,
  setsize,
  signout,
  setmodal,
  modal,
  id,
}: SidebarProps) => {
  
  const ref = useRef<any>(null);

useEffect(()=>{
setsidebar(false)
},[])


  
  return (
    <>
      <div onClick={()=>{setsidebar(false)}} className={`${sidebar ?"side-overlay" :"side-overlay-hidden"}`}></div>
    <div className={`sidebar ${sidebar ? "sidebar-show":"side-hidden"}`}>

      <div className="slogo-wrap" >
        <img className="sidebar-logo" src={logo} alt="" />
      </div>
      <div className={`li-wrap ${id && 'li-wrap-res'}`} style={id && {height: 'calc(100vh - 170px)'}}>
        <div className="sidebar-li">
          <NavLink
            to="/for-you"
            className="s-li click"
            activeClassName="activate"
            >
            <div className="sidebar-active"></div>
            <AiOutlineHome className="li-ico"></AiOutlineHome>
            For you
          </NavLink>
          <NavLink
            to="/Library"
            className="s-li click"
            activeClassName="activate"
            >
            <div className="sidebar-active"></div>
            <BsBookmark className="li-ico"></BsBookmark>
            My Library
          </NavLink>
          <div className="s-li sidebar__link--not-allowed" >
            <div className="sidebar-active"></div>
            <RiBallPenLine className="li-ico"></RiBallPenLine>
            Highlights
          </div>
          <div className="s-li sidebar__link--not-allowed" >
            <div className="sidebar-active"></div>
            <AiOutlineSearch className="li-ico"></AiOutlineSearch>
            Search
          </div>
          {id && 
          <div  className="sidebar__link--wrapper sidebar__font--size-wrapper">
            <div onClick={()=>{setsize('16')}} className={`sidebar__link--text sidebar__font--size-icon ${textsize==='16' && 'sidebar__font--size-icon--active'}`}>
            <VscCaseSensitive className="sidebar__font--size-icon-small"></VscCaseSensitive>
          </div>
            <div onClick={()=>{setsize('18')}} className={`sidebar__link--text sidebar__font--size-icon ${textsize==='18' && 'sidebar__font--size-icon--active'}`}>
            <VscCaseSensitive className="sidebar__font--size-icon-medium"></VscCaseSensitive>
          </div>
            <div onClick={()=>{setsize('22')}} className={`sidebar__link--text sidebar__font--size-icon ${textsize==='22' && 'sidebar__font--size-icon--active'}`}>
            <VscCaseSensitive className="sidebar__font--size-icon-large"></VscCaseSensitive>
          </div>
            <div onClick={()=>{setsize('26')}} className={`sidebar__link--text sidebar__font--size-icon ${textsize==='26' && 'sidebar__font--size-icon--active'}`}>
            <VscCaseSensitive className="sidebar__font--size-icon-xlarge"></VscCaseSensitive>
          </div>
          </div>}
        </div>
        <div className="sidebar-li ">
          <NavLink
           to="/settings"
           className="s-li click"
           activeClassName="activate"
           >
            <div className="sidebar-active"></div>
            <AiOutlineSetting className="li-ico"></AiOutlineSetting>
            Settings
          </NavLink>
          <div className="s-li sidebar__link--not-allowed" >
            <div className="sidebar-active"></div>
            <BiHelpCircle className="li-ico"></BiHelpCircle>
            Help & Support
          </div>

          {user ? <div onClick={()=>{signout()}} className="s-li" >
            <div className="sidebar-active"></div>
            <FiLogOut className="li-ico"></FiLogOut>
            Logout
          </div>:
          <div onClick={()=>{setmodal(true)}} className="s-li" >
          <div className="sidebar-active"></div>
          <FiLogOut className="li-ico"></FiLogOut>
          Login
        </div>
          }
        </div>
      </div>
    </div>
          </>
  );
}

export default Sidebar;
