import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import _ from 'lodash';
export default class ReactFullHeightContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerHeight: 200,
            marginBottom: this.props.hasOwnProperty('marginBottom')  ? parseInt(this.props.marginBottom, 10) : 0,
            disabled: this.props.disabled || false,
            dynamicHeight: this.props.dynamicHeight || false
        }
        this.heightCalculated = false;
        this.calculateContainerHeight = this.calculateContainerHeight.bind(this);
        if(this.props.delay){
            this.calculateContainerHeight = debounce(this.calculateContainerHeight, parseInt(this.props.delay,10));
        }
    }

    componentDidMount() {
       
        if(!this.state.disabled){
            this.calculateContainerHeight();
            window.addEventListener("resize", this.calculateContainerHeight);
        }
    }

    componentWillUnmount() {
        if(!this.state.disabled){
            window.removeEventListener("resize", this.calculateContainerHeight);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.marginBottom && 
            !(_.isEqual(nextProps.marginBottom, this.props.marginBottom))){
                this.setState({marginBottom: parseInt(nextProps.marginBottom, 10)},()=>{
                     this.calculateContainerHeight();
                });
               
        }
        
    }


    render() {
        let styleProps = {}
        if(!this.state.disabled){
            styleProps = {
                style:  {
                    height: this.state.containerHeight 
                }
            }
        }else{
            styleProps = {
                style:  {
                    height: "100%" 
                }
            }
        }


        if(!this.state.disabled){
            return (
                <div className="FullHeightCcontiner" {...styleProps} ref={ref => this.containerNode = ref}>
                    {this.props.children }
                </div>
            )
        }else{
            return <div {...styleProps}>{this.props.children}</div>;
        }
        
    }

    componentDidUpdate(){
        if(this.state.dynamicHeight){
            this.calculateContainerHeight();
        }
    }


    // -----------------------------------------------------------------------------------------------------------------
    
    calculateContainerHeight(){
        try{

        var rect = this.containerNode.getBoundingClientRect();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        let containerHeight = windowHeight - (rect.top + scrollTop);
        
        const { marginBottom } = this.state;
        if(marginBottom){
            containerHeight -= parseInt(marginBottom, 10);
        }

        if(containerHeight === 0){
            containerHeight = 'auto';
        }
        if(this.state.containerHeight !== containerHeight){
            if(!this.heightCalculated){
                this.heightCalculated = true;
               if(this.props.onInit){
                    this.props.onInit(containerHeight);
                }
            }else{
                if(this.props.onChange){
                    this.props.onChange(containerHeight);
                }
            }
            this.setState({ containerHeight });
        }
       
        }catch(e){
            console.warn("Caught exception",e);
        }

    }

}