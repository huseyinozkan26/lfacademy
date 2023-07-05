import React from 'react';
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom"
import Navi from '../navigations/Navi';
import Dashboard from './Dashboard';
import Lesson from '../educations/Lesson';
import NotFound from '../common/NotFound';
function App() {
  return (
    <div>
      <Navi />
      <br /><br /><br />
      <Container>
        <Routes>
          <Route path='/' exact Component={Dashboard} />
          <Route path="/lesson/:name" component={Lesson} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </Container>
    </div>

  );
}
export default App;
