import { useState, useEffect } from 'react'
import foodData from './foodData.json';
import './App.css'
import { css } from '@emotion/react';

function App() {
  const [filterOptions, setFilterOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [filterForm, setFilterForm] = useState([]);
  const [tagForm, setTagForm] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let ingredients = [];
    let tags = [];

    foodData.map(meal => {
      for (let i = 0; i < meal.ingredients.length; i++) {
        if (!ingredients.find(ingredient => ingredient === meal.ingredients[i])) {
          ingredients.push(meal.ingredients[i]);
        }
      }
      for (let j = 0; j < meal.tags.length; j++) {
        if (!tags.find(tag => tag === meal.tags[j])) {
          tags.push(meal.tags[j]);
        }
      }
    })

    setFilterOptions(ingredients);
    setTagOptions(tags);
  }, [foodData])

  // remove!!
  useEffect(() => {
    console.log(tagForm);
  }, [tagForm])

  const addFilter = (event) => {
    if (event.target.checked) {
      setFilterForm(pre => [...pre, event.target.id])
    }
    else {
      let unselect = filterForm.filter(ingredient => ingredient !== event.target.id);
      setFilterForm(unselect);
    }
  }
  
  const addTag = (event) => {
    if (event.target.checked) {
      setTagForm(pre => [...pre, event.target.id])
    }
    else {
      let unselect = tagForm.filter(tag => tag !== event.target.id);
      setTagForm(unselect);
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
        <h2>Select All Ingredients Not on Hand</h2>

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

          <h2>Include Only:</h2>
          <div id="options">
              {tagOptions.length ? (
                tagOptions.map((tag, index) =>
                  <div id="tag-container" key={index}>
                    <input id={tag} type="checkbox" value={tag} onClick={addTag}></input>
                    <label id="tag-label" htmlFor={tag}>{tag}</label>
                  </div>
                )
              ): null}
          </div>
          <button onClick={handleChoice}>What's for Dinner?</button>

        <div id="results">
          <div id="image-container">
              <img src="" alt=""/>
          </div>
        </div>

      </main>
      <footer>
        <p>Eh who needs a footer</p>
      </footer>
    </div>
  )
}

export default App;
