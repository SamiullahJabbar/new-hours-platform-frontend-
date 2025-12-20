import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import UploadTips from '../pages/UploadTips';
import UploadResult from '../pages/UploadResult';
import ManageResult from '../pages/ManageResult';
import ManageTips from '../pages/ManageTips';
import Members from '../pages/Members';
import Performance from '../pages/Performance';
import Generation from '../pages/Generation';
import Login from '../pages/Login';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/admin' element={<Dashboard />} />
      <Route path='/upload-tips' element={<UploadTips />} />
      <Route path='/upload-result' element={<UploadResult />} />
      <Route path='/manage-result' element={<ManageResult />} />
      <Route path='/manage-tips' element={<ManageTips />} />
      <Route path='/members' element={<Members />} />
      <Route path='/performance' element={<Performance />} />
      <Route path='/generation' element={<Generation />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Router;