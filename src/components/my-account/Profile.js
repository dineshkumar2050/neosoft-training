import React from 'react';
import PropTypes from 'prop-types';
import AccountLayout from './AccountLayout';
import './Profile.css';
import Button from '../button';

function Profile({ ...props }) {
    const editProfile = e => {
        e.preventDefault();
    }
    return (
        <AccountLayout>
            <div className={'profile p-3'}>
                <div className={'top-order-section pb-2'}>
                    <h2>Profile</h2>
                </div>
                <div className={'middle-order-section py-3'}>
                    <div className={'addresses p-3'}>
                        <ul className={'list'}>
                            <li className={'d-flex align-items-cneter'}>
                                <h4 className={'label'}>First Name</h4>
                                <span>Shubham</span>
                            </li>
                            <li className={'d-flex align-items-cneter'}>
                                <h4 className={'label'}>Last Name</h4>
                                <span>Soni</span>
                            </li>
                            <li className={'d-flex align-items-cneter'}>
                                <h4 className={'label'}>Gender</h4>
                                <span>Male</span>
                            </li>
                            <li className={'d-flex align-items-cneter'}>
                                <h4 className={'label'}>Date of Birth</h4>
                                <span>20/08/2019</span>
                            </li>
                            <li className={'d-flex align-items-cneter'}>
                                <h4 className={'label'}>Mobile Number</h4>
                                <span>9876543210</span>
                            </li>
                            <li className={'d-flex align-items-cneter'}>
                                <h4 className={'label'}>Email</h4>
                                <span>abc@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={'bottom-order-section mt-4'}>
                    <Button 
                        content={
                            <span className={'d-flex align-items-center'}>
                                <span className="iconify" data-icon="clarity:edit-solid" data-inline="false">
                                </span>
                                <span className={'edit-button'}>Edit</span>
                            </span>
                        } 
                        className={'btn-primary px-4 py-2'}
                        onClick={editProfile}
                        type={'button'}
                    />
                </div>
            </div>
        </AccountLayout>
    )
}

Profile.propTypes = {

}

export default Profile
