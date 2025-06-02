import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Loading from './core/load/Loading';
import PlaylistPage from './feeture/PlaylistPage';
const AppLayout = React.lazy(() => import('./core/applayout/AppLayout')) 
const Homepage = React.lazy(() => import('./feeture/Homepage')) 
const SearchPage = React.lazy(() => import('./feeture/SearchPage')) 
const SearchWithkeyPage = React.lazy(() => import('./feeture/SearchWithkeyPage')) 
const PlaylistDetailPage = React.lazy(() => import('./feeture/PlaylistDetailPage')) 

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path='search' element={<SearchPage />} />
        <Route path='search/:keyword' element={<SearchWithkeyPage />} />
        <Route path='playlist/:id' element={<PlaylistDetailPage />} />
        <Route path='playlist' element={<PlaylistPage/>}/>
      </Route>
      {/* <Route path='/admin' element={<AdminLayout/>}> */}
    </Routes>
    </Suspense>
    
  );
}

export default App;
