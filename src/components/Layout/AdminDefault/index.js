import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import './AdminDefault.css'

function AdminDefault({children}) {
    return ( 
        <div style={{ display: "flex" , width: '100%', height: '100%'}}>
            <AdminSidebar/>
            <div className="admin-container">
                <AdminHeader/>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
     );
}

export default AdminDefault;