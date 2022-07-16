import React, { Component } from "react";
import styled from "styled-components";
import ProductService from "../../services/ProductService";

class Category extends React.Component{
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this)
        this.state={
        categories:[],
        categories2:[],
        searchItem:""
       }
        
    }
    // input search category
    onChangeSearch(searchItem){
       // console.log(searchItem.target.value)
       this.setState({searchItem:searchItem.target.value})
        if(searchItem.target.value !== ""){
            const newCategoryList = this.state.categories.filter((category)=>{
                 return  Object.values(category)
                 .join(" ").toString()
                 .toLowerCase()
                 .includes(this.state.searchItem.toLowerCase());
                 
            });
            console.log(newCategoryList);
           this.setState({categories:newCategoryList})
        }else{
            this.setState({categories:this.state.categories2})
        }
         
    };

    componentDidMount(e){
        ProductService.getCategory().then(
            (res)=>{
               this.setState({
                    categories:res.data,
                    categories2:res.data    
                })
            },
            (err)=>{
                console.log(err)
            }
        )
    }
  render(){
    return (
        <Div>
           <div className="category">
               <div className="search">
                   <i className="fa fa-search"></i>
                   <input 
                        type="text" 
                        name="" 
                        id="" 
                        onChange={this.onChangeSearch}
                    />
               </div>
               <div className="Popular-category">
                   <form action="">
                        {
                            this.state.categories.map(
                                category=>
                                    <div className="category_item">
                                        <input type="checkbox" name="" id={category.name}    /><label for={category.name}>{category.name}</label>
                                    </div>
                                
                            )
                        }
                   </form>

               </div>
               <div className="new-book">

               </div>
           </div>
        </Div>
    )
  }
}
export default Category;
const Div = styled.div`
    background-color: #2C2828;
  //  min-width: 110%;
    label{
        color: #ffffff;
        top: 2px;
        position: relative;
        cursor: pointer;
         
    }
    .category{
        .search{
            i{
                position: absolute;
                margin-left: 12px;
                margin-top: 11px;
                cursor: pointer;
                font-size: 20px;
            }
            input{
                
                outline: none;
                border: none;
                min-height: 25px;
                padding-left: 18%;
                width: 95%;
                
            }
         }
        .Popular-category{
            
            Form{
                display: flex;
                flex-direction: column;
              .category_item{
                    padding-left: 20px;
                    margin-right: 10px;
                    border-bottom: 1px solid #ffffff;
                    border-bottom-width: 1px;
                    label{
                        top: 10px;
                    }
              }
            }
        }
    }
`;