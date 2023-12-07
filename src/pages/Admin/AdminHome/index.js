import '../Users/User.css'
import './AdminHome.css'

import axios from '../../../API/axios';
import { useState, useEffect } from 'react';
import { FaPowerOff, FaUsers, FaCube,  FaClipboardList} from 'react-icons/fa6';
import { IoAdd } from "react-icons/io5";

function AdminHome() {
    const src = 'http://localhost:3001/';
    const config = {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      };
    
      const [isModalVisible, setModalVisible] = useState(false);
      const [addData, setAddData] =useState({
        role_id: 2,
        fullname: '',
        email: '',
        password: '',
    })
      const [userList, setUserList] = useState([]);
      const [userLength, setUserLength] = useState(null);
      const [proLength, setProLength] = useState(null);
      const [orderLength, setOrderLength] = useState(null);
      const [editingUserId, setEditingUserId] = useState(null);
      const [userData, setUserData] = useState({
        id: '',
        fullname: '',
        email: '',
        phone_num: '',
        gender: '', 
        dob: '',
        address: ''
      });
    
      useEffect(() => {
        axios.get('/users')
          .then((response) => {
            setUserList(response.data);
            setUserLength(response.data.length)
          })
          .catch((error) => {
            console.error('Error fetching user data', error.message);
          })

          axios.get('/products')
            .then(response => {
                setProLength(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });


            axios.get('/orders')
            .then(response => {
                setOrderLength(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
      }, []);
    
      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
      
      const handleGenderChange = (e) => {
        const { value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          gender: value === 'null' ? null : value,
        }));
      };  
    
      const handleEditClick = (userId, user) => {
        // Khi nút "Edit" được nhấn, cập nhật trạng thái editingUserId và userData
        setEditingUserId(userId);
        setUserData(() => ({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          phone_num: user.phone_num,
          gender: user.gender,
          address: user.address
        }));
      }
    
      const handleSaveClick = (e) => {
        e.preventDefault();
    
        try {
          // Kiểm tra từng ô input, nếu bị trống giữ nguyên giá trị ban đầu từ userData
          const updatedData = {
            id: userData.id || undefined,
            fullname: userData.fullname || undefined,
            email: userData.email || undefined,
            phone_num: userData.phone_num || undefined,
            gender: userData.gender || undefined,
            address: userData.address || undefined
          };
    
          // Gửi yêu cầu PUT để cập nhật thông tin người dùng
            axios.put(`/user/update/`, updatedData, config);
    
          // Update the userList state with the updated user data
          setUserList(prevUserList => {
            return prevUserList.map(user => {
              if (user.id === userData.id) {
                // Update the specific user data
                return { ...user, ...updatedData };
              }
              return user;
            });
          });
        } catch (error) {
          console.error('update error:', error);
        }
        setEditingUserId(null);
      }
    
      const handleCancelClick = () => {
        setEditingUserId(null);
      }
    
      // thực hiện vô hiệu hoá/tiếp tục hoạt động tài khoản
      const handleToggleUserStatus = (id, user) => {
        let axiosMethod;
        let statusDel;
    
        if (user.deleted !== 1) {
          axiosMethod = axios.put('/user/disable', { id: id });
          statusDel = 'disable';
        } else {
          axiosMethod = axios.put('/user/enable', { id: id });
          statusDel = 'enable';
        }
    
        axiosMethod
          .then((response) => {
            //console.log(`User ${statusDel} successfully:`, response.data);
    
            // Update the userList state to reflect the change in user status
            setUserList(prevUserList => {
              return prevUserList.map(u => {
                if (u.id === id) {
                  return { ...u, deleted: user.deleted === 1 ? 0 : 1 };
                }
                return u;
              });
            });
          })
          .catch((error) => {
            console.error(`Error ${statusDel} User:`, error);
          });
      };


      //thực hiện các chức năng add admin
      const handleCancelModal = () => {
        setModalVisible(false);
      }
    
      const handleOpenModal = () =>{
        setModalVisible(true);
      }
      
      const handleAddChange = (e) => {
        const { id, value } = e.target;
        setAddData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

      const handleAddClick = async (e) =>{
        e.preventDefault();
      
        try {
            const addedData = {
                role_id: 2,
                fullname: addData.fullname,
                email: addData.email,
                password: addData.password,
            };
        
            console.log('add data: ',addedData);
        
            const response = await axios.post('/user/add/', addedData, config);
            console.log('response: ', response);

            const updatedResponse = await axios.get('/users');
            setUserList(updatedResponse.data);
    
        } catch (error) {
          console.error('Update error:', error);
        }
        setModalVisible(false);
      }      

    return ( 
        <>
            <div className="admin-home-container">
                <div className="dashboard-admin-container">
                    <div className="dashboard-col-3">
                        <div className="dashboard-item">
                            <div className='user-list-title'>
                                <h3>Users</h3>
                            </div>
                            <div className='user-list-content dashboard-admin-content'>
                                <FaUsers />
                                <span>{userLength}</span>
                            </div>                            
                        </div>
                        <div className="dashboard-item">
                            <div className='user-list-title'>
                                <h3>Products</h3>
                            </div>
                            <div className='user-list-content dashboard-admin-content'>
                                <FaCube/>
                                <span>{proLength}</span>
                            </div>                            
                        </div>
                        <div className="dashboard-item">
                            <div className='user-list-title'>
                                <h3>Orders</h3>
                            </div>
                            <div className='user-list-content dashboard-admin-content'>
                                <FaClipboardList/>
                                <span>{orderLength}</span>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="admin-list-container">
                    <div className='user-list-item'>
                        <div className='user-list-header'>
                            <div className='user-list-title'>
                            <h3>Admins list</h3>
                            </div>
                        </div>
                        <div className='user-list-content'>
                            <div className='add-product-btn' onClick={handleOpenModal}>
                                <IoAdd/>Add more admin
                            </div>
                            <div className='list-table-container'>
                            <table className='table user-list-table'>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Admin</th>
                                    <th>Phone-number</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* Map over user list then display them */}
                                {userList.map((user) => (
                                    user.role_id === 2 ? (
                                    <tr key={user.id}>
                                        <td>
                                        <span>{user.id}</span>
                                        </td>
                                        <td>
                                        <div className='td-contain-info'>
                                            <div className='user-img-list'>
                                            <img src={src+user.avatar} alt='user-img' />
                                            </div>
                                            <div className='user-info-list'>
                                            {editingUserId === user.id ? (
                                                // Nếu đang chỉnh sửa, hiển thị các input để nhập thông tin mới
                                                <>
                                                <input
                                                    type='text'
                                                    value={userData.fullname}
                                                    id='fullname'
                                                    onChange={handleInputChange}
                                                /><br />
                                                <input
                                                    type='text'
                                                    id='email'
                                                    value={userData.email}
                                                    onChange={handleInputChange}
                                                />
                                                </>
                                            ) : (
                                                // Nếu không phải đang chỉnh sửa, hiển thị thông tin người dùng
                                                <>
                                                <h4>{user.fullname}</h4>
                                                <span>{user.email}</span>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                        </td>
                                        <td>
                                        {editingUserId === user.id ? (
                                            <>
                                            <input
                                                type='text'
                                                value={userData.phone_num}
                                                id='phone_num'
                                                onChange={handleInputChange} />
                                            </>
                                        ) : (
                                            <>
                                            <span>{user.phone_num}</span>
                                            </>
                                        )}
                                        </td>
                                        <td>
                                            {editingUserId === user.id ? (
                                                <>
                                                <select
                                                    value={userData.gender !== null ? userData.gender : 'null'}
                                                    onChange={(e) => {
                                                    handleGenderChange(e);
                                                    handleInputChange(e);
                                                    }}
                                                >
                                                    <option value='null'>Select Gender</option>
                                                    <option value='male'>Male</option>
                                                    <option value='female'>Female</option>
                                                    <option value='other'>Other</option>
                                                </select>
                                                </>
                                            ) : (
                                                <>
                                                <span>{user.gender || ''}</span>
                                                </>
                                            )}
                                        </td>
                                        <td>
                                        {editingUserId === user.id ? (
                                            <>
                                            <input
                                                type='text'
                                                value={userData.address}
                                                id='address'
                                                onChange={handleInputChange} />
                                            </>
                                        ) : (
                                            <>
                                            <span>{user.address}</span>
                                            </>
                                        )}
                                        </td>
                                        <td>
                                        {editingUserId === user.id ? (
                                            // Nếu đang chỉnh sửa, hiển thị nút "Save" và "Cancel"
                                            <>
                                            <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                                            <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                                            </>
                                        ) : (
                                            // Nếu không phải đang chỉnh sửa, hiển thị nút "Edit"
                                            <button className='edit-list-btn' onClick={() => handleEditClick(user.id, user)}>Edit</button>
                                        )}
                                        </td>
                                        <td>
                                        <div
                                            className={`switch-icon ${user.deleted === 1 ? 'disable-check' : ''}`}
                                            onClick={() => handleToggleUserStatus(user.id, user)}
                                        >
                                            <FaPowerOff />
                                        </div>
                                        </td>
                                    </tr>
                                    ) : null
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            {/* modal add */}
            <div className={`modal-add ${isModalVisible ? 'modal-visible' : 'modal-hidden'}`}>
                <div className='modal-container'>
                    <div className='modal-header'>
                        <h3>ADD ADMIN</h3>
                    </div>
                    <div className='modal-content'>
                        <div className='modal-input-area'>
                            <input
                                type='text'
                                placeholder='Admin full name'
                                id='fullname'
                                onChange={handleAddChange} 
                            />
                            <input
                                type='text'
                                placeholder='admin email'
                                id='email'
                                onChange={handleAddChange} 
                            />
                            <input
                                type='password'
                                placeholder='Initialization password'
                                id='password'
                                onChange={handleAddChange} 
                            />
                        </div>
                        <div className='access-modal-button'>
                            <button className='submit-modal-btn' onClick={handleAddClick}>ADD</button>
                        </div>
                        <div className='cancel-modal-button'>
                            <button className='submit-modal-btn modal-cancel' onClick={handleCancelModal}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default AdminHome;