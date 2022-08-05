import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';
import React,{useEffect,useState} from 'react';
const App =()=>{
const APP_ID='6465032c';
const APP_KEY='f5a2deeff166e9421f1e9e1134e2a631';
const [recipes,setRecipes]=useState([]);

const [search,setSearch]=useState('');
const[query,setQuery]= useState('chicken');
useEffect( ()=>{

  getRecipes();

},[query]);

const getRecipes = async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query} & app_id=${APP_ID}&app_key=${APP_KEY}`,  {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });
const data = await response.json();
setRecipes(data.hits);

}
const updateSearch= e =>{
  setSearch(e.target.value);
 
}
const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
return(
  <div className='App'>
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
      <button className="search-button" type="submit">Search</button>

    </form>
    <div className="recipes">
  {recipes.map(recipe =>(
<Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}
image={recipe.recipe.image}
ingredients={recipe.recipe.ingredients}
  />
  ))}
  </div>
  </div>
);
};
export default App;
