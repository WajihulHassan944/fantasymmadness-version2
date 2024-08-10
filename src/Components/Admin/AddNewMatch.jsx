import React from 'react';
import "./AddNewMatch.css";

const AddNewMatch = () => {
  return (
    <div className='addNewMatch'>
      <div className='registerCard'>
        <h1>Add New Match</h1>

        <div className='input-wrap-one'>
          <div className='input-group'>
            <label>Select Category <span>*</span></label>
            <select>
              <option value="boxing">Boxing</option>
              <option value="mma">MMA</option>
              <option value="kickboxing">Kickboxing</option>
            </select>
          </div>
          <div className='input-group'>
            <label>Fighter A <span>*</span></label>
            <input type='text' />
          </div>
        </div>

        <div className='input-wrap-two'>
          <div className='input-group'>
            <label>Fighter B <span>*</span></label>
            <input type='text' />
          </div>
          <div className='input-group'>
            <label>Match Name <span>*</span></label>
            <input type='text' />
          </div>
        </div>

        <div className='input-wrap-one'>
          <div className='input-group' style={{flexBasis:'100%'}}>
            <label>Match Description <span>*</span></label>
            <textarea style={{ border:'3px solid #ccc' }} />
          </div>
        </div>

        <div className='input-wrap-one'>
          <div className='input-group'>
            <label>Video ID <span>*</span></label>
            <input type='text' />
          </div>
          <div className='input-group'>
            <label>Match Thumbnail <span>*</span></label>
            <input type='file' />
          </div>
        </div>

        <div className='input-wrap-one'>
          <div className='input-group'>
            <label>Match Date <span>*</span></label>
            <input type='date' />
          </div>
        </div>

        <div className='input-wrap-one'>
          <div className='input-group'>
            <label>Fighter 1 Image <span>*</span></label>
            <input type='file' />
          </div>
          <div className='input-group'>
            <label>Fighter 2 Image <span>*</span></label>
            <input type='file' />
          </div>
        </div>

        <div className='input-wrap-one checkBox'>
            <label>Live</label>
            <input type='checkbox' />
         
          </div>

        <button type="submit" className='btn-grad' style={{width:'30%'}}>Add Match</button>
      </div>
    </div>
  )
}

export default AddNewMatch;
