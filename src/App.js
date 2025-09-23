import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Ad from "./Ad";
import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Table from "./Table";
import Order from "./Order";
import Cart from "./Cart";

function App() {
  
  const [ordermode, setordermode] = useState(false);
  const [page, setpage] = useState(0);
  const [order, setorder] = useState([]);
  const [infomation, setinformation] = useState("Loading.........");
  const [CartIteam, setCartIteam] = useState([]);
  const [guestexists, setguestexists] = useState(false);
  const [guestid, setguestid] = useState("");
  const [search, setsearch] = useState("");
  const [body, setBody] = useState(0);
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [data, setData] = useState([]);
  const api ="https://alpha-admin-portal-production.up.railway.app";

  useEffect(() => {
    const ex = JSON.parse(localStorage.getItem("guestexist"));
    const Id = localStorage.getItem("guestid");
    console.log(ex,Id)
    if (ex) {
      setguestid(Id);
      setguestexists(true);
      console.log("successs");
    } else {
      console.log("No guest ID found in localStorage");
    }
  }, []);
  
  useEffect(() => {
    console.log("useeffect2.................2");
    fetch(`${api}/get_items`, { method: "GET" }) // Corrected 'methods' to 'method'
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
    setinformation("item no found");
  }, []);

  useEffect(() => {
    console.log("useeffect2.................3");
    const token = JSON.parse(localStorage.getItem("tokens"));
    if (token != null) {
      setUsername(token.username);
      setUserid(token.userid);
      setUserExists(JSON.parse(localStorage.getItem("exists")));
    }
  }, []);

  useEffect(() => {
    console.log("useeffect2.................4");
    const token = JSON.parse(localStorage.getItem("tokens"));
    const ex1 = JSON.parse(localStorage.getItem("guestexist"));
    if (token != null) {
      console.log("kkkkkkkkkk")
      fetch(`${api}/get_cartItem/${token.userid}`,{method:"GET",
            headers: {
            'Content-Type': 'application/json',}
        }).
        then(response => response.json()).then(data => {console.log("cart items cart:", data.cartitem);
        localStorage.setItem("cartitems", data.cartitem);
        }).catch(error => console.error('Error:', error));
    } else if (ex1) {
      const savedCart = JSON.parse(localStorage.getItem("cartitems"));
      if (savedCart) {
        setCartIteam(savedCart);
      }
    } else {
    }
  }, []);

  function togglePassword(id) {
    const passwordInput = document.getElementById(`password${id}`);
    const toggleBtn = document.getElementById(`password-toggle${id}`);
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleBtn.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      toggleBtn.textContent = "Show";
    }
  }
  const newGuest=(id)=>{console.log(id);
    setguestexists(true);
    setguestid(id);
  }

  function showFlashMessage(message, type) {
    const flashContainer = document.getElementById("flash-messages");
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    flashContainer.appendChild(alertDiv);
    // Remove message after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
  const info = (e) => {
    e.preventDefault();
    const form = document.getElementById("loginForm");
    const formData = new FormData(form); // Convert FormData to object for logging
    fetch(`${api}/login`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUsername(data.username);
          setUserid(data.id);
          setUserExists(true);
          localStorage.setItem("exists", true);
          localStorage.setItem(
            "tokens",
            JSON.stringify({ username: data.username, userid: data.id })
          );
          localStorage.setItem("guestexist",false);
          localStorage.setItem("guestid","");
          setguestexists(false);
          setguestid("")
          changeBody(0);
        } else {
          setUserExists(false);
          showFlashMessage(data.message, "error");
          console.error("Login failed:", data.message);
        }
      })
      .catch((error) => console.error("Error during login:", error));
  };

  const changeBody = (change) => {
    if(change===3){
      if (change === 3 && CartIteam.length === 0) {setinformation("Cart is empty");}
      else if (change === 3 && CartIteam.length > 0) {setinformation("item not found in Cart");} 
      else {setinformation("item not found");}
      setBody(change);
    }
    else if (change === 0) {
      setpage(0);
      setBody(change);
    }
    else if (change === 4) {
      fetch(`${api}/get_order/${userExists ? userid : guestid}`)
        .then((response) => response.json())
        .then((data) => {
          setorder(data.orders);
          setBody(change);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
        });
      setordermode(true);
      
    }
    else if (change === 5) {
      fetch(`${api}/get_order_history/${userExists ? userid : guestid}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.order)
          setorder(data.orders);
          setBody(change);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
        });
      setordermode(true);
    }
    else{
      setBody(change);
    }
    setsearch('')
  };
  return (
    <section>
      {page === 0 ? (
        <>
          <Header
            changebody={changeBody}
            username={username}
            userid={userid}
            userExists={userExists}
            setUserExists={setUserExists}
            search={search}
            setsearch={setsearch}
            guestexists={guestexists}
            guestid={guestid}
            body={body}
          />
          {body === 1 ? (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Login
                changeBody={changeBody}
                username={username}
                userid={userid}
                info={info}
                userExists={userExists}
                togglePassword={togglePassword}
                api={api}
              />
            </div>
          ) : body === 2 ? (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                minHeight:"700px"
              }}
            >
              <Register
                changeBody={changeBody}
                showFlashMessage={showFlashMessage}
                togglePassword={togglePassword}
                api={api}
              />
            </div>
          ) : body === 3 ? (
            <div style={{display:"block",minHeight:"700px"}}>
              <Cart
                userExists={userExists}
                data={data.filter((data) => CartIteam.includes(data.id))}
                guestexists={guestexists}
                setpage={setpage}
                setorder={setorder}
                setordermode={setordermode}
                api={api}
              />
              <Table
                userExists={userExists}
                userid={userid}
                data={data
                  .filter((data) => CartIteam.includes(data.id))
                  .filter((data) =>
                    data.name
                      .toLocaleLowerCase()
                      .replace(/\s+/g, "")
                      .includes(search.toLocaleLowerCase().replace(/\s+/g, ""))
                  )}
                guestexists={guestexists}
                guestid={guestid}
                CartIteam={CartIteam}
                infomation={infomation}
                setpage={setpage}
                setorder={setorder}
                setCartIteam={setCartIteam}
                setordermode={setordermode}
                newGuest={newGuest}
                api={api}
              />
            </div>
          ) : body === 4 ? (
            <div style={{minHeight:"300px"}}>
              {order===undefined ?
              (<div style={{width:"100%",color:"white",fontSize:'24px',alignContent:"center",fontStyle:"italic",textAlign:"center",paddingTop:"100px"}}><h1>No Active Orders</h1></div>)
              :
              (order.filter(order=>{
                const searchTerm = (search).toLowerCase().replace(/\s+/g, "");
                const id = (order.id).toLowerCase().replace(/\s+/g, "");
                const date=String(order.date)
                const price=String(order.total)
                return id.includes(searchTerm)||price.includes(searchTerm)||date.includes(searchTerm);
              }))!=0?((order.filter(order=>{
                const searchTerm = (search).toLowerCase().replace(/\s+/g, "");
                const id = (order.id).toLowerCase().replace(/\s+/g, "");
                const date=String(order.date)
                const price=String(order.total)
                return id.includes(searchTerm)||price.includes(searchTerm)||date.includes(searchTerm);
              }))
              .map((element) => (
              <>
                <Order
                  userExists={userExists}
                  userid={userid}
                  guestexists={guestexists}
                  guestid={guestid}
                  order={element}
                  ordermode={ordermode}
                  setordermode={setordermode}
                  changeBody={changeBody}
                  setpage={setpage}
                  api={api}
                />
              </>
            ))):(<div style={{width:"100%",color:"white",fontSize:'24px',alignContent:"center",fontStyle:"italic",textAlign:"center",paddingTop:"100px"}}><h1>Searched Order Not Found</h1></div>)
            }
            </div>
          ): body === 5 ? (
            <div style={{minHeight:"300px"}}>
              {order===0?
              (<div style={{width:"100%",color:"white",fontSize:'24px',alignContent:"center",fontStyle:"italic",textAlign:"center",paddingTop:"100px"}}><h1>No Previews Order History Found</h1></div>)
              :
              (order.filter(order=>{
                const searchTerm = (search).toLowerCase().replace(/\s+/g, "");
                const id = (order.id).toLowerCase().replace(/\s+/g, "");
                const date=String(order.date)
                const price=String(order.total)
                return id.includes(searchTerm)||price.includes(searchTerm)||date.includes(searchTerm);
              }))!=0?((order.filter(order=>{
                const searchTerm = (search).toLowerCase().replace(/\s+/g, "");
                const id = (order.id).toLowerCase().replace(/\s+/g, "");
                const date=String(order.date)
                const price=String(order.total)
                return id.includes(searchTerm)||price.includes(searchTerm)||date.includes(searchTerm);
              }))
              .map((element) => (
              <>
                <Order
                  userExists={userExists}
                  userid={userid}
                  guestexists={guestexists}
                  guestid={guestid}
                  order={element}
                  ordermode={ordermode}
                  setordermode={setordermode}
                  changeBody={changeBody}
                  setpage={setpage}
                  api={api}
                />
              </>
            ))):(<div style={{width:"100%",color:"white",fontSize:'24px',alignContent:"center",fontStyle:"italic",textAlign:"center",paddingTop:"100px"}}><h1>Searched Order Not Found History</h1></div>)
            }
            </div>
          ): body === 6 ?(
            <>
            <Table
                userExists={userExists}
                userid={userid}
                data={(data.filter((data) =>data.type===1)).filter(item => {
                  const searchTerm = (search).toLowerCase().replace(/\s+/g, "");
                  const name = (item.name).toLowerCase().replace(/\s+/g, "");
                  const details = (item.details).toLowerCase().replace(/\s+/g, "");
                  const price=String(item.price)
                  return name.includes(searchTerm) || details.includes(searchTerm)||price.includes(searchTerm);
                })}
                guestexists={guestexists}
                guestid={guestid}
                CartIteam={CartIteam}
                infomation={infomation}
                setpage={setpage}
                setorder={setorder}
                setCartIteam={setCartIteam}
                setordermode={setordermode}
                newGuest={newGuest}
                api={api}
              />
            </>
          ) : body === 7 ?(
            <>
            <Table
                userExists={userExists}
                userid={userid}
                data={(data.filter((data) =>data.type===2)).filter(item => {
                  const searchTerm = (search).toLowerCase().replace(/\s+/g, "");
                  const name = (item.name).toLowerCase().replace(/\s+/g, "");
                  const details = (item.details).toLowerCase().replace(/\s+/g, "");
                  const price=String(item.price)
                  return name.includes(searchTerm) || details.includes(searchTerm)||price.includes(searchTerm);
                })}
                guestexists={guestexists}
                guestid={guestid}
                CartIteam={CartIteam}
                infomation={infomation}
                setpage={setpage}
                setorder={setorder}
                setCartIteam={setCartIteam}
                setordermode={setordermode}
                newGuest={newGuest}
                api={api}
              />
            </>
          ) : (
            <>
              <Ad />
              <Table
                userExists={userExists}
                userid={userid}
                data={data.filter(item => {
                  const searchTerm = (search).toLowerCase().replace(/\s+/g, "");
                  const name = (item.name).toLowerCase().replace(/\s+/g, "");
                  const details = (item.details).toLowerCase().replace(/\s+/g, "");
                  const price=String(item.price)
                  return name.includes(searchTerm) || details.includes(searchTerm)||price.includes(searchTerm);
                })}
                guestexists={guestexists}
                guestid={guestid}
                CartIteam={CartIteam}
                infomation={infomation}
                setpage={setpage}
                setorder={setorder}
                setCartIteam={setCartIteam}
                setordermode={setordermode}
                newGuest={newGuest}
                api={api}
              />
            </>
          )}
          <Footer />
        </>
      ) : (
        <Order
          userExists={userExists}
          userid={userid}
          guestexists={guestexists}
          guestid={guestid}
          order={order}
          ordermode={ordermode}
          setordermode={setordermode}
          changeBody={changeBody}
          setpage={setpage}
          api={api}
        />
      )}
    </section>
  );
}

export default App;
