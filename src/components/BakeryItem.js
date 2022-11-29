// TODO: create a component that displays a single bakery item
import "./BakeryItem.css";

export default function BakeryItem({item, index, addToCart}){
    
    return(
        <div className="card">
            <div className="card-body">
                <img src={item.image} alt="Flowers in Chania"/>
                <h2 className="card-title">{item.name}</h2>
                <h3 className="card-subtext">Designed by <strong>{item.Designer}</strong></h3>
                <h2 className="card-price">${item.price}</h2>


            </div>


           

            {item.other!== "fav" ? (
               <button className ='card-btn' onClick ={()=>addToCart(item, item.price)}>Add to Favorite</button>
              ) : (
                <button className ='card-btn-fav' onClick ={()=>addToCart(item, item.price)}>Remove from Favorite</button>
            )}
            
        </div>
    )
}