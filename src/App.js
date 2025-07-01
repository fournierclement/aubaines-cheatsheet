import './App.css';
import BottomMenu from './Components/BottomMenu';
import { useState } from 'react';
import EPages from './Components/EPages';
import OpportunitieSwipe from './Components/OpportunityList';

function App() {
  const [page, setPage] = useState(EPages.Feu);
  const [category, setCategory] = useState("Tous");
  return (
    <div className="App">
      <OpportunitieSwipe
        page={page}
        setPage={setPage}
        currentCategory={category}
        setCurrentCategory={setCategory}
      />
      <BottomMenu
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
