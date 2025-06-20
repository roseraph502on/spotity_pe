import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Loading from './core/inform/Loading';
import useExchangeToken from './hooks/useExchangeToken';
import Library from './core/applayout/components/Library';
const AppLayout = React.lazy(() => import('./core/applayout/AppLayout'))
const Homepage = React.lazy(() => import('./feeture/Homepage'))
const SearchPage = React.lazy(() => import('./feeture/SearchPage'))
const SearchWithkeyPage = React.lazy(() => import('./feeture/SearchWithkeyPage'))
const PlaylistPage = React.lazy(() => import('./feeture/PlaylistPage'))
const PlaylistDetailPage = React.lazy(() => import('./feeture/PlaylistDetailPage'))

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');
  const { mutate: exchangeToken } = useExchangeToken()

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:keyword' element={<SearchWithkeyPage />} />
          <Route path='playlist/:id' element={<PlaylistDetailPage />} />
          <Route path='playlist' element={<PlaylistPage />} />
          <Route path='library' element={<Library />} />
        </Route>
        <Route path='/load' element={<Loading />} />

        {/* <Route path='/admin' element={<AdminLayout/>}> */}
      </Routes>
    </Suspense>

  );
}

export default App;
