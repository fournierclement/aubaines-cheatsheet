import React, { useCallback, useEffect, useRef, useState } from "react";
import EPages from "./EPages";
import opportunities from "./opportunities.json";
import "./opportunity-list.css";
import ReactSwipe from "react-swipe";

const pages = Object.keys(EPages);

const initObserver = (callback) => {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ratio = entry.intersectionRatio;
        if (ratio > 0.5) {
          callback(entry.target.getAttribute('data-category'))
        } else if (
          entry.boundingClientRect.top <= window.innerHeight
          && entry.boundingClientRect.bottom > 0
        ) {
          callback(entry.target.getAttribute('data-category'))
        }
      }
    });
  }, {
    threshold: [0, 0.5, 1] // Définir des seuils pour observer
  });
};

const OpportunitieSwipe = ({
  page: currentPage,
  setPage,
  currentCategory,
  setCurrentCategory,
}) => {
  const slider = useRef(null);
  const [observer] = useState(initObserver(setCurrentCategory));

  useEffect(() => {
    const index = pages.findIndex(page => page === currentPage);
    if (slider.current && index !== slider.current.getPos()) {
      slider.current.slide(index, 300);
    }
  }, [currentPage]);

  const handleSwipe = useCallback((index) => {
    setPage(pages[index]);
  }, [setPage]);

  return (
    <ReactSwipe
      swipeOptions={{
        startSlide: pages.findIndex(page => page === currentPage),
        callback: handleSwipe,
      }}
      ref={element => (slider.current = element)}
    >
      {pages.map((page) => (
        <div key={page}>
          <OpportunityList
            key={page}
            page={page}
            currentPage={currentPage}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            observer={observer}
          />
        </div>
      ))}
    </ReactSwipe>
  )
};

const OpportunityList = ({
  page,
  currentPage,
  currentCategory,
  setCurrentCategory,
  observer,
}) => {

  const currentOpportunities = opportunities[page];
  const categories = currentOpportunities ? Object.keys(currentOpportunities) : [];

  useEffect(() => {
    let section;
    if (!categories.includes(currentCategory)) {
      setCurrentCategory(categories[0]);
      section = document.getElementById(`${page}-${categories[0]}`);
    } else if (page === currentPage) {
      section = document.getElementById(`${page}-${currentCategory}`);
    }
    // scrollTo
    // if (section) {
    //   section.scrollIntoView({ behavior: 'smooth' })
    // }
  }, [currentPage])

  return (
    <div className={`opportunity-list bg ${page}`}>
      <ul>
        {categories.map((category) => (
          <li key={category} className={`list-item ${category}`}>
            <Header
              page={page}
              category={category}
              observer={observer}
              handleClick={() => setCurrentCategory(category)}
            >
              {category}
            </Header>
            <ul>
              {currentOpportunities[category].map((opportunity, index) => (
                <li key={category + index}>
                  {opportunity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Header = ({
  page,
  category,
  handleClick,
  observer
}) => {
  const element = useRef(null);
  useEffect(() => {
    if (element.current) {
      observer.observe(element.current);
    }
  }, [element.current])
  return (
    <h2 ref={element} data-category={category} id={`${page}-${category}`} onClick={handleClick}>
      {category}
    </h2>
  );
};

export default OpportunitieSwipe;