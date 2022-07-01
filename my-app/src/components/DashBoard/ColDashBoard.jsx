import { Component } from "react";
import styled from "styled-components";
import { useTranslation,Trans } from 'react-i18next'
import { Dropdown } from "react-bootstrap";
const lngs = {
    en: { nativeName: 'English' },
    vi: { nativeName: 'Vietnamese' }
  };
function ColDashBoard(){
    const { t,i18n }= useTranslation();
   
        return(
            <Div>
                <Dropdown>
                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                         <i  className="language fa-solid fa-language"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Div>
        )
}
export default ColDashBoard;
const Div = styled.div`
  background-color  :#FFF !important;
  color: #000000;
`;