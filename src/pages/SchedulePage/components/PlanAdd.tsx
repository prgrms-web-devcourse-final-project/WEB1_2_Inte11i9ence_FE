import React, { useState, useEffect, useRef } from 'react'

interface PlanAddProps {
  onPlaceChange: (place: string) => void // 장소 변경 콜백
}

const PlanAdd: React.FC<PlanAddProps> = ({ onPlaceChange }) => {
  const [place, setPlace] = useState<string>('')
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [apiLoaded, setApiLoaded] = useState(false)

  const loadGoogleMapsApi = () => {
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setApiLoaded(true)
      document.body.appendChild(script)
    } else {
      setApiLoaded(true)
    }
  }

  const initializeAutocomplete = () => {
    if (apiLoaded && autocompleteInputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        autocompleteInputRef.current,
      )
      autocompleteRef.current.addListener('place_changed', handlePlaceSelect)
    }
  }

  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) {
      return
    }
    const placeDetails = autocompleteRef.current.getPlace()
    if (placeDetails && placeDetails.name) {
      setPlace(placeDetails.name)
      onPlaceChange(placeDetails.name) // 부모 컴포넌트에 장소 전달
    }
  }

  useEffect(() => {
    loadGoogleMapsApi()
  }, [])

  useEffect(() => {
    initializeAutocomplete()
  }, [apiLoaded])

  return (
    <div>
      <input
        ref={autocompleteInputRef}
        type='text'
        placeholder='장소 검색'
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className='p-2 text-sm w-full border h-[5vh] text-darkGray'
      />
    </div>
  )
}

export default PlanAdd
