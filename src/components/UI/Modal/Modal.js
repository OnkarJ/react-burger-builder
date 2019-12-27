import React, { Component } from 'react';
import Aux from '../../../hoc/AuxHOC';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';

class Modal extends Component {

    // only update this component when (nextProps.show !== this.props.show)
    // i.e when it gets the show prop unncessary of other prop rendering
    // for this actually OrderSummary component should get this method shouldComponentUpdate
    // because the wrapping element controls the updating of the wrapped element.
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Aux>
                {
                    this.props.show
                        ? <div>
                            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                            <div
                                className='Modal'
                                style={{
                                    transform: this.props.show ? 'transformY(0)' : 'transformY(-100)',
                                    opacity: this.props.show ? '1' : '0'
                                }}
                            >
                                {this.props.children}
                            </div>
                        </div>
                        : null
                }
            </Aux>
        );
    }
}

export default Modal;