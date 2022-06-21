import React from "react";
import styled from "styled-components";

function Category(){

    return (
        <Div>
           <div className="category">
               <div className="serach">
                   <i className="fa fa-search"></i>
                   <input type="text" name="" id="" />
               </div>
               <div className="Popular-category">
                   <form action="">
                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                       <input type="checkbox" name="" id="" /><span>Memory books</span>

                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                       <input type="checkbox" name="" id="" /><span>Memory books</span>
                   </form>

               </div>
               <div className="new-book">

               </div>
           </div>
        </Div>
    )
}
export default Category;
const Div = styled.div`
    background-color: #2C2828;

`;