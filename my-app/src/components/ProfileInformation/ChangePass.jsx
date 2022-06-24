import { render } from "@testing-library/react";
import { Component, useState , useEffect} from "react";
import styled from "styled-components";
import authService from "../../services/auth.service";
import InformationUserService from "../../services/InformationUser.service";
import { storage } from "../../config/firebase/firebase";
import Paypal from "./Paypal";
const  ChangePass =()=>{

    const [checkout,setCheckOut]= useState(false)
     
        return(
            <Div>
                <div>
                    {checkout? (
                        <Paypal />
                    ) :(
                    <button
                        onClick={()=>{
                            setCheckOut((true))
                        }}
                    >
                        CheckOut
                    </button>
                    )}
                </div>
            </Div>
        )
}
export default ChangePass;
const Div = styled.div`
    color: #FFFF;
`;