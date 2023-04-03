import { useState, useEffect} from 'react'
import axios from 'axios'

const useGroceryDetails = (id) => {
    const [details, setDetails] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const getData = () => {
        axios
            .get(`/groceries/${id}`)
            .then(res => {
                setDetails(res.data)
                setIsLoaded(true)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        window.scrollTo(0,0)
        getData()

    }, [])
    
  return {details, isLoaded}
}

export default useGroceryDetails