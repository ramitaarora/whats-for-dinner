import { useState, useEffect } from 'react'
import foodData from './foodData.json';
import './App.css'
import { css } from '@emotion/react';

function App() {
  const [filterOptions, setFilterOptions] = useState([])
  const [filterForm, setFilterForm] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    let ingredients = [];

    foodData.map(meal => {
      for (let i = 0; i < meal.ingredients.length; i++) {
        if (!ingredients.find(item => item === meal.ingredients[i])) {
          ingredients.push(meal.ingredients[i]);
        }
      }
    })

    setFilterOptions(ingredients);
  }, [foodData])

  // remove!!
  useEffect(() => {
    console.log(filterForm);
  }, [filterForm])

  const addFilter = (event) => {
    if (event.target.checked) {
      setFilterForm(pre => [...pre, event.target.id])
    }
    else {
      let unselect = filterForm.filter(ingredient => ingredient !== event.target.id);
      setFilterForm(unselect);
    }
  }

  const handleChoice = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <header>
        <h1>What's for Dinner?</h1>
      </header>
      <main>
        <h2>Select Ingredients Not on Hand</h2>

        <form>
          <div id="filters">
            {filterOptions.length ? (
              filterOptions.map((ingredient, index) =>
                <div id="filter-container" key={index}>
                  <input id={ingredient} type="checkbox" value={ingredient} onClick={addFilter}></input>
                  <label id="filter-label" htmlFor={ingredient}>{ingredient}</label>
                </div>
              )
            ) : null}
          </div>
          <button onClick={handleChoice}>What's for Dinner?</button>
        </form>

        <div id="results">
          <div id="image-container">
              <img src="" alt=""/>
          </div>
        </div>

      </main>
    </div>
  )
}

export default App;
