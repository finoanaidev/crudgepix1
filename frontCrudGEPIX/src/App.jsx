import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Menu from './Menu'
import Syndic from './Syndic'
import Copropriete from './Copropriete'
import Coproprietaire from './Coproprietaire'
import Lot from './Lot'
import DocumentCopro from './DocumentCopro'
import Document from './Document'
function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path='/' element={<Syndic />}/>
        <Route path='/copropriete' element={<Copropriete />}/>
        <Route path='/coproprietaire' element={<Coproprietaire />}/>
        <Route path='/lot' element={<Lot />}/>
        <Route path='/documentcopro' element={<DocumentCopro />}/>
        <Route path='/document' element={<Document />}/>
      </Routes>
    </div>
  )
}

export default App