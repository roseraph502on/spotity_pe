import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router'
import AppLayout from './core/AppLayout'
import Homepage from './feeture/Homepage'
import SearchPage from './feeture/SearchPage'
import SearchWithkeyPage from './feeture/SearchWithkeyPage'
import PlaylistDetailPage from './feeture/PlaylistDetailPage'

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:keyword' element={<SearchWithkeyPage />} />
          <Route path='playlist' element={<PlaylistDetailPage />} />
          <Route path='playlist' element={<PlaylistPage/>}/>
        </Route>
        {/* <Route path='/admin' element={<AdminLayout/>}> */}
      </Routes>
    </Suspense>
  );
}

export default App;
