import React, {lazy, Suspense} from 'react';
const AddAuthor = lazy(() => import('../AddAuthor'))
const AddBook = lazy(() => import('../AddBook'))



const UserInput = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <AddAuthor />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <AddBook />
    </Suspense>
    </>
  );
};

export default UserInput;