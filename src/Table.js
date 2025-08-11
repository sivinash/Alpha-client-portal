import AddItem from "./AddItem";
function cbody({data,userid,userExists,guestexists,guestid,CartIteam,setpage,setorder,setCartIteam,setordermode,newGuest}) {
    const fulliteams = data.length;
    const col = 4;
    const rows = Math.ceil(fulliteams / col);
    const bodyRows = []
    for (let row = 1; row < rows; row++) {
        const rowItems = [];
        for (let st = row * col; st < Math.min((row + 1) * col, fulliteams); st++) {
            rowItems.push(
                <td key={st}>
                    <AddItem item={data[st]} userid={userid} userExists={userExists}
                    guestexists={guestexists}
                    guestid={guestid}
                    CartIteam={CartIteam}
                    setpage={setpage}
                    setorder={setorder}
                    setCartIteam={setCartIteam}
                    setordermode={setordermode}
                    newGuest={newGuest}
                    />
                </td>
            );
        }
        bodyRows.push(<tr key={row}>{rowItems}</tr>);
    }

    return bodyRows;
}

function Table({userExists,data,userid,guestexists,guestid,CartIteam,infomation,setpage,setorder,setCartIteam,setordermode,newGuest}) {
    const fulliteams = data.length;
    const col = fulliteams < 4? fulliteams : 4; 
    return (
        <>
        {fulliteams !== 0 ?(<table className="product-table">
            <thead >
                <tr>
                    {Array.from({ length: col }, (_, index) => (
                        <th key={index}>
                            <AddItem item={data[index]} 
                            userid={userid} 
                            userExists={userExists}
                            guestexists={guestexists}
                            guestid={guestid}
                            CartIteam={CartIteam}
                            setpage={setpage}
                            setorder={setorder}
                            setCartIteam={setCartIteam}
                            setordermode={setordermode}
                            newGuest={newGuest}
                            />
                        </th>
                    ))}
                </tr>
            </thead>
            {fulliteams > 4 && (
                <tbody>
                    {cbody({data,userid,userExists,guestexists,guestid,CartIteam,setpage,setorder,setCartIteam,setordermode,newGuest})}
                </tbody>
            )}
        </table>):
        (<h1 style={{color:"white",fontSize:"24px",justifyContent:"center",textAlign:"center"}}>{infomation}</h1>)};
        </>
    )
}

export default Table;
