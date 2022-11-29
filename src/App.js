import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem.js";
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';



function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [myPrice, setMyPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState("All");
  const [designer, setDesigner] = useState("All");
  const [data, setData] = useState([]);
  const [sortType, setSort] = useState("Featured");
  const [placeholder, setPlace] = useState([]);
  const [favList, setFav] = useState([]);
  const [myName, setName] = useState("");

  function addToCart(item, price){
    if (item.other !== "fav"){
      item.other = "fav";
      setMyPrice(myPrice + price);
      setFav([...favList, item]);
    }else{
      item.other = "";
      setName(item.name);
      setMyPrice(myPrice - price);
      setFav(favList.filter(isItem));
    }
    
  } 

  const selectFilterType = eventKey =>{
    setType(eventKey);
    setChecked(false);
  };
  
  const selectSort = eventKey =>{
    setSort(eventKey);
    setChecked(false);
  };
  
  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if(type === "All" && designer === "All") { 
      return true
    } else if (type === item.category && designer === item.Designer) {
      return true
    } else if (type === "All") {
      if(designer===item.Designer){
        return true
      }
      else{
        return false
      }
      
    } else if (designer === "All") {
      if(type===item.category){
        return true
      }
      else{
        return false
      }
      
    } else {
      return false
    }
  };

  const isFav = item =>{
    if(item.other === "fav"){
      return true
    }else{
      return false
    }

  }

  const isItem = item =>{
    if(item.name === myName){
      return true
    }else{
      return false
    }

  }
  
  const filteredData = bakeryData.filter(matchesFilterType);

  const selectFilterDesigner = eventKey =>{
    setDesigner(eventKey);
    setChecked(false);
  };
  
  useEffect(() => {
    const loadFavorite = checked =>{
      if(checked){
        const newList = bakeryData.filter(isFav);
        setData(newList);
        
      } else{
        setData(placeholder);
      }
      
      
    }
    loadFavorite(checked);
  }, [checked, favList]);
  
  useEffect(() => {
    const sortArray = sortType =>{
      if(sortType === "PriceA"){
        const sorted = filteredData.sort((item1, item2) => { return item1.price - item2.price});
        console.log(sorted);
        setData(sorted);
        setPlace(sorted);
      } else if(sortType === "PriceB"){
        const sorted = filteredData.sort((item1, item2) => { return item2.price - item1.price});
        console.log(sorted);
        setData(sorted);
        setPlace(sorted);
      } else{
        const sorted = filteredData;
        console.log(sorted);
        setData(sorted);
        setPlace(sorted);
      }
      
      
      
    }
    sortArray(sortType);

  }, [sortType, designer, type]);

  function resetAll(){
    setType("All");
    setDesigner("All");
    setSort("Featured");
    setChecked(false);

  };


  
  

  


 

  

    
  

  return (
    <div>
      <h1>Bauhaus Galore</h1>
      <div className="dropdowns">
        <Dropdown onSelect={selectFilterType}>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Chair">Chairs</Dropdown.Item>
          <Dropdown.Item eventKey="Table">Tables</Dropdown.Item>
          <Dropdown.Item eventKey="Home Goods">Home Goods</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={selectFilterDesigner}>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Designer  
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Marcel Breuer">Marcel Breuer</Dropdown.Item>
          <Dropdown.Item eventKey="Ludwig Mies van der Rohe">Ludwig Mies van der Rohe</Dropdown.Item>
          <Dropdown.Item eventKey="Marianne Brandt">Marianne Brandt</Dropdown.Item>
          <Dropdown.Item eventKey="Wilhelm Wagenfeld">Wilhelm Wagenfeld</Dropdown.Item>
          <Dropdown.Item eventKey="Josef Hartwig">Josef Hartwig</Dropdown.Item>
          <Dropdown.Item eventKey="Gertrud Arndt">Gertrud Arndt</Dropdown.Item>
          <Dropdown.Item eventKey="Walter Gropius">Walter Gropius</Dropdown.Item>
          

        </Dropdown.Menu>
      </Dropdown>
      <div className='sort'>
        <Dropdown onSelect={selectSort}>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Sort  
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="Featured">Featured</Dropdown.Item>
            <Dropdown.Item eventKey="PriceA">Price: Low to High</Dropdown.Item>
            <Dropdown.Item eventKey="PriceB">Price: High to Low</Dropdown.Item>
            

          </Dropdown.Menu>
        </Dropdown>
        
      </div>
      <Button variant="link" className='link' onClick ={()=>resetAll()}>Clear All Criteria</Button>

      <div className='favorite'>
        <ToggleButton
          className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          Show Favorites
          
        </ToggleButton>
        <p>Total Pirce: ${myPrice}</p>
        
        
      </div>
      
      </div>
      <div className="wrapper">
      {data.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
        <BakeryItem key={index} item={item} index={index} addToCart ={addToCart} /> // replace with BakeryItem component
      ))}
      </div>
      

    
    </div>
  );
}

export default App;
