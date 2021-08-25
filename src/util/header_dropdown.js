import React, { Component } from "react";
import { FaCaretRight } from "react-icons/fa";
class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDroDown1:null
        }
    }
    onMouseEnter = (e) => {
        console.log('Over')
        e.currentTarget.className = '  '
    }
    onMouseOut = (e) => {
        console.log('Out', e.target)
        e.currentTarget.className = ' spoiler'
    }


    render() {
        const { category, activeDroDown } = this.props
        const { hover } = this.state
        return (
            <div className={'drop-down '}  >
                <ul>
                    {category.child.map(category => (
                        <li aria-haspopup="true" id={category.title} onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseOut} className=' spoiler'>
                            <a href="#" className="d-flex" >
                                <span>
                                    {category.title}
                                    <div className="drop-down0 ">
                                        <DropDown category={category} activeDroDown={activeDroDown} />
                                    </div>
                                  

                                </span>
                                {category.child?.length != 0 ? (
                                <span className="">
                                    <FaCaretRight />
                                </span>
                            ) :
                                null}
                            </a>
                      
                        </li>
                    ))}

                </ul>
            </div>
        )
    }
}
export default DropDown