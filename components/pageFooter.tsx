import React from "react"
import { format } from 'date-fns'
import Image from "next/image"

export default function Example() {
  const ano = format(new Date(), "yyyy")
  return (
    <>
      <footer className=" bg-opacity-90 w-full" aria-labelledby="footer-heading">
        
      </footer>
    </>
  )
} 