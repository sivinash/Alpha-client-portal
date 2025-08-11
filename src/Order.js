import { useEffect, useState } from "react";
import { FaSpinner,FaCheckCircle, FaEyeSlash, FaEye, FaLocationArrow, FaRupeeSign, FaArrowAltCircleLeft, FaAddressBook, FaPlus } from "react-icons/fa";
import Addrow from "./Addrow";


export default function Order({ userExists, userid, guestexists, guestid, order ,ordermode, setordermode, changeBody,setpage}) {
    const length = ordermode? 1: order.length;
    console.log("orderhhhhhhhhh", order);
    const orderssss=0
    const [newadd,setnewadd]=useState(true);
    const [orderImage, setOrderImage] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [total, setTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [addres,setaddress] = useState({});
    function newuser(){
        
    }
    const handleOrder = (e) => {
        e.preventDefault(); 
        const button=document.getElementById('oderconform')
        button.onClick=""
        button.innerHTML="Order Placed"
        const form = document.getElementById("order"); 
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        fetch('/add_order', {method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)}).
        then(response => {return response.json();}).
        then(data =>alert("order placed success order id:"+data.id),changeBody(0)).catch(error => {console.error('Errorfff:', error);});
    }
    useEffect(() => {
        if(ordermode){
            const imgesss= JSON.parse(order.orderimage);
            const olist = JSON.parse(order.orderlist);
            setOrderImage(imgesss);
            setOrderList(olist);
            setaddress(JSON.parse(order.address));
          }else{
            const imgesss = order.map((element) => ({
                img: element.img,
                name: element.name,
                price: element.price
            }));
            setOrderImage(imgesss);
            const olist = order.map((element) => ({
                id: element.id,
                name: element.name,
                quantity: 1,
                price: element.price
            }));
            setOrderList(olist);
            setaddress(JSON.parse(localStorage.getItem("Address")));
            if (JSON.parse(localStorage.getItem("Address")).name===null){
                setnewadd(false);
            }
        }
    }, [order]);

    useEffect(() => {
       if(ordermode){
        setTotal(order.total);
       }
       else{
         const totalPrice = orderList.reduce((acc, element) => acc + (parseInt(element.price, 10) * element.quantity), 0);
         setTotal(totalPrice);
       }
    }, [orderList]);
    function changeimage(i){
        const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll(".dot");
        const slidecount = slides.length;
        slider.style.transform=`translateX(-${i*100}%)`;
        dots.forEach(dot=>dot.classList.remove('active'));
        dots[i].classList.add('active');
    }
    function chan(){
        const cancelAddressBtn = document.getElementById('cancel-address');
        const cancelAddressBtn1 = document.getElementById('cancel-address1');
        const addadress=document.getElementById("openaddressblock");
        const addadressbtn=document.getElementById("openaddress");
        const addressform=document.getElementById("addressform")
        cancelAddressBtn.addEventListener('click', () => {
            addressform.style.display='none';
            addadress.style.display='flex';
            });
        cancelAddressBtn1.addEventListener('click', () => {
            addressform.style.display='none';
            addadress.style.display='flex';
            });
        addadressbtn.addEventListener('click', () => {
            addadress.style.display='none';
            addressform.style.display='block';
            });
    }
    function addresssubmit(e){
        e.preventDefault();
        const addres = document.getElementById("addressform");
        const address = new FormData(addres)
        const addressObject={}
        address.forEach((value, key) => {
            addressObject[key] = value;
        });
        console.log(addressObject);
        localStorage.setItem("Address",JSON.stringify(addressObject))
        setaddress(addressObject);
        setnewadd(true);
        chan();
    }
   
    function oopen(){
        const showing=document.getElementById(a);
        if(!show){
            showing.style.display = "block";
            setShow(true);
        } else {
            showing.style.display = "none";
            setShow(false);
        }
    }
    const a=order.id;
    const conformstyle=order.conform?{backgroundColor:"transparent",color:"#1eff00ff",padding:"10px",fontSize:"24px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",color:"transparent",padding:"10px",fontSize:"24px",height:"20px",borderRadius:"24px",marginTop:"20px"}
    const packedstyle=order.conform?order.packed?{backgroundColor:"transparent",color:"#1eff00ff",padding:"10px",fontSize:"24px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",padding:"10px",color:"#ff2424ff",fontSize:"30px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",color:"transparent"}
    const Dispatchedstyle=order.packed?order.dispached?{backgroundColor:"transparent",color:"#1eff00ff",padding:"10px",fontSize:"24px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",padding:"10px",color:"#ff2424ff",fontSize:"30px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",color:"transparent"}
    const outfordeleverstyle=order.dispached?order.outfordeliver?{backgroundColor:"transparent",color:"#1eff00ff",padding:"10px",fontSize:"24px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",padding:"10px",color:"#ff2424ff",fontSize:"30px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",color:"transparent"}
    const deleverdstyle=order.outfordeliver?order.deliver?{backgroundColor:"transparent",color:"#1eff00ff",padding:"10px",fontSize:"24px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",padding:"10px",color:"#ff2424ff",fontSize:"30px",height:"20px",borderRadius:"24px",marginTop:"20px"}:{backgroundColor:"transparent",color:"transparent"}
  
    return (
        <section id={ordermode?  "orderpage2":"orderpage"} >
            {ordermode?(
                <div style={{width:"90%",paddingRight:"20px",paddingLeft:"50px",paddingTop:"10px",backgroundColor:"",display:"flex",justifyContent:"space-between"}}>
                    <h1 style={{ color: "white" }}>id : {order.id}</h1>
                    <h1 style={{ color: "white" }}>Order Date : {order.date}</h1>
                    <h1 style={{ color: "white" }}>Total : ₹{order.total}</h1>
                    <button className="saveaddressbutton1" style={{width:"70px",height:"40px"}}  onClick={()=>oopen()}>{show?<FaEyeSlash/>:<FaEye />}</button>
                </div>):
                (<div style={{width:"90%",paddingRight:"20px",paddingLeft:"50px",paddingTop:"10px",backgroundColor:"",display:"flex",justifyContent:"space-between"}} >
                    <h1 style={{ color: "white",fontStyle:'italic',fontSize:"24px"}}>Order Booking Page</h1>
                    <button className="saveaddressbutton1" style={{width:"70px",height:"40px"}}  onClick={()=>changeBody(0)}><FaArrowAltCircleLeft/></button>
                </div>)}
            <div id={a} style={ordermode?({display:"none"}):({display:"block"})}>
            <div style={ordermode?({display:"flex",width:"100%"}):({})}>
            <div style={ordermode?({width:"50%",padding:"24px"}):({})}>
            <div className="sliderholder">
                <div className="slider-container">
                <div className="slider">
                    {orderImage.map((element, index) => (
                        <div key={index} className="slide" onClick={()=>{ changeimage(index)}}>
                            <img src={element.img} alt={element.img} />
                            <div className="info">
                                <span >{element.name}</span>      
                                <span >₹{element.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dots-container">
                {orderImage.map((_, index) => (
                    <span key={index} className={index === 0 ? "dot active" : "dot"} onClick={()=>{ changeimage(index)}}></span>
                ))}
            </div>
            </div>
            <br/>
            <br/>
            <div style={{boxShadow:"0 0 10px rgba(19, 12, 12, 0.9)",backgroundColor:"transparent",padding:"10px"}}>
                <table border={1} cellPadding={10} style={{ color: "white" }} className="tableclass">
                <thead>
                    <tr>
                        <th>{length === 1 ? "Item" : "Items"}</th>
                        <th>Quantity</th>
                        <th> Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((element, index) => (
                        <Addrow 
                            key={element.id} // Unique key for each row
                            element={element}
                            index={index}
                            setOrderList={setOrderList}
                            orderList={orderList}
                            ordermode={ordermode}
                        />
                    ))}
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th><FaRupeeSign/>{total}</th>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>
            <div>
            <section id="address" style={ordermode?({boxShadow:"none", width:"90%",height:"70%"}):({display:"flex"})}>
                <div id="openaddressblock" style={ordermode?({backgroundColor:""}):({width:"95%",display:"flex",justifyContent:"space-between"})}>
                    <div  className="showaddress" style={ordermode?{width:"100%",height:"70%",textAlign:"left",paddingLeft:"0px",fontStyle:"italic",fontSize:"20px"}:{width:"80%",textAlign:"left",paddingLeft:"20px",fontStyle:"italic",fontSize:"20px",backgroundColor:""}}>
                        <section >
                            {newadd?(<p  style={ordermode?{padding:"24px",width:"100%",fontSize:"24px", borderRadius:"24px",boxShadow:"0 10px 20px rgba(0,0,0,0.9)"}:{padding:"24px"}}>
                            <FaAddressBook/> <b>Shipping Address</b><br></br><br></br>
                            <b>Name : {addres.name} | Phone : {addres.phone}</b><br></br>
                            {addres.address}<br></br>{addres.state} {addres.city} {addres.zipCode}
                            </p>):(<p>Add Addresss To Place Order</p>)}
                        </section>
                    </div>
                    <div style={ordermode?({display:"none"}):({textAlign:"right",width:"20%"})}>
                        <button id="openaddress" className="saveaddressbutton1" onClick={()=>chan()}><FaPlus/></button>
                    </div> 
                    <div style={ordermode?({textAlign:"left",width:"100%",fontSize:"24px",boxShadow:"0 10px 20px rgba(0,0,0,0.9)",borderRadius:"40px",padding:"30px"}):({display:"none"})}>
                        <div style={{width:"100%",textAlign:"center"}}>
                            <h1><FaLocationArrow/>  TRACK YOUR ORDER</h1>
                        </div>
                        <div>
                            <ul style={{paddingLeft:"24px",listStyleType:"tick",color:"white",width:"100%"}}>
                                <li><div style={{display:"flex",backgroundColor:"",padding:"2px",width:"90%",height:"60px",justifyContent:"space-between"}}><h1>Order Conformed</h1><div style={conformstyle}>{order.conform?<FaCheckCircle/>:<FaSpinner className="rotate"/>}</div></div></li>
                                <li><div style={{display:"flex",backgroundColor:"",padding:"2px",width:"90%",height:"60px",justifyContent:"space-between"}}><h1>Order Packed</h1><div style={packedstyle}>{order.packed?<FaCheckCircle/>:<FaSpinner className="rotate"/>}</div></div></li>
                                <li><div style={{display:"flex",backgroundColor:"",padding:"2px",width:"90%",height:"60px",justifyContent:"space-between"}}><h1>Order Dispatched</h1><div style={Dispatchedstyle}>{order.dispached?<FaCheckCircle/>:<FaSpinner className="rotate"/>}</div></div></li>
                                <li><div style={{display:"flex",backgroundColor:"",padding:"2px",width:"90%",height:"60px",justifyContent:"space-between"}}><h1>Order Out for Delivery</h1><div style={outfordeleverstyle}>{order.outfordeliver?<FaCheckCircle/>:<FaSpinner className="rotate"/>}</div></div> </li>
                                <li><div style={{display:"flex",backgroundColor:"",padding:"2px",width:"90%",height:"60px",justifyContent:"space-between"}}><h1>Order Delivery</h1><div style={deleverdstyle}>{order.deliver?<FaCheckCircle/>:<FaSpinner className="rotate"/>}</div></div> </li>
                            </ul>
                        </div>
                       <div style={{width:"100%",alignItems:"right",textAlign:"right"}}> <button className="saveaddressbutton" style={{width:"20%",height:"50px"}} onClick={()=>oopen()}>Close</button></div>
                    </div>
                </div>  
                <form style={{display:"none"}} id="addressform" onSubmit={(e)=>addresssubmit(e)}>
                    <div className="form-group">
                        <div className="form-group2">
                            <label htmlFor="name">Name : </label>
                            <input type="text" name="name" id="name"  required/>
                        </div>
                        <div className="form-group2">
                            <label htmlFor="phone" >Phone Number : </label>
                            <input type="tel" id="phone" name="phone" required />
                        </div>
                    </div>
                    <div className="form-group3">
                        <label htmlFor="address" >Address :</label>
                        <textarea id="address" name="address" rows="3" cols="50" required></textarea>
                    </div>
                    <div className="form-group">
                        <div className="form-group2">
                            <label htmlFor="city" >City</label>
                            <input type="text" id="city" name="city" required />
                        </div>
                        <div className="form-group2">
                            <label htmlFor="state" >State</label>
                            <input type="text" id="state" name="state" required />
                        </div>
                        <div className="form-group2" >
                            <label htmlFor="zipCode" >Zip Code</label>
                            <input type="text" id="zipCode" name="zipCode" required />
                        </div>
                    </div>
                    <div className="btngroup" >
                        <div style={{  textAlign:"left",width:"50%",backgroundColor:""}} onClick={()=>chan()}><button type="button" id="cancel-address" >cancel</button></div>
                        <div style={{  textAlign:"right",width:"50%",backgroundColor:""}}><button type="submit" id="cancel-address1" className="saveaddressbutton">Save Address & Continue</button></div>
                    </div>
                </form>
            </section>
            <div style={ordermode?({display:"none"}):({width:"100%", backgroundColor:"",textAlign:"right",paddingTop:"20px"})}>
                <form style={newadd?{display:"block"}:{display:"none"}} onSubmit={(e) => handleOrder(e)} id="order">
                    <input type="hidden" name="orderimage" value={JSON.stringify(orderImage)} />
                    <input type="hidden" name="orderlist" value={JSON.stringify(orderList)} /> 
                    <input type="hidden" name="total" value={total} />
                    <input type="hidden" name="userid" value={userExists ? userid : guestid} />
                    <input type="hidden" name="address" value={JSON.stringify(addres)} />
                    <button type="submit" className="saveaddressbutton" id="oderconform">Order</button>
                </form>
            </div>
            </div>
            </div>
            </div>
        </section>
    );
}

