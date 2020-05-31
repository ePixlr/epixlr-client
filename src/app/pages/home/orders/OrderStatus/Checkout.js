import React from 'react'
import ImageCard from '../../../../components/ImageCard'

function Checkout(props) {

    return (
        <div className="row">
            <div className="col">
                <div className="kt-portlet">
                    <div className="kt-portlet__head">
                        <div className='kt-portlet__head-label'>
                            <h5 className="kt-portlet__head-title text-primary">
                                <button
                                    type="button"
                                    className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                    onClick={props.handleBack}
                                >
                                    <i className="flaticon2-back" style={{ fontSize: 20 }} />
                                </button>
                                {" "}Order #10083</h5>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className='d-flex justify-content-center flex-wrap'>
                            {
                                [0, 1, 2, 3, 4].map(() => (
                                    <div className='mx-3'>
                                        <ImageCard />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-end pr-5 pb-5 pt-0">
                        <button className="btn btn-md btn-primary">Checkout</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Checkout
