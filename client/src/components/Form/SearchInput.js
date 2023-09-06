import React from 'react'
import { useSearch } from '../../context/Search.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SearchInput = () => {
    const [values, setValue] = useSearch();

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-search/${values.keyword}`);
            setValue({ ...values, result: data });
            navigate('/search');
        }
        catch (err) {
            console.log('Error in handlesubmit of seachInput: ', err);
        }
    }






    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control m-2 "
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    style={{
                        border: '1px solid black',
                        borderRadius: '5px',
                        width: '50%'
                    }}
                    onChange={(e) => setValue({ ...values, keyword: e.target.value })}
                />
                <button
                    className="btn-outline-success btn m-2"
                    style={{ backgroundColor: '#198754' }}
                    type="submit"
                >
                    Search
                </button>
            </form>

        </div>
    )
}

export default SearchInput
