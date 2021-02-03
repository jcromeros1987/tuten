import React from 'react'
import ReactDOM from 'react-dom';

const Posts = ({ posts, loading, cambiar }) => {
  if (loading) {
    return <h2>Loading ...</h2>;
  }

  return <table className="table">
    <thead>
      <tr>
      <th>BookingId</th>
      <th>Cliente</th>
      <th>Fecha de Creación</th>
      <th>Dirección</th>
      <th>Precio</th>
      </tr>
    </thead>
    <tbody>
    {posts.map((post, index) => (
      <tr key={post.id}>
        <td>{post.bookingId}</td>
        <td>{post.tutenUserClient.firstName + " " + post.tutenUserClient.lastName}</td>
        <td>{post.bookingTime}</td>
        <td>{post.locationId.streetAddress}</td>
        <td>{post.bookingPrice}</td>
      </tr>
    ))}
    </tbody>
    </table>;
};

export default Posts;
