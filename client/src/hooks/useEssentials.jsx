import axios from 'axios'
import { useEffect, useState } from 'react'

const useEssentials = () => {
    const [essentials, setEssentials] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const getEssentials = () => {
        axios
            .get(`/essentials/`)
            .then(res => {
                setEssentials(res.data)
                setIsLoaded(true)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        window.scrollTo(0,0)
        getEssentials()

    }, [])
    
  return {essentials, setEssentials, getEssentials, isLoaded}
}

export default useEssentials