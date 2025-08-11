const openoder = (data,userExists,guestexists,setpage,setorder,setordermode) => {
        if(guestexists |userExists){
            setorder(data)
            console.log("order",data)
            setordermode(false)            
        }
    setpage(1);
    return alert(" click on item to order it");
}
export default function Cart({userExists,data,guestexists,setpage,setorder,setordermode}) {
    return(
        <div className="#" style={{width:"90%",fontSize:"24px",backgroundColor:"transparent",color:"white",textAlign:"right"}}>
             <button  className="btn2"onClick={() => openoder(data,userExists,guestexists,setpage,setorder,setordermode)}>Items {data.length}-Order</button>
        </div>
       )

}