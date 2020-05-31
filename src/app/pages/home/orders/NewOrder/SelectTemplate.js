import React from 'react'
import { toAbsoluteUrl } from "../../../../../_metronic";

function Template() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="kt-portlet">
                        <div className="kt-portlet__head">
                            <div className='kt-portlet__head-label'>
                                <h5 className="kt-portlet__head-title">Select Custom Template</h5>
                            </div>
                        </div>
                        <div className="kt-portlet__body">
                            <div className="w-100 d-flex justify-content-center">
                                <img
                                    width={300}
                                    alt="Logo"
                                    src={toAbsoluteUrl("/media/images/auth-hood-banner.png")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Template;