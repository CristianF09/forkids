import React from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  loading = 'lazy',
  priority = false 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} transition-opacity duration-300`}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = '/images/Icon.png';
      }}
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );
};

export default OptimizedImage;