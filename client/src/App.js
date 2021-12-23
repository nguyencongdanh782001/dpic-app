
import React from 'react';
import {BrowserRouter , Switch, Route, Redirect} from "react-router-dom"
import Account from './features/admin/account/pages/account/Account';
import Advertise from './features/admin/advertise/pages/Advertise';
import Dasboard from './features/admin/dashboard/pages/Dasboard';
import AddNotify from './features/admin/exhibition/pages/addnotify/AddNotify';
import ApprovePost from './features/admin/exhibition/pages/approvepost/ApprovePost';
import ExhibitionHome from './features/admin/exhibition/pages/home/ExhibitionHome';
import Auth from './features/auth/index/Auth';
import Exhibition from './features/exhibition/index/Exhibition';
import Home from './features/home/pages/Home';
import Library from './features/library/index/Library';
import DetailCategoryImage from './features/library/pages/detailcategoryimage/DetailCategoryImage';
import DetailImage from './features/library/pages/detailimage/DetailImage';
import Search from './features/search/pages/Search';
import ProtectedRoute from './routes/ProtectedRoute';
import ProtectedRouteAdmin from './routes/ProtectedRouteAdmin';
import './App.css'
function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact path='/' to='/home'/>
          <Route exact path='/login' render={props => <Auth {...props} authRoute="login"/>} />
          <Route exact path='/register' render={props => <Auth {...props} authRoute="register"/>} />
          <ProtectedRoute exact path='/home' component={Home}/>
          <ProtectedRoute exact path='/library' component={Library}/>
          <ProtectedRoute exact path='/library/photos' component={Library}/>
          <ProtectedRoute exact path='/library/photos/:id' component={DetailImage}/>
          <ProtectedRoute exact path='/library/category' component={Library}/>
          <ProtectedRoute exact path='/library/category/:id' component={Library}/>
          <ProtectedRoute exact path='/library/category/:id/:idimg' component={DetailCategoryImage}/>
          <ProtectedRoute exact path='/exhibition' component={Exhibition}/>
          <ProtectedRoute exact path='/exhibition/notify' component={Exhibition}/>
          <ProtectedRoute exact path='/exhibition/newpost' component={Exhibition}/>
          <ProtectedRoute exact path='/search' component={Search}/>

          <ProtectedRouteAdmin exact path='/admin/dashboard' component={Dasboard}/>
          <ProtectedRouteAdmin exact path='/admin/advertise' component={Advertise}/>
          <ProtectedRouteAdmin exact path='/admin/exhibition' component={ExhibitionHome}/>
          <ProtectedRouteAdmin exact path='/admin/exhibition/addnotify' component={AddNotify}/>
          <ProtectedRouteAdmin exact path='/admin/exhibition/checkpost' component={ApprovePost}/>
          <ProtectedRouteAdmin exact path='/admin/account' component={Account}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
