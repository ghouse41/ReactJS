import React,{Component} from 'react';

import Aux from '../Auxilary/Auxilary';
import Classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer:false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    
    // sideDrawerToggleHandler = () => {
    //     this.setState({showSideDrawer:true})
    // }
    
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render(){   
        return(
            <Aux>
                <Toolbar drawerToggledClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

    
}

export default Layout;