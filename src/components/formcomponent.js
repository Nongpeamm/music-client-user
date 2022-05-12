import './formcomponent.css';
const Formcomponent = () => {
    return(
        <div>
        <form >

            <div className="form-control">
                <label>Create your list here</label>
                <input Type="text" placeholder="enter ur task here" />
                
            </div>
            
            <div className="form-control">
                <label>Amount</label>
                <input Type="number" placeholder="enter your price" />
            </div>
            
            <div>
                <button type="submit">add data here</button>    
            </div> 
        </form>
        </div>
    )
}

export default Formcomponent;