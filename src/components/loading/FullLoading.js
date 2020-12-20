import React from 'react'
import PuffLoader from "react-spinners/PuffLoader"

export default function FullLoading() {

    const cssName = {
        center: {
            margin: '0 auto'
        }
    }

    
    return (
        <div
            className="position-fixed"
            style={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                background: '#fff',
                opacity: '0.9',
                zIndex: 99
            }}
        >
            <div className="d-table w-100 h-100">
                <div className="d-table-cell align-middle">
                    <PuffLoader
                        size={50}
                        css={cssName.center}
                    />
                </div>
            </div>
        </div>
    )
}
