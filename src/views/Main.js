import React from 'react'
import { Navbar } from '../components/Navbar'
import { Home } from './Home'
import { Footer } from '../components/Footer'
import { Switch, Route } from 'react-router-dom'
import '../custom.css'
import { About } from './About'
import { Blog } from './Blog'
import { Order } from './Order'
import { Shop } from './Shop'
import { Cart } from './Cart'
import { Contact } from './Contact'
import { BlogSingle } from './BlogSingle'
import { Wishlist } from './Wishlist'
import { Profile } from './Profile'

export const Main = (props) => {
    return (
        <div className="main-wrapper">
            <header>
                <Navbar signIn={props.signIn} />
            </header>
            
            <main className="container">
                <Switch>
                    <Route exact path={'/'} render={() => <Home posts={props.posts} />} />
                    <Route exact path={'/about'} render={() => <About />} />
                    <Route exact path={'/blog'} render={() => <Blog />} />
                    <Route exact path={'/blog/:slug'} render={() => <BlogSingle />} />

                    <Route exact path={'/profile'} render={() => <Profile />} />
                    <Route exact path={'/contact'} render={() => <Contact />} />
                    
                    <Route exact path={'/order'} render={() => <Order />} />
                    <Route exact path={'/shop'} render={() => <Shop />} />
                    <Route exact path={'/wishlist'} render={() => <Wishlist />} />
                    <Route exact path={'/cart'} render={() => <Cart />} />
                </Switch>
            </main>
           
            <footer className="container p-4">
                <Footer />
            </footer>
        </div>
    )
}
