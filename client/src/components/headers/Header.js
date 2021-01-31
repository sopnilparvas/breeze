import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

function Header() {
  const state = useContext(GlobalState);
  console.log(state);
  return (
    <header>
      <div className='logo'>
        <h2>
          <Link to='/'>Breeze</Link>
        </h2>
      </div>
      <ul>
        <li>
          <Link to='/'>Products</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
      <div className='cart-icon'>
        <span>0</span>
        <Link to='/cart'>
          <i className='fas fa-shopping-basket'></i>
        </Link>
      </div>
    </header>
  );
}

export default Header;
