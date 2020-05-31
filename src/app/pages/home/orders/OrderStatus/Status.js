import React from 'react'

function OrderStatus(props) {

    return (
        <div className="row">
            <div className="col">
                <div className="kt-portlet">
                    <div className="kt-portlet__head">
                        <div className='kt-portlet__head-label'>
                            <h5 className="kt-portlet__head-title">All Orders</h5>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Order No#</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Images</th>
                                    <th scope="col">Payment Status</th>
                                    <th scope="col">Order Status</th>
                                    <th scope="col" className="d-flex justify-content-center">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">107445</th>
                                    <td>Apr 3,2020</td>
                                    <td>4</td>
                                    <td>Pending</td>
                                    <td>
                                        <div className="bg-warning p-2 text-center">
                                            <span className="text-light font-weight-bold">Pending</span>
                                        </div>
                                    </td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <button type="button" class="btn btn-clean btn-sm btn-icon btn-icon-sm p-1" onClick={props.handleNext}>
                                            <i className="flaticon-eye" />
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">107084</th>
                                    <td>Mar 23,2020</td>
                                    <td>6</td>
                                    <td>Canceled</td>
                                    <td>
                                        <div className="bg-danger p-2 text-center">
                                            <span className="text-light font-weight-bold">Canceled</span>
                                        </div>
                                    </td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <button type="button" class="btn btn-clean btn-sm btn-icon btn-icon-sm p-1" onClick={props.handleNext}>
                                            <i className="flaticon-eye" />
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">106939</th>
                                    <td>Mar 19,2020</td>
                                    <td>1</td>
                                    <td>Payment Complete</td>
                                    <td>
                                        <div className="bg-primary p-2 text-center">
                                            <span className="text-light font-weight-bold">Completed</span>
                                        </div>
                                    </td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <button type="button" class="btn btn-clean btn-sm btn-icon btn-icon-sm p-1" onClick={props.handleNext}>
                                            <i className="flaticon-eye" />
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">107431</th>
                                    <td>Jul 2,2020</td>
                                    <td>2</td>
                                    <td>Payment Complete</td>
                                    <td>
                                        <div className="bg-primary p-2 text-center">
                                            <span className="text-light font-weight-bold">Complete</span>
                                        </div>
                                    </td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <button type="button" class="btn btn-clean btn-sm btn-icon btn-icon-sm p-1" onClick={props.handleNext}>
                                            <i className="flaticon-eye" />
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus