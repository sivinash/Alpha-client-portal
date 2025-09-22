import { FaCartPlus, FaCartArrowDown } from 'react-icons/fa';
import React, { useState ,useEffect} from 'react';
const openoder = (item,userExists,guestexists,setpage,setorder,setordermode,newGuest,api) => {
    
    if(userExists|guestexists){
        const order1 = [item]
        setorder(order1)
        console.log("order",order1)
        setordermode(false)
        setpage(1);             
        }
    else if(!guestexists){
        if(window.confirm("You are not logged in. Do you want to create a guest user")) 
        {
            fetch(`${api}/guest`, {
                method: 'POST'}).then(response => response.json())
                .then(data=> {console.log("Guest user created with ID:", data.guest_id);
                localStorage.setItem("guestid", data.guest_id);
                localStorage.setItem("guestexist", true);
                alert("Guest user created with ID: " + data.guest_id)
                localStorage.setItem("cartitems", JSON.stringify([]));
                localStorage.setItem("Address",JSON.stringify({name:null}));
                newGuest(data.guest_id);
               }).catch(error => console.error('Error creating guest user:', error))
            }
        else{ return}
    } 
    return alert("dobole click on item to order it",item);
}

const addtocart= (itemid,userid,userExists,guestexists,guestid,setCheak,setCartIteam,newGuest,api)=>{
    if(userExists)
        {
            fetch(`${api}/add_cartItem/${itemid}/${userid}`,{method:"POST",
                headers: {'Content-Type': 'application/json',}
            }).
    then(response => response.json()).then(data => {console.log("Item added to cart:", data.cartitem);
        setCartIteam(data.cartitem);
        localStorage.setItem("cartitems", data.cartitem);
        setCheak(true);
    }).catch(error => console.error('Error:', error));
    }
    else if(!guestexists){
        if(window.confirm("You are not logged in. Do you want to create a guest user")) 
        {
            fetch(`${api}/guest`, {
                method: 'POST'}).then(response => response.json())
                .then(data=> {console.log("Guest user created with ID:", data.guest_id);
                localStorage.setItem("guestid", data.guest_id);
                localStorage.setItem("guestexist", true);
                alert("Guest user created with ID: " + data.guest_id)
                localStorage.setItem("cartitems", JSON.stringify([]));
                localStorage.setItem("Address",JSON.stringify({name:null}));
                newGuest(data.guest_id);
               }).catch(error => console.error('Error creating guest user:', error))
            }
        else{ return}
    }
        
    else{
        const newitem =JSON.parse(localStorage.getItem("cartitems"))
        console.log("before",newitem)
        newitem.push(itemid);
        console.log("after",newitem)
        localStorage.setItem("cartitems", JSON.stringify(newitem));
        setCartIteam(newitem)
        setCheak(true);
        }
        return ;
 }
const removeit = (itemid,userid,userExists,guestexists,guestid,setCheak,CartIteam,setCartIteam,api)=>{
    
    if(userExists)
    {
        fetch(`${api}/add_cartItem/${itemid}/${userid}`,{method:"GET",
            headers: {
            'Content-Type': 'application/json',}
        }).
        then(response => response.json()).then(data => {console.log("Item added to cart:", data.cartitem);
        setCartIteam(data.cartitem);
        localStorage.setItem("cartitems", data.cartitem);
        setCheak(false);}).catch(error => console.error('Error:', error));
    }
    else if(guestexists)
        {
        console.log("item",itemid)
        console.log("before poping",CartIteam)
        console.log("after pop ing",CartIteam)            
        const newcart= CartIteam.filter(iteam=>iteam !== itemid);
        console.log(newcart)
        localStorage.setItem("cartitems", JSON.stringify(newcart));
        setCartIteam(newcart)
        setCheak(false);
        }
    return;
 }


;

export default function AddItem({ item, userid ,userExists, guestexists, guestid,CartIteam,setpage,setorder,setCartIteam,setordermode,newGuest,api}) {
    const [cheak, setCheak] = useState(false)
    const bstyle=cheak?{fontSize:"35px",backgroundColor:"transparent"}:{fontSize:"35px",backgroundColor:"transparent"}
    useEffect(() => {
        setCheak(CartIteam.includes(item.id));
    }, [CartIteam, item.id]); 
    const ordermode=1;
    return (
        <div className="product" key={item.id} onDoubleClick={()=>openoder(item,userExists,guestexists,setpage,setorder,setordermode,newGuest,api)}> {/* Assuming each item has a unique id */}
            <img src={item.img} alt={item.img} />
            <div className='nameblock'><h3>{item.name}</h3><p>₹{item.price}</p></div>
            <h6>{item.details}</h6>
            <div className='namebutton'><button className='cartbutton' style={bstyle} onClick={()=>{cheak?removeit(item.id,userid,userExists,guestexists,guestid,setCheak,CartIteam,setCartIteam,api):addtocart(item.id,userid,userExists,guestexists,guestid,setCheak,setCartIteam,newGuest,api)}}>{cheak?<FaCartArrowDown
            color='#1eff00ff'
             />:<FaCartPlus
            color='white'
             />}</button></div>
        </div>
    );
}