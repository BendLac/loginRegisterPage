function Validation(values) {

    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    /*  kezdődik legalább egy olyan karakterrel, ami nem szóköz és nem '@' karakter
        utána következik '@' karakter
        utána legalább egy olyan karakter van, ami nem szóköz és nem '@' karakter
        utána következik egy '.' karakter
        végül legalább egy olyan karakter van, ami nem szóköz és nem '@' karakter 
    */

    const password_pattern = /^(?=.\d)(?=.[a-z])[a-zA-Z0-9]{4,}$/
    /*  ^ - A szöveg elejére illeszkedik
        (?=.*\d) - Tartalmaz legalább egy számot
        (?=.*[a-z]) - Tartalmaz legalább egy kisbetűt
        [a-zA-Z0-9]{4,} - Legalább 4 karakter hosszú, amelyek csak betűk és számok lehetnek
        $ - A szöveg végére illeszkedik
    */

    if(values.email === "") {       
        error.email = "Name should not be empty"   
    } else if(!email_pattern.test(values.email)) {        
        error.email = "Email Didn't match"    
    }else {        
        error.email = ""    
    }
    if(values.password === "") {        
        error.password = "Password should not be empty"    
    } 
    // else if(!password_pattern.test(values.password)) {        
    //     error.password = "Password didn't match"    
    // } 
    else {       
        error.password = ""    
    }    
    return error;
}
export default Validation;