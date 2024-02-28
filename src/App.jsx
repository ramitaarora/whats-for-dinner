import { useState, useEffect } from 'react'
import foodData from './foodData.json';
import './App.css'

function App() {
  const [filterOptions, setFilterOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [filterForm, setFilterForm] = useState([]);
  const [tagForm, setTagForm] = useState([]);
  const [results, setResults] = useState([]);
  const [image, setImage] = useState("https://media.tenor.com/KaDP8fq46oMAAAAi/confused-face.gif")
  const [alt, setAlt] = useState("https://tenor.com/view/confused-face-look-otter-cute-gif-20502552")
  const [mealName, setMealName] = useState("")

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
  
  useEffect(() => {
    if (results.length) {
      handleFlip();
    }
  }, [results])

  const handleFlip = () => {
    let counter = 0;

    const flip = () => {
      setTimeout(() => {
        setImage(results[counter].image);
        setMealName(results[counter].meal);
        counter += 1;

        if (counter < results.length - 3) {
          flip();
        }
        else {
          flipSlow();
        }
      }, 50 + (counter + 50))
    }

    const flipSlow = () => {
      setTimeout(() => {
        setImage(results[counter].image);
        setMealName(results[counter].meal);
        counter += 1;

        if (counter < results.length - 1) {
          flipSlow();
        }

        else {
          setImage(results[results.length - 1].image);
          setMealName(results[results.length - 1].meal);
          setAlt(results[results.length - 1].source);
        }
      }, 500)
    }

    flip();
  }

  const handleChoice = async (event) => {
    event.preventDefault();
    let tempFoods = [...foodData];
    
    const setArray = () => {
      setResults(tempFoods.sort(() => Math.random() - 0.5))
    }
    
    const filterArray = () => {
      if (filterForm.length) {
        for (let i = 0; i < filterForm.length; i++) {
          tempFoods = tempFoods.filter(meal => !meal.ingredients.includes(filterForm[i]));
        }
      }

      if (tagForm.length) {
        for (let i = 0; i < tagForm.length; i++) {
          tempFoods = tempFoods.filter(meal => meal.tags.includes(tagForm[i]));
        }
      } 
    }
    
    if (filterForm.length || tagForm.length) {
      filterArray();
      setArray();
    }
    else {
      setArray();
    }
  }

  const reset = () => {
    location.reload();
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
          ) : null}
        </div>
        <button onClick={handleChoice}>What's for Dinner?</button>


        <div id="results">
          <div id="image-container">
            <img src={image} alt={alt} />
          </div>
          <h2>{mealName}</h2>
        </div>

        <button onClick={reset}>Reset</button>
      </main>

      <div id="images">
            {foodData.map(meal => 
              <img src={meal.image} alt={meal.meal}/>  
            )}
      </div>
    </div>
  )
}

export default App;
