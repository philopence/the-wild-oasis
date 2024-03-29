import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideEvent } from "../hooks/useOutsideEvent";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  function closeMenu() {
    setOpenId("");
  }

  function openMenu(id) {
    setOpenId(id);
  }

  function displayPosition(position) {
    setPosition(position);
  }

  return (
    <MenusContext.Provider
      value={{ openId, closeMenu, openMenu, position, displayPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { openId, closeMenu, openMenu, displayPosition } =
    useContext(MenusContext);
  function handleToggleClick(e) {
    e.stopPropagation();
    const { x, y, width, height } = e.target
      .closest("button")
      .getBoundingClientRect();
    displayPosition({ x: window.innerWidth - width - x, y: y + height + 8 });
    openId === id ? closeMenu() : openMenu(id);
  }
  return (
    <StyledToggle onClick={handleToggleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ children, id }) {
  const { openId, position, closeMenu } = useContext(MenusContext);

  const ref = useOutsideEvent("click", closeMenu, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { closeMenu } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    closeMenu();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
