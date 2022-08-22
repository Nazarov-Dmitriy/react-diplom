import React from "react";
import { Link } from "react-router-dom";
import { cancelDoubleLoading,addUrlCatalog,addId } from "../../Store/mainSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

  const handleCancelDoubleLoading = () => {
    dispatch(cancelDoubleLoading(true));
    dispatch(addUrlCatalog('http://localhost:7070/api/items'));
    dispatch(addId('All'));
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link
              to="/"
              className="navbar-brand"
              onClick={handleCancelDoubleLoading}
            >
              <img src={require("../../img/header-logo.png")} alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link
                    to="/"
                    className="nav-link"
                    activeclassname="active"
                    onClick={handleCancelDoubleLoading}
                  >
                    Главная
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/catalog"
                    className="nav-link"
                    activeclassname="active"
                    onClick={handleCancelDoubleLoading}
                  >
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about"
                    className="nav-link"
                    activeclassname="active"
                    onClick={handleCancelDoubleLoading}
                  >
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contacts"
                    className="nav-link"
                    activeclassname="active"
                    onClick={handleCancelDoubleLoading}
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                  ></div>
                  {/* Do programmatic navigation on click to /cart.html  */}
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">2</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                >
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
