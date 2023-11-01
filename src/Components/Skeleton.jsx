import React from 'react'
import "./Skeleton.css";

function Skeleton({ width, height, margintop, marginbottom }) {
    const skeletonStyle = {
        width: width,
        height: height,
        marginBottom: marginbottom,
        marginTop: margintop,
        backgroundColor: '#E4E4E4',
        animation: 'loading 1.5s infinite',
      };
  return (
    <div className="skeleton-loading" style={skeletonStyle}></div>
  )
}

export default Skeleton