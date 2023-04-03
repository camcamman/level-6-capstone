import { useState, useEffect} from 'react'
import axios from 'axios'

const useKitchen = () => {
    const [kitchen, setKitchen] = useState({})
    const [isKitchenLoaded, setKitchenIsLoaded] = useState(false)

    const getKitchen = () => {
        axios
            .get(`/kitchen/`)
            .then(res => {
                setKitchen(res.data)
                setKitchenIsLoaded(true)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        window.scrollTo(0,0)
        getKitchen()

    }, [])
    
  return {kitchen, setKitchen, getKitchen, isKitchenLoaded}
}

export default useKitchen