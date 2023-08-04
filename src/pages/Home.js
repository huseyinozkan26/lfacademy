import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Dashboard from '../component/Dashboard'

export default function Home() {
  return (
    <div>
      <Container>
       <Dashboard></Dashboard>
      </Container>
    </div>
  )
}