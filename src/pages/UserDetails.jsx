// File: src/pages/UserDetail.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {  updateUser } from '../redux/usersSlice';

export default function UserDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const { id } = useParams();
const user = useSelector((state) =>
  state.users.users.find((u) => u.id === parseInt(id))
);

  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 'active' : 'inactive') : value;
    setEditedUser({ ...editedUser, [name]: newValue });
  };

  const handleSave = () => {
    dispatch(updateUser({ id: editedUser.id, updatedData: editedUser }));
    setIsEditing(false);
  };
  const handleEdit = ()=>{
    setIsEditing(true);
    setEditedUser(user)
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-3xl font-bold text-orange-600">
          {user.firstName.charAt(0)}
        </div>

        {/* Name */}
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {user.firstName} {user.lastName} <span className="text-blue-500 text-lg">✔</span>
        </h2>
        <p className="text-gray-500">{user.firstName.toLowerCase()}@example.com</p>
      </div>

      {/* Info */}
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">First Name:</span>
          {isEditing ? (
            <input
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-1/2 text-right"
            />
          ) : (
            <span className="text-gray-900">{user.firstName}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Last Name:</span>
          {isEditing ? (
            <input
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-1/2 text-right"
            />
          ) : (
            <span className="text-gray-900">{user.lastName}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Date of Birth:</span>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={editedUser.dob}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-1/2 text-right"
            />
          ) : (
            <span className="text-gray-900">{user.dob}</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          {isEditing ? (
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="status"
                checked={editedUser.status === 'active'}
                onChange={handleChange}
                className="form-checkbox text-green-600"
              />
              <span className="text-sm">{editedUser.status === 'active' ? 'Active' : 'Inactive'}</span>
            </label>
          ) : (
            <span
              className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                user.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back
        </button>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => handleEdit()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
