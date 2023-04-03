import { useState, useEffect } from 'react'
import axios from 'axios'

const useGroceries = () => {
    const [groceries, setGroceries] = useState({})
    const [isGroceryLoaded, setIsGroceryLoaded] = useState(false)

    const getGroceries = () => {
        axios
            .get(`/groceries/`)
            .then(res => {
                setGroceries(res.data)
                setIsGroceryLoaded(true)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        window.scrollTo(0,0)
        getGroceries()

    }, [])
    
  return {groceries, setGroceries, getGroceries, isGroceryLoaded}
}

export default useGroceries