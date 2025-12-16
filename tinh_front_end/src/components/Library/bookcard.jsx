import React from 'react';

const BookCard = ({ title, author, color }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', borderRadius: '8px', padding: '15px', 
      background: 'white', width: '200px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
    }}>
      <div style={{ 
        height: '120px', background: color || '#ccc', borderRadius: '4px', marginBottom: '10px' 
      }}></div>
      <h3 style={{ fontSize: '16px', margin: '0 0 5px 0' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{author}</p>
    </div>
  );
};

export default BookCard;