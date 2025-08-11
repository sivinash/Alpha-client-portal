import React from "react";
import Search from "./Search";
import { FaHouseUser,FaSignOutAlt , FaHistory ,FaBolt,FaClipboardList,FaShoppingCart,FaLaptop,FaSignInAlt,FaUserCircle} from "react-icons/fa";
 function Header({changebody, username, userid, userExists,search, setsearch,setUserExists,guestexists,guestid,body}) {
    
    return(
      <header >
          <h1>ALPHA ELECTRICS <br/>
            & ELECTRONICS</h1>
          <Search key="search" changebody={changebody} search={search} setsearch={setsearch}/>
          <nav>
            <button className={body===0?"active":""} onClick={()=>changebody(0)}><FaHouseUser fontSize={"24px"}  /> Home</button>
            <button className={body===6?"active":""} onClick={()=>changebody(6)}><FaBolt fontSize={"24px"} />Electrics</button>
            <button className={body===7?"active":""} onClick={()=>changebody(7)}><FaLaptop fontSize={"24px"}/> Electronics</button>
            {userExists|guestexists?(<button className={body===5?"active":""} onClick={()=>changebody(5)}> <FaHistory fontSize={"24px"} /> Order History</button>):(null)}
            {userExists|guestexists?(<button className={body===4?"active":""} onClick={()=>changebody(4)}><FaClipboardList fontSize={"24px"}  /> My Orders</button>):(null)}
            {userExists|guestexists?(<button className={body===3?"active":""} onClick={()=>changebody(3)}><FaShoppingCart fontSize={"24px"}  /> cart</button>):(null)}
            {userExists?(<button className="loginbutton" onClick={()=>changebody(1)}><FaUserCircle fontSize={"24px"}/> {username}</button>):(guestexists?<button className="loginbutton"><FaUserCircle fontSize={"24px"}/> {guestid}</button>:<button className="loginbutton" onClick={()=>changebody(1)}><FaSignInAlt /></button>)}
            {userExists?(<button className="loginbutton" onClick={()=>{setUserExists(false);localStorage.setItem("exists",false);localStorage.setItem("tokens",null);changebody(0)}}><FaSignOutAlt />logout</button>):(guestexists?(<button className="loginbutton" onClick={()=>changebody(1)}><FaSignInAlt /></button>):(null))}
          </nav>
      </header>
    );
 }
export default Header;