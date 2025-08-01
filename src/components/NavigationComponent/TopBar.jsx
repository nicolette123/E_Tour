import React from 'react'
import Link from 'next/link';

const TopBar = ({title}) => {
    return (
        <div className='topbar'>
            <h4 className='topbar-title'>{title}</h4>
            <div className='topbar-search'>
                <i className="ri-search-line"></i><input type="search" placeholder="Search for..." />
            </div>
           
  <div className="dropdown-content">
 <select id="dates" name="dates">
      <option value="">January 2025</option>
      <option value="">February 2025</option>
      <option value="">March 2025</option>
      <option value="">April 2025</option>
      <option value="">May 2025</option>
      <option value="">June 2025</option>
      <option value="">July 2025</option>
      <option value="">August 2025</option>
      <option value="">September 2025</option>
      <option value="">October 2025</option>
      <option value="">November 2025</option>
      <option value="">December 2025</option>
    </select>
  </div>
        </div>
    )
}   

export default TopBar
