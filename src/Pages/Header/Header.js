import React, { createRef } from "react";
import { Link } from "react-router-dom";
import { cancelDoubleLoading } from "../../Store/catalogSlice";
import {
  searchHeaderFlag,
  search,
  addInputHeader,
  addSearchFocusFlag,
} from "../../Store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addhiddenButtonLoadMore,
  addButtonFlagSearch,
} from "../../Store/hiddenButtonLoaded";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const handleCancelDoubleLoading = () => {
    dispatch(cancelDoubleLoading(true));
    dispatch(addhiddenButtonLoadMore(false));
    dispatch(addButtonFlagSearch(false));
  };
  const ref = createRef();
  const refInput = createRef();
  const { searchHeader } = useSelector(search);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(addInputHeader(e.target.value.trim()));
    e.target.value !== ""
      ? dispatch(searchHeaderFlag(true))
      : dispatch(searchHeaderFlag(false));
  };

  const handleShowSearch = (e) => {
    ref.current.classList.remove("invisible");
    refInput.current.focus();

    if (searchHeader) {
      ref.current.classList.add("invisible");
      navigate(`/catalog`);
      e.target.parentElement.parentElement.children[1][0].value = "";
      dispatch(addSearchFocusFlag(true));
    }
  };

  const hiddenSeacrh = (e) => {
    if (e.target.value === "") {
      ref.current.classList.add("invisible");
    }
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
                  >
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contacts"
                    className="nav-link"
                    activeclassname="active"
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
                    onClick={handleShowSearch}
                  ></div>
                  {/* Do programmatic navigation on click to /cart.html  */}
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">2</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  ref={ref}
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    ref={refInput}
                    className="form-control"
                    placeholder="Поиск"
                    onChange={handleChange}
                    onBlur={(e) => {
                      hiddenSeacrh(e);
                    }}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
