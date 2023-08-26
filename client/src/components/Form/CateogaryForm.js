import React from 'react'

const CateogaryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Enter New Categary' value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: 'black' }}>Submit</button>
            </form>
        </>
    )
}

export default CateogaryForm
