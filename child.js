import React from 'react';
import Child from './child.js';
function child(){
    const name ="chioma";
    let department ="software Engineering";
    let M_num = "24/0897";
    

    return(
        <div>
            <h1>My name is {name}</h1>
           <p>My Department is {department}</p>
           <p>My age is {age}</p>
           <p>My matric number is {M_num}</p>
           
           
        </div>
    );
}
export default Child