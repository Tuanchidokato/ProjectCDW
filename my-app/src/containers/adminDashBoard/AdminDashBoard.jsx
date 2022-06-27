import styled from "styled-components";
import ColDashBoard from "../../components/DashBoard/ColDashBoard";
import Navbar from "../../components/DashBoard/Navbar"
function AdminDashBoard(){
    return (
        <Div>
          {/* <Navbar /> */}
          <ColDashBoard />
        </Div>
    )
}
export default AdminDashBoard;
const Div = styled.div`
    
`;