import React, { useState } from "react";

function Child(props) {
  const [firstName,setFirstName] = useState("")
  const handleClick = (e) => {
    e.preventDefault()
    // console.log(firstName);
    const name = firstName
    console.log(name);
    
    props.onDataFromChild(name)
    // props.setDataFromChild(name)
  };
  return (
    <div>
      <form action=""onSubmit={handleClick}>
      <input type="text" placeholder="iam child" onChange={(e)=>setFirstName(e.target.value)}  />
      <button type="submit"> click me </button>
      </form>
    </div>
  );
}

export default Child;
