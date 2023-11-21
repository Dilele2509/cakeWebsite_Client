import React, { useState, useEffect } from 'react';
import axios from '../../../API/axios';
import './User.css'; // Import CSS file
import { FaPowerOff } from "react-icons/fa6";

function Users() {
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  };

  const [userList, setUserList] = useState([]);
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
    // Gọi API để lấy danh sách người dùng
    axios.get('/users')
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data', error.message);
      })
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
        dob: userData.dob || undefined,
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

  return (
    <div className='user-list-container'>
      <div className='row-item'>
        <div className='user-list-item'>
          <div className='user-list-header'>
            <div className='user-list-title'>
              <h3>Users list</h3>
            </div>
          </div>
          <div className='user-list-content'>
            <div className='list-table-container'>
              <table className='table user-list-table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Phone-number</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over user list then display them */}
                  {userList.map((user) => (
                    user.role_id !== 2 ? (
                      <tr key={user.id}>
                        <td>
                          <span>{user.id}</span>
                        </td>
                        <td>
                          <div className='td-contain-info'>
                            <div className='user-img-list'>
                              <img src={user.avatar} alt='user-img' />
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
                            <span>{user.deleted}</span>
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
  );
}

export default Users;
