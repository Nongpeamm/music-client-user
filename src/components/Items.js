import propTypes from "prop-types";
const Items = (props) => {
    const {title,amount} = props;

    return(
        <li className='list-element'>{title}: <span>{amount} บาท </span></li>
    )
}

Items.propTypes = {
    title: propTypes.string.isRequired,
    amount: propTypes.number
};


export default Items;