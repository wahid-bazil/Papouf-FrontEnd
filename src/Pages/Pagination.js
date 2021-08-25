import React, { Component } from 'react'

class Pagination extends Component {
    render() {
        const { postsPerPage, totalPosts, paginate, nextPage, prevPage } = this.props;

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }


        return (
            <nav>
                <ul className="pagination mt-5 justify-content-center">
                  
                    {pageNumbers.map(num => (
                        <li className="page-item " key={num}>
                            <a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>
                        </li>
                    ))}
                  
                </ul>
            </nav>
        )
    }
}

export default Pagination