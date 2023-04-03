import axios from 'axios'
import { useEffect, useState } from 'react'

const useEssentialDetails = (id) => {
    
    const [details, setDetails] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const getData = () => {
        axios
            .get(`/essentials/${id}`)
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

export default useEssentialDetails
