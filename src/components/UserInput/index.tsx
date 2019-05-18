import React, { lazy, Suspense } from 'react';
import { UserInputWrapper } from './style';

// Lazy loading
const AddAuthor = lazy(() => import('../AddAuthor'))
const AddBook = lazy(() => import('../AddBook'))


const UserInput = () => {
  return (
    <UserInputWrapper >
      <Suspense fallback={<div>Loading...</div>}>
        <AddAuthor />
      </Suspense>
      <br></br>
      <hr></hr>
      <h1>HELLOO</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AddBook />
      </Suspense>
      </UserInputWrapper>
      );
    };
    
export default UserInput;