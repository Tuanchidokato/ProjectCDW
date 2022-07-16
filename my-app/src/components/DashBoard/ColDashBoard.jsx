import { Component } from "react";
import styled from "styled-components";
 
function ColDashBoard(){
   
        return(
            <Div>
                   <div className="dash-content">
                        <div className="overview">
                            <div className="title">
                                <i class="fa-solid fa-gauge"></i>
                                <span className="text">DashBoard</span>
                            </div>

                            <div className="boxes">
                                <div className="box box1">
                                    <i className="fa-solid fa-thumbs-up"></i>
                                    <span className="text">Total text</span>
                                    <span className="number">50,120</span>
                                </div>

                                <div className="box box2">
                                    <i className="fa-solid fa-share"></i>
                                    <span className="text">Share</span>
                                    <span className="number">50,120</span>
                                </div>
                                
                                <div className="box box3">
                                    <i className="fa-solid fa-comment"></i>
                                    <span className="text">Comment</span>
                                    <span className="number">50,120</span>
                                </div>
                            </div>
                        </div>

                        <div className="activity">
                            <div className="title">
                                <i class="fa-solid fa-clock"></i>
                                <span className="text">Recent Activity</span>
                            </div>

                            <div className="activity-data">
                                <div className="data names">
                                    <span className="data-title">Name</span>
                                    <span className="data-list">Prem Sahi</span>
                                </div>

                                <div className="data email">
                                    <span className="data-title">Email</span>
                                    <span className="data-list">premshahi@gmail.com</span>
                                </div>

                                <div className="data joined">
                                    <span className="data-title">Joined</span>
                                    <span className="data-list">2022-02-12</span>
                                </div>
                            </div>
                        </div>
                    </div>
            </Div>
        )
}
export default ColDashBoard;
const Div = styled.div`
   .dash-content{
            padding-top: 60px;
            font-size: 20px;
            margin-left: 250px;
            width: calc(100% - 250px);
            transition: var(--tran-05);
            .title{
                display: flex;
                align-items: center;
                margin: 70px 0 30px 0;
                i{
                    position: relative;
                    height: 35px;
                    width: 35px;
                    background-color: var(--primary-color);
                    border-radius: 6px;
                    color: var(--title-icon-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                }
                .text{
                    font-size: 20px;
                    font-weight: 500;
                    color: var(--text-color);
                    margin-left: 10px;
                }
            }
            .boxes{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .box{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 12px;
                    width: calc(100% / 3 - 15px);
                    padding: 15px 20px;
                    background-color: var(--box1-color);
                    .text{
                        white-space: nowrap;
                        font-size: 18px;
                        font-weight: 500;
                        color: var(--text-color);
                    }
                    .number{
                        font-size: 40px;
                        font-weight: 500;
                        color: var(--text-color);
                    }
                    i{
                        font-size: 35px;
                        color: var(--text-color);
                    }
                }
                .box2{
                    background-color: var(--box2-color);
                }
                .box3{
                    background-color: var(--box3-color);
                }
            }

            .activity {
                .activity-data{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    //width: calc(100% / 5 - 15px);
                    .data{
                        display: flex;
                        flex-direction: column;
                        margin: 0 15px;
                    }
                    .data-title{
                        font-size: 20px;
                        font-weight: 500;
                    }
                }
            }
        }
`;