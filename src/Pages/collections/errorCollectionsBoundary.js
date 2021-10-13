import React, { Component } from "react";
class ErrorCollectionsBoundary extends React.Component {
  constructor(props) {
    super(props);
    
  }
  static getDerivedStateFromError(error) {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
 
    this.props.handleHasError()
    //this.props.handleHas  Error()
    // You can also log the error to an error reporting service

  }
  
  

  render() {
    if (this.props.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="contaier error-collection-boundary">
          <div className="mt-5">
            <div className="null d-flex align-items-center justify-content-center mb-4">
              0
            </div>
            <p>Désolé, il n'y a aucun produit correspondant à votre recherche </p>
          </div>

        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorCollectionsBoundary

/*import React, { Component } from "react";
class ErrorCollectionsBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
        return { hasError: true };
      }
    componentDidCatch(error, info) {
        console.log('ll')
   
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
     
    }
  
    render() {
    
      
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className="contaier">
            0
          </div>
        );
      }
      return this.props.children;
    }
  }
  export default ErrorCollectionsBoundary
*/