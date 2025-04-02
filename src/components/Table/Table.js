import React from 'react';
import './Table.css'
const Table = () => {
  return (
    <table className='custom-table'>
      <thead>
        <tr>
          <th>SN</th>
          <th>type</th>
          <th>title</th>
          <th>instractor</th>
          <th>price</th>
          <th>students</th>
          <th>created date</th>
          <th>update date</th>
          <th>status</th>
          <th>Approve</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Deutsh</td>
          <td>how to make your own bussines frfom zero</td>
          <td>dale bumbach</td>
          <td>Free</td>
          <td>30</td>
          <td>04 Feb 2025 17:26</td>
          <td>04 Feb 2025 17:26</td>
          <td>Puplished</td>
          <td>appeoved</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Deutsh</td>
          <td>how to make your own bussines frfom zero</td>
          <td>dale bumbach</td>
          <td>Free</td>
          <td>30</td>
          <td>04 Feb 2025 17:26</td>
          <td>04 Feb 2025 17:26</td>
          <td>Puplished</td>
          <td>appeoved</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
