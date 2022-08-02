import styled from "styled-components";
import Quick from "../../assets/Introduction/thunder.svg"
import Star from "../../assets/Introduction/Star.svg"
import shield from "../../assets/Introduction/Shield.svg"
import Like from "../../assets/Introduction/Like.svg"

function Advertisement(){

    return (
        <Div>
            <div className="advertisement">
                <div className="ad_items">
                    <img src={Quick} alt="" />
                    <div className="content">
                        <h3>Quick Delivery</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    </div>
                </div>

                <div className="ad_items">
                    <img src={Star} alt="" />
                    <div className="content">
                        <h3>Seru Payment</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    </div>
                </div>

                <div className="ad_items">
                    <img src={shield} alt="" />
                    <div className="content">
                        <h3>Return Guarantee</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    </div>
                </div>

                <div className="ad_items">
                    <img src={Like} alt="" />
                    <div className="content">
                        <h3>Quick Delivery</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    </div>
                </div>
            </div>
        </Div>
    )
}
export default Advertisement;
const Div= styled.div`
    padding-top: 60px;
    color: #ffffff;
    .advertisement{
        display: flex;
        justify-content: space-evenly;
        .ad_items{
            display: flex;
            img{
                width: 90px;
                margin-right: 20px;
                margin-top: 15px;
            }
            .content{
                width: 230px;
                font-size: 16px;
            }
        }
    }
`;