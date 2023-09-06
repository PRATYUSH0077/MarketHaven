import axios from "axios";
import { useEffect, useState } from "react"

export default function useCateogary() {
    const [category, setCategary] = useState([]);

    const getCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/cateogary/getAllCateogary`)
            // console.log('data cateogary from hook', data.cateogary);
            // console.log('data from hook', data);
            setCategary(data.cateogary)
        }
        catch (err) {
            console.log('Error in useCatepgary hook :', err);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        category
    )
}
