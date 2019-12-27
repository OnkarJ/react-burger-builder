import React from 'react';
import classnames from 'classnames';

import './NavigationItem.css';

const navigationItem = (props) => (
    <li className='NavigationItem'>
        <a 
            href={props.link}
            className={classnames( {'active': props.active} )}
        >
            {props.children}
        </a>
    </li>
);

export default navigationItem;