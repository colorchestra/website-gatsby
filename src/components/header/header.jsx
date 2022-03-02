import React from "react";

import style from "./header.module.css";
import logo from "../../images/kalkspace_fontlogo_white.svg";
import { useState } from "react";
import { useContext } from "react";

const links = [
  { url: "/coworking", title: "Coworking" },
  { url: "/blog", title: "Blog" },
  { url: "/community", title: "Community" },
  { url: "/events", title: "Events" },
];

const MenuOpenButton = () => (
  <svg version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
    <path
      fill="currentColor"
      d="M941,451H59c-27,0-49,22-49,49c0,27.1,22,49,49,49h882c27,0,49-21.9,49-49C990,473,968,451,941,451L941,451z M941,843H59c-27,0-49,22-49,49c0,27.1,22,49,49,49h882c27,0,49-21.9,49-49C990,865,968,843,941,843L941,843z M59,157h882c27,0,49-21.9,49-49c0-27-22-49-49-49H59c-27,0-49,22-49,49C10,135.1,32,157,59,157L59,157z"
    />
  </svg>
);

const MenuCloseButton = () => (
  <svg version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
    <path
      fill="currentColor"
      d="M500,623.8L159.9,963.9c-34.6,34.6-90.1,34.7-124.3,0.5c-34.4-34.4-34-89.8,0.5-124.3L376.2,500L36.1,159.9C1.5,125.3,1.4,69.8,35.6,35.6c34.4-34.4,89.8-34,124.3,0.5L500,376.2L840.1,36.1c34.6-34.6,90.1-34.7,124.3-0.5c34.4,34.4,34,89.8-0.5,124.3L623.8,500l340.1,340.1c34.6,34.6,34.7,90.1,0.5,124.3c-34.4,34.4-89.8,34-124.3-0.5L500,623.8z"
    />
  </svg>
);

const IconButton = (props) => (
  <button className={style.iconButton} {...props} />
);

/** @typedef {{ to: string }} LinkProps */

/** @type {React.FunctionComponent<LinkProps>} */
const DefaultLink = ({ to, ...props }) => <a href={to} {...props} />;

/** @type {React.Context<React.ComponentType<LinkProps>>} */
const LinkContext = React.createContext(null);

/**
 * Use this to provide an alternative component to render links with
 * Defaults to just using the `a` tag.
 *
 * Would likely be used to inject the gatsby `Link` component.
 */
export const LinkProvider = LinkContext.Provider;

const Menu = ({ defaultOpen = false }) => {
  const [menuOpen, setMenuOpen] = useState(defaultOpen);
  const Link = useContext(LinkContext) ?? DefaultLink;
  return menuOpen ? (
    <nav className={style.menu}>
      <IconButton onClick={() => setMenuOpen(false)}>
        <MenuCloseButton />
      </IconButton>
      <ul>
        {links.map(({ url, title }) => (
          <li>
            <Link to={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <IconButton onClick={() => setMenuOpen(true)}>
      <MenuOpenButton />
    </IconButton>
  );
};

export const Header = ({ menuOpen }) => {
  return (
    <header className={style.header}>
      <img className={style.logo} src={`/${logo}`} alt="KalkSpace" />
      <Menu defaultOpen={menuOpen} />
    </header>
  );
};
