import React, { lazy, Suspense } from 'react';
import { StyledApp } from './style';

const Booklist = lazy(() => import('./components/Booklist'))
const UserInput = lazy(() => import('./components/UserInput'))

const App: React.FC = () => {
  return (
      <StyledApp>
        <Suspense fallback={<div>Loading...</div>}>
          <Booklist />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <UserInput />
        </Suspense>
      </StyledApp>
  );
}

export default App;
