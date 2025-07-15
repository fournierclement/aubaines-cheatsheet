import React from "react";
import EPages from './EPages';
import './bottom-menu.css';

const PagesIcons = {
  [EPages.Feu]: "🔥",
  [EPages.Eau]: "💧",
  [EPages.Air]: "💨",
  [EPages.Terre]: "⛰️",
  [EPages.Vide]: "🕳️"
};

const BottomMenu = ({
  page,
  setPage
}) => {
  return (
    <div className="bottom-menu">
      {Object.values(EPages).map((pageKey) => (
        <button
          key={pageKey}
          className={`menu-icon ${page === pageKey ? 'active' : ''} bg ${pageKey}`}
          onClick={() => setPage(pageKey)}
          title={pageKey}
        >
          <span>{PagesIcons[pageKey]}</span>
        </button>
      ))}
    </div>
  )
}

export default BottomMenu;