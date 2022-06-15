import User from "../../assets/bookStudent/image 2.png"
import styled from "styled-components"
function Navbar(){
    return(
        <Div>
            <div className="container-fluid">
               <nav className="navbar-custom">
                    <ul className="navbar-right">
                        <li className="dropdown">
                            <div className="image_">
                                <img  src={User} alt="" />
                            </div>
                        </li>
                    </ul>

               </nav>
            </div>
        </Div>
    )
}
export default Navbar;
const Div = styled.div`
    background-color: #000000;
    height: 60px;
    .navbar-right{
        float: right;
        li{
            .image_{
                margin-top:10px;
                width: 40px;
                height: 40px;
                position: relative;
                overflow: hidden;
                border-radius: 50%;
                border: 2px solid #FFFF;
                img{
                    display: inline;
                    margin: 0 auto;
                    width: auto;
                }
            }
        }
}
`
