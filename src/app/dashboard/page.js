'use client';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from '@/context/AuthContext';
import { GrAdd } from "react-icons/gr";
import { ImManWoman } from "react-icons/im";
import { TbAffiliate } from "react-icons/tb";

const MySwal = withReactContent(Swal);

const DashBoardPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('add-name');
  const [names, setNames] = useState([]);
  const [users, setUsers] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentName, setCurrentName] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading, role, setLoading } = useAuth();
  const [affiliates, setAffiliates] = useState([]);
  const [isAddingAffiliate, setIsAddingAffiliate] = useState(false);
  const [currentAffiliate, setCurrentAffiliate] = useState(null);


  const fetchNames = async () => {
    try {
      const res = await axios.get('https://babynamegenarate.vercel.app/names');
      setNames(res.data);
    } catch (err) {
      console.error('Error fetching names:', err);
      MySwal.fire('Error', 'Failed to fetch names', 'error');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://babynamegenarate.vercel.app/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      MySwal.fire('Error', 'Failed to fetch users', 'error');
    }
  };


  const fetchAffiliates = async () => {
    try {
      const res = await axios.get('https://babynamegenarate.vercel.app/affiliates');
      setAffiliates(res.data);
    } catch (err) {
      console.error('Error fetching affiliates:', err);
      MySwal.fire('Error', 'Failed to fetch affiliates', 'error');
    }
  };

  useEffect(() => {
    if (selectedMenu === 'all-names') {
      fetchNames();
    }
    if (selectedMenu === 'all-users') {
      fetchUsers();
    }
    if (selectedMenu === 'affiliate') {
      fetchAffiliates();
    }
  }, [selectedMenu]);

  const handleDelete = async (id, name) => {
    const { value: confirmName } = await MySwal.fire({
      title: 'Confirm Deletion',
      html: `
        <p>Type the name <strong>${name}</strong> to confirm deletion:</p>
      `,
      input: 'text',
      inputPlaceholder: 'Type the name here',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      preConfirm: (inputValue) => {
        if (inputValue !== name) {
          Swal.showValidationMessage('Name does not match');
        }
        return inputValue;
      }
    });

    if (confirmName === name) {
      try {
        await axios.delete(`https://babynamegenarate.vercel.app/names/${id}`);
        setNames((prev) => prev.filter((item) => item._id !== id));
        MySwal.fire('Deleted!', 'The name has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        MySwal.fire('Error', 'Failed to delete the name.', 'error');
      }
    }
  };

  const handleMakeAdmin = async (id, email) => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Confirm Action',
      html: `Are you sure you want to make <strong>${email}</strong> an admin?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, make admin',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (isConfirmed) {
      try {
        await axios.put(`https://babynamegenarate.vercel.app/users/make-admin/${id}`);
        MySwal.fire('Success!', 'User role updated to admin', 'success');
        fetchUsers();
      } catch (err) {
        console.error(err);
        MySwal.fire('Error', 'Failed to update user role', 'error');
      }
    }
  };

  const handleRemoveAdmin = async (id, email) => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Confirm Action',
      html: `Are you sure you want to remove admin role from <strong>${email}</strong>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove admin',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (isConfirmed) {
      try {
        await axios.put(`https://babynamegenarate.vercel.app/users/remove-admin/${id}`);
        MySwal.fire('Success!', 'Admin role removed', 'success');
        fetchUsers();
      } catch (err) {
        console.error(err);
        MySwal.fire('Error', 'Failed to remove admin role', 'error');
      }
    }
  };


  const handleDeleteAffiliate = async (id, title) => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Confirm Deletion',
      html: `Are you sure you want to delete <strong>${title}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (isConfirmed) {
      try {
        await axios.delete(`https://babynamegenarate.vercel.app/affiliates/${id}`);
        setAffiliates(prev => prev.filter(item => item._id !== id));
        MySwal.fire('Deleted!', 'The affiliate has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        MySwal.fire('Error', 'Failed to delete the affiliate.', 'error');
      }
    }
  };


  const openUpdateModal = (name) => {
    setCurrentName(name);
    setIsUpdateModalOpen(true);
    updateFormik.setValues({
      name: name.name,
      meaning: name.meaning,
      scripture: name.scripture || '',
      theme: name.theme || ''
    });
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentName(null);
    updateFormik.resetForm();
  };

 const startAddingAffiliate = () => {
    setCurrentAffiliate(null);
    setIsAddingAffiliate(true);
    affiliateFormik.resetForm();
  };


  const startEditingAffiliate = (affiliate) => {
    setCurrentAffiliate(affiliate);
    setIsAddingAffiliate(true);
    affiliateFormik.setValues({
      title: affiliate.title,
      imageLink: affiliate.imageLink,
      productLink: affiliate.productLink,
      description: affiliate.description
    });
  }; 
  
  const activeAffiliate = async(affiliate) => {
     await axios.put(`https://babynamegenarate.vercel.app/affiliates/active/${affiliate._id}`, {value:""});
          MySwal.fire('Success!', 'Affiliate active successfully!', 'success');
  };


  const cancelAffiliateForm = () => {
    setIsAddingAffiliate(false);
    setCurrentAffiliate(null);
    affiliateFormik.resetForm();
  };


  const formik = useFormik({
    initialValues: {
      name: '',
      meaning: '',
      scripture: '',
      theme: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      meaning: Yup.string().required('Meaning is required'),
      scripture: Yup.string(),
      theme: Yup.string()
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('https://babynamegenarate.vercel.app/names', values);
        MySwal.fire('Success!', 'Name added successfully!', 'success');
        resetForm();
      } catch (error) {
        console.error('Error adding name:', error);
        MySwal.fire('Error!', 'Failed to add name', 'error');
      }
    },
  });

  const updateFormik = useFormik({
    initialValues: {
      name: '',
      meaning: '',
      scripture: '',
      theme: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      meaning: Yup.string().required('Meaning is required'),
      scripture: Yup.string(),
      theme: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`https://babynamegenarate.vercel.app/names/${currentName._id}`, values);
        MySwal.fire('Success!', 'Name updated successfully!', 'success');
        fetchNames();
        closeUpdateModal();
      } catch (error) {
        console.error('Error updating name:', error);
        MySwal.fire('Error!', 'Failed to update name', 'error');
      }
    },
  });





  const affiliateFormik = useFormik({
    initialValues: {
      title: '',
      imageLink: '',
      productLink: '',
      description: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      imageLink: Yup.string().url('Must be a valid URL').required('Image link is required'),
      productLink: Yup.string().url('Must be a valid URL').required('Product link is required'),
      description: Yup.string().required('Description is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (currentAffiliate) {
          await axios.put(`https://babynamegenarate.vercel.app/affiliates/${currentAffiliate._id}`, values);
          MySwal.fire('Success!', 'Affiliate updated successfully!', 'success');
        } else {
          await axios.post('https://babynamegenarate.vercel.app/affiliates', values);
          MySwal.fire('Success!', 'Affiliate added successfully!', 'success');
        }
        fetchAffiliates();
        cancelAffiliateForm();
      } catch (error) {
        console.error('Error submitting affiliate:', error);
        MySwal.fire('Error!', 'Failed to submit affiliate', 'error');
      }
    }
  });



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  return (
    <PrivateRoute>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-20 right-4 z-50 bg-purple-500 text-white p-2 px-3 rounded-md shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sticky Sidebar */}
        <aside className={`md:w-1/5 w-full bg-purple-100 p-6 shadow-md md:sticky fixed top-18 h-screen overflow-y-auto z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <h2 className="text-xl font-semibold mb-6 text-purple-800">Dashboard Menu</h2>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => {
                  setSelectedMenu('add-name');
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md transition  flex  items-center ${selectedMenu === 'add-name'
                  ? 'bg-purple-500 text-white font-semibold'
                  : 'hover:bg-purple-200 text-purple-800'
                  }`}
              >
                <GrAdd className='text-xl mr-2' /> Add Name
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedMenu('all-names');
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md transition ${selectedMenu === 'all-names'
                  ? 'bg-purple-500 text-white font-semibold'
                  : 'hover:bg-purple-200 text-purple-800'
                  }`}
              >
                📋 All Names
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedMenu('all-users');
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md transition flex ${selectedMenu === 'all-users'
                  ? 'bg-purple-500 text-white font-semibold'
                  : 'hover:bg-purple-200 text-purple-800'
                  }`}
              >
                <ImManWoman className='text-xl mr-2' /> All Users
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedMenu('affiliate');
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md transition flex ${selectedMenu === 'affiliate'
                  ? 'bg-purple-500 text-white font-semibold'
                  : 'hover:bg-purple-200 text-purple-800'
                  }`}
              >
                <TbAffiliate className='text-xl mr-2' /> Affiliate
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="md:w-4/5 w-full p-4 md:p-6 flex justify-center items-start">
          {selectedMenu === 'add-name' && (
            <div className="w-full max-w-lg bg-white p-4 md:p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Add a New Name</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Baby Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="meaning"
                    placeholder="Meaning"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.meaning}
                    className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                  />
                  {formik.touched.meaning && formik.errors.meaning && (
                    <p className="text-red-500 text-sm">{formik.errors.meaning}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="scripture"
                    placeholder="Scripture (Optional)"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.scripture}
                    className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="theme"
                    placeholder="Theme (Optional)"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.theme}
                    className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {selectedMenu === 'all-names' && (
            <div className="w-full overflow-x-auto">
              <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">All Names</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded shadow-md">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="py-3 px-2 md:px-4">SL No</th>
                      <th className="py-3 px-2 md:px-4">Name</th>
                      <th className="py-3 px-2 md:px-4">Meaning</th>
                      <th className="py-3 px-2 md:px-4 hidden sm:table-cell">Scripture</th>
                      <th className="py-3 px-2 md:px-4 hidden sm:table-cell">Theme</th>
                      <th className="py-3 px-2 md:px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {names.map((item, index) => (
                      <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-2 md:px-4">{index + 1}</td>
                        <td className="py-2 px-2 md:px-4">{item.name}</td>
                        <td className="py-2 px-2 md:px-4">{item.meaning}</td>
                        <td className="py-2 px-2 md:px-4 hidden sm:table-cell">{item.scripture || '-'}</td>
                        <td className="py-2 px-2 md:px-4 hidden sm:table-cell">{item.theme || '-'}</td>
                        <td className="py-2 px-2 md:px-4 space-x-1 md:space-x-2">
                          <button
                            className="bg-blue-500 text-white my-1 px-2 py-1 md:px-3 md:py-1 rounded hover:bg-blue-600 text-sm md:text-base"
                            onClick={() => openUpdateModal(item)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-red-600 text-sm md:text-base"
                            onClick={() => handleDelete(item._id, item.name)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {names.length === 0 && (

                      <tr>
                        <td colSpan="6" className="text-center py-4 text-gray-500">
                          No names found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedMenu === 'all-users' && (
            <div className="w-full overflow-x-auto">
              <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">All Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded shadow-md">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="py-3 px-2 text-left md:px-4">SL No</th>
                      <th className="py-3 px-2 text-left md:px-4">Name</th>
                      <th className="py-3 px-2 text-left md:px-4">Email</th>
                      <th className="py-3 px-2 text-left md:px-4">Role</th>
                      <th className="py-3 px-2 text-left md:px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-2 md:px-4">{index + 1}</td>
                        <td className="py-2 px-2 md:px-4">{user.name}</td>
                        <td className="py-2 px-2 md:px-4">{user.email}</td>
                        <td className="py-2 px-2 md:px-4 capitalize">{user.role || 'user'}</td>
                        <td className="py-2 px-2 md:px-4 space-x-1 md:space-x-2">
                          {user.role !== 'admin' ? (
                            <button
                              className="bg-green-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-green-600 text-sm md:text-base"
                              onClick={() => handleMakeAdmin(user._id, user.email)}
                            >
                              Make Admin
                            </button>
                          ) : (
                            <button
                              className="bg-yellow-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-yellow-600 text-sm md:text-base"
                              onClick={() => handleRemoveAdmin(user._id, user.email)}
                            >
                              Remove Admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">
                          No users found.
                        </td>
                      </tr>
                    )}

                    {selectedMenu === 'affiliate' && (
                      <div className="w-full">
                        {isAddingAffiliate ? (
                          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-purple-700">
                              {currentAffiliate ? 'Edit Affiliate Product' : 'Add New Affiliate Product'}
                            </h2>
                            <form onSubmit={affiliateFormik.handleSubmit} className="space-y-4">
                              <div>
                                <label className="block text-gray-700 mb-1">Title*</label>
                                <input
                                  type="text"
                                  name="title"
                                  placeholder="Product Title"
                                  onChange={affiliateFormik.handleChange}
                                  onBlur={affiliateFormik.handleBlur}
                                  value={affiliateFormik.values.title}
                                  className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                                />
                                {affiliateFormik.touched.title && affiliateFormik.errors.title && (
                                  <p className="text-red-500 text-sm">{affiliateFormik.errors.title}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-gray-700 mb-1">Image Link (URL)*</label>
                                <input
                                  type="url"
                                  name="imageLink"
                                  placeholder="https://example.com/image.jpg"
                                  onChange={affiliateFormik.handleChange}
                                  onBlur={affiliateFormik.handleBlur}
                                  value={affiliateFormik.values.imageLink}
                                  className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                                />
                                {affiliateFormik.touched.imageLink && affiliateFormik.errors.imageLink && (
                                  <p className="text-red-500 text-sm">{affiliateFormik.errors.imageLink}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-gray-700 mb-1">Product Link (URL)*</label>
                                <input
                                  type="url"
                                  name="productLink"
                                  placeholder="https://example.com/product"
                                  onChange={affiliateFormik.handleChange}
                                  onBlur={affiliateFormik.handleBlur}
                                  value={affiliateFormik.values.productLink}
                                  className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                                />
                                {affiliateFormik.touched.productLink && affiliateFormik.errors.productLink && (
                                  <p className="text-red-500 text-sm">{affiliateFormik.errors.productLink}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-gray-700 mb-1">Description*</label>
                                <textarea
                                  name="description"
                                  placeholder="Product description..."
                                  onChange={affiliateFormik.handleChange}
                                  onBlur={affiliateFormik.handleBlur}
                                  value={affiliateFormik.values.description}
                                  rows="5"
                                  className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                                />
                                {affiliateFormik.touched.description && affiliateFormik.errors.description && (
                                  <p className="text-red-500 text-sm">{affiliateFormik.errors.description}</p>
                                )}
                              </div>

                              <div className="flex space-x-4">
                                <button
                                  type="submit"
                                  className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                                >
                                  {currentAffiliate ? 'Update' : 'Submit'}
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelAffiliateForm}
                                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <div className="flex justify-between items-center mb-4">
                              <h2 className="text-2xl font-bold text-purple-700">Affiliate Products</h2>
                              <button
                                onClick={startAddingAffiliate}
                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                              >
                                Add New Affiliate
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {affiliates.length > 0 ? (
                                affiliates.map((item) => (
                                  <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                    <div className="h-48 overflow-hidden">
                                      <img
                                        src={item.imageLink}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                                        }}
                                      />
                                    </div>
                                    <div className="p-4">
                                      <h3 className="text-lg font-semibold mb-2 text-purple-700">{item.title}</h3>
                                      <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                                      <div className="flex space-x-2">
                                        <a
                                          href={item.productLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex-1 bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700 transition"
                                        >
                                          View Product
                                        </a>
                                        <button
                                          onClick={() => startEditingAffiliate(item)}
                                          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() => handleDeleteAffiliate(item._id, item.title)}
                                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="col-span-full text-center py-8 text-gray-500">
                                  No affiliate products found. Click "Add New Affiliate" to create one.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* // Add this in the main return section, with other menu content */}
          {selectedMenu === 'affiliate' && (
            <div className="w-full">
              {isAddingAffiliate ? (
                <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                  <h2 className="text-2xl font-bold mb-4 text-purple-700">
                    {currentAffiliate ? 'Edit Affiliate Product' : 'Add New Affiliate Product'}
                  </h2>
                  <form onSubmit={affiliateFormik.handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Title*</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        onChange={affiliateFormik.handleChange}
                        onBlur={affiliateFormik.handleBlur}
                        value={affiliateFormik.values.title}
                        className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                      />
                      {affiliateFormik.touched.title && affiliateFormik.errors.title && (
                        <p className="text-red-500 text-sm">{affiliateFormik.errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Image Link (URL)*</label>
                      <input
                        type="url"
                        name="imageLink"
                        placeholder="https://example.com/image.jpg"
                        onChange={affiliateFormik.handleChange}
                        onBlur={affiliateFormik.handleBlur}
                        value={affiliateFormik.values.imageLink}
                        className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                      />
                      {affiliateFormik.touched.imageLink && affiliateFormik.errors.imageLink && (
                        <p className="text-red-500 text-sm">{affiliateFormik.errors.imageLink}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Product Link (URL)*</label>
                      <input
                        type="url"
                        name="productLink"
                        placeholder="https://example.com/product"
                        onChange={affiliateFormik.handleChange}
                        onBlur={affiliateFormik.handleBlur}
                        value={affiliateFormik.values.productLink}
                        className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                      />
                      {affiliateFormik.touched.productLink && affiliateFormik.errors.productLink && (
                        <p className="text-red-500 text-sm">{affiliateFormik.errors.productLink}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Description*</label>
                      <textarea
                        name="description"
                        placeholder="Product description..."
                        onChange={affiliateFormik.handleChange}
                        onBlur={affiliateFormik.handleBlur}
                        value={affiliateFormik.values.description}
                        rows="5"
                        className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                      />
                      {affiliateFormik.touched.description && affiliateFormik.errors.description && (
                        <p className="text-red-500 text-sm">{affiliateFormik.errors.description}</p>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                      >
                        {currentAffiliate ? 'Update' : 'Submit'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelAffiliateForm}
                        className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-purple-700">Affiliate Products</h2>
                    <button
                      onClick={startAddingAffiliate}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    >
                      Add New Affiliate
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {affiliates.length > 0 ? (
                      affiliates.map((item) => (
                        <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                          <div className="h-48 overflow-hidden">
                            <img
                              src={item.imageLink}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-purple-700">{item.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                            <div className="flex space-x-2">
                              <a
                                href={item.productLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700 transition"
                              >
                                View Product
                              </a>
                              <button
                                onClick={() => activeAffiliate(item)}
                                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                              >
                                {item.status ?  "Active": "MakeActive"}
                               
                              </button>
                              <button
                                onClick={() => startEditingAffiliate(item)}
                                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAffiliate(item._id, item.title)}
                                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        No affiliate products found. Click "Add New Affiliate" to create one.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Update Modal */}
        {isUpdateModalOpen && (
          <div className="fixed inset-0 bg-[#0000009c] bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Update Name</h2>
              <form onSubmit={updateFormik.handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Baby Name"
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    value={updateFormik.values.name}
                    className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                  />
                  {updateFormik.touched.name && updateFormik.errors.name && (
                    <p className="text-red-500 text-sm">{updateFormik.errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="meaning"
                    placeholder="Meaning"
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    value={updateFormik.values.meaning}
                    className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                  />
                  {updateFormik.touched.meaning && updateFormik.errors.meaning && (
                    <p className="text-red-500 text-sm">{updateFormik.errors.meaning}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="scripture"
                    placeholder="Scripture (Optional)"
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    value={updateFormik.values.scripture}
                    className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="theme"
                    placeholder="Theme (Optional)"
                    onChange={updateFormik.handleChange}
                    onBlur={updateFormik.handleBlur}
                    value={updateFormik.values.theme}
                    className="w-full px-4 py-2 border rounded focus:outline-purple-400"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={closeUpdateModal}
                    className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default DashBoardPage;