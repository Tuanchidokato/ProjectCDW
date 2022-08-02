import styled from "styled-components";
import book1 from "../../assets/bookStudent/image 2.png"
import book2 from "../../assets/bookStudent/image 3.png"
import book3 from "../../assets/bookStudent/image 4.png"
import book4 from "../../assets/bookStudent/image 5.png"
import book5 from "../../assets/bookStudent/image 6.png"
import book6 from "../../assets/bookStudent/image 7.png"

function Recommend(){
    

    return (
        <Div>
            <div className="recommend_section">
                <div className="management_recommend">
                    <div className="recommend_ item">
                        <div className="title_content">
                            <h2>Recommend for you</h2>
                            <p>Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào 
                                việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được sử 
                                dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500,
                            </p>
                        </div>
                        <div className="product_content">
                            <img src={book1} alt="" />
                            <img src={book2} alt="" />
                            <img src={book3} alt="" />

                        </div>
                    </div>
                    <div className="popular_ item">
                        <div className="title_content">
                            <h2>Popular in 2021</h2>
                            <p>Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào 
                                việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được sử 
                                dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500,
                            </p>
                        </div>
                        <div className="product_content">
                            <img src={book1} alt="" />
                            <img src={book2} alt="" />
                            <img src={book3} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </Div>
    )
}
export default Recommend;
const Div= styled.div`
    color: aliceblue;
    padding-top: 60px;
    .management_recommend{
        display: flex;
        justify-content: space-evenly;
        .item{
            width: 45%;
            border-radius: 5px;
            border: 1px solid #FFFFFF;
            .title_content{
                margin-left: 60px;
                width: 70%;
            }
            .product_content{
                display: flex;
                justify-content: space-evenly;
                img{
                    cursor: pointer;
                }
            }

        }
    }
`;