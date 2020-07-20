function add(num1:number,num2:number):number {

    return num1 + num2 ; 
    
}

test( 'Adds numbers',() => {
    expect(add(1,1)).toBe(3);
}

);