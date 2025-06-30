import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, updateUser} from '../redux/usersSlice';
import { useNavigate } from 'react-router-dom';

//Sample mock user data
const mockUsers = [
  { id: 1, firstName: 'Harsh', lastName: 'Jangid', dob: '2000-05-12', status: 'active' },
  { id: 2, firstName: 'Rachel', lastName: 'Doe', dob: '1995-11-20', status: 'inactive' },
  { id: 3, firstName: 'Costa', lastName: 'Quinn', dob: '1992-03-08', status: 'inactive'},
  { id: 4, firstName: 'Anna', lastName: 'Richard', dob: '1998-07-15', status: 'active'},
  { id: 5, firstName: 'Bob', lastName: 'Dean', dob: '1991-01-23', status: 'active' },
  { id: 6, firstName: 'Charlie', lastName: 'Davis', dob: '1993-10-30', status: 'inactive'},
];
// Color mapping for status badges
const statusColor = {
  active: 'text-green-600 bg-green-200',

  inactive: 'text-red-600 bg-red-200'
};

export default function UserTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   // Getting users from redux store
  const users = useSelector((state) => state.users.users);
  // Local state for editing and pagination
  const [editId, setEditId] = useState(null); // ID of the row currently being edited
  const [editedData, setEditedData] = useState({});// Form data for the editable row
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

   // ⬇️ set mock data initially in redux
 useEffect(() => {
  if (users.length === 0) {
    dispatch(setUsers(mockUsers)); // sirf ek hi baar jab data khali ho
  }
}, [dispatch, users]);

 // ⬇️ Start editing a user
  const handleEdit = (user) => {
    setEditId(user.id);
    setEditedData(user);
  };
// ⬇️ Save updated user to Redux store
  const handleSave = () => {
    dispatch(updateUser({ id: editId, updatedData: editedData }));
    setEditId(null);
    setEditedData({});
  };
 // ⬇️ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 'active' : 'inactive') : value;
    setEditedData({ ...editedData, [name]: newValue });
  };
// ⬇️ Pagination logic
  const start = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = users.slice(start, start + rowsPerPage);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="mb-4 flex justify-between items-center">
        {/* Rows Per Page Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Rows per page:</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            value={rowsPerPage}
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          Showing {paginatedUsers.length} of {users.length}
        </div>
      </div>

      {/* Users Table */}
      <div className='overflow-x-auto whitespace-nowrap'>
        <table className="w-full text-sm text-left border  ">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
             <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">First Name</th>
             <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">DOB</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => {
            const isEditing = editId === user.id;
           

            return (
              <tr
                key={user.id}
                onClick={() => {
                  if (!isEditing) {
                    
                    navigate(`/user/${user.id}`);
                  }
                }}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-2 font-medium flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-center text-xs font-bold flex items-center justify-center">
                    {user.firstName.charAt(0)}
                  </div>
                </td>
                 <td className="px-4 py-2">
                   {isEditing ? (
                    <input
                      name="firstName"
                      value={editedData.firstName}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                  <td className="px-4 py-2">
                   {isEditing ? (
                    <input
                      name="lastName"
                      value={editedData.lastName}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    user.lastName
                  )}
                </td>
               <td className="px-4 py-2 ">
  {isEditing ? (
    <label className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        name="status"
        checked={editedData.status === 'active'}
        onChange={handleChange}
        className="form-checkbox h-4 w-4 text-green-600"
      />
      <span className="text-sm">{editedData.status === 'active' ? 'Active' : 'Inactive'}</span>
    </label>
  ) : (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusColor[user.status]}`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
    </span>
  )}
</td>

                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={editedData.dob}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    user.dob
                  )}
                </td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(user);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
   {/* Pagination */}
      <div className="mt-4 flex gap-2 justify-center">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
