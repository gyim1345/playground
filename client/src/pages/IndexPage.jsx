import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <>
      <nav>
        <Link to={"/canvas"}>
          <p>canvas</p>
          <img src='/public/images/a.png' ></img>
        </Link>
      </nav>
    </>
  )
}

export default IndexPage;