import React, { useState, useEffect } from 'react';
import axios from '../../../API/axios';
import '../Users/User.css'; // Import CSS file
import './Cat.css';
import {RiDeleteBinLine} from 'react-icons/ri'

function Category() {
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  };

  const [catList, setCatList] = useState([]);
  const [editingCatId, setEditingCatId] = useState(null);
  const [catData, setCatData] = useState({
    id: '',
    name: ''
  });

  useEffect(() => {
    axios.get('/categories')
      .then((response) => {
        setCatList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cat data', error.message);
      })
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCatData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };  

  const handleEditClick = (catId, cat) => {
    setEditingCatId(catId);
    setCatData(() => ({
      id: cat.id,
      name: cat.name
    }));
  }

  const handleSaveClick = (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        id: catData.id || undefined,
        name: catData.name || undefined
      };
        axios.put(`/cat/update/`, updatedData, config);

      setCatList(prevcatList => {
        return prevcatList.map(cat => {
          if (cat.id === catData.id) {
            // Update the specific cat data
            return { ...cat, ...updatedData };
          }
          return cat;
        });
      });
    } catch (error) {
      console.error('update error:', error);
    }
    setEditingCatId(null);
  }

  const handleCancelClick = () => {
    setEditingCatId(null);
  }

  const handleDelCat = (id, cat) => {
    axios.put('/category/disable', { id: id })
      .then((response) => {
        console.log(`category deleted successfully:`, response.data);

        // Update the catList state to reflect the change in cat status
      })
      .catch((error) => {
        console.error(`Error deleted category:`, error);
      });
  };

  return (
    <div className='user-list-container'>
      <div className='row-item'>
        <div className='user-list-item'>
          <div className='user-list-header'>
            <div className='user-list-title'>
              <h3>Category list</h3>
            </div>
          </div>
          <div className='user-list-content'>
            <div className='list-table-container'>
              <table className='table user-list-table cat-list'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over cat list then display them */}
                  {catList.map((cat) => (
                      <tr key={cat.id}>
                        <td>
                          <span>{cat.id}</span>
                        </td>
                        <td>
                            {editingCatId === cat.id ? (
                            <>
                                <input
                                type='text'
                                value={catData.name}
                                id='name'
                                onChange={handleInputChange}
                                />
                            </>
                            ) : (
                            <>
                                <h4>{cat.name}</h4>
                            </>
                            )}
                        </td>
                        <td>
                          {editingCatId === cat.id ? (
                            <>
                              <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                              <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                            </>
                          ) : (
                            <button className='edit-list-btn' onClick={() => handleEditClick(cat.id, cat)}>Edit</button>
                          )}
                        </td>
                        <td>
                          <div
                            className='switch-icon disable-check'
                            onClick={() => handleDelCat(cat.id, cat)}
                          >
                            <RiDeleteBinLine />
                          </div>
                        </td>
                      </tr>
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

export default Category;
