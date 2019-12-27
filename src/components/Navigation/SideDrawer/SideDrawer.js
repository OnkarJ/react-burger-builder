import React from 'react';
import Aux from '../../../hoc/AuxHOC';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

import './SideDrawer.css';

const sideDrawer = (props) => {
    let attachedClasses;
    attachedClasses = 'SideDrawer Close';
    if(props.open) {
        attachedClasses = 'SideDrawer Open';  
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses}>
                <div className='Logo__sidedrawer'><Logo /></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;